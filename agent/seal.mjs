// Encrypts the guest-only part of the guide into sealed/ (AES-128-GCM).
//
//   node agent/seal.mjs            build sealed/ from the private source
//   node agent/seal.mjs --init     also create a new key if none exists
//   node agent/seal.mjs --check    decrypt sealed/ again and verify it matches the source
//
// Private source (OUTSIDE the repo, never commit it):
//   ../airbnb-florentin-private/guide/house.private.json   host details + apartment cards
//   ../airbnb-florentin-private/guide/kitchen.body.html    body of the kitchen guide page
//   ../airbnb-florentin-private/guide/files/<path>         photos, at the path the JSON refers to
//   ../airbnb-florentin-private/guide-key.txt              the key (22 chars). It goes into the
//                                                          guest link as ?k=<key>, nowhere else.
//
// Output (commit it): sealed/house.bin, sealed/kitchen.bin, sealed/i/<name>.bin
// File format: 12-byte IV, then ciphertext + 16-byte tag. The IV is derived from the content
// (HMAC), so re-running without changes produces identical files and no git noise.
// This script has no dependencies: Node's built-in WebCrypto is the same API the page uses.

import { readFile, writeFile, mkdir, readdir, rm, access } from "node:fs/promises";
import { webcrypto as crypto } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIV = path.resolve(ROOT, "..", "airbnb-florentin-private");
const SRC = path.join(PRIV, "guide");
const KEYFILE = path.join(PRIV, "guide-key.txt");
const OUT = path.join(ROOT, "sealed");
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };

const b64u = buf => Buffer.from(buf).toString("base64url");
const exists = p => access(p).then(() => true, () => false);

async function loadKey(init) {
  if (!(await exists(KEYFILE))) {
    if (!init) throw new Error(`no key at ${KEYFILE} (run with --init to create one)`);
    await writeFile(KEYFILE, b64u(crypto.getRandomValues(new Uint8Array(16))) + "\n", { mode: 0o600 });
    console.log("created a new key in", KEYFILE);
  }
  const raw = Buffer.from((await readFile(KEYFILE, "utf8")).trim(), "base64url");
  if (raw.length !== 16) throw new Error("key must be 16 bytes (22 base64url characters)");
  return {
    aes: await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]),
    mac: await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]),
  };
}
const hmac = async (key, data) => new Uint8Array(await crypto.subtle.sign("HMAC", key.mac, data));
async function seal(key, plain) {
  const iv = (await hmac(key, plain)).slice(0, 12);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key.aes, plain));
  return Buffer.concat([iv, ct]);
}
async function unseal(key, blob) {
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: blob.subarray(0, 12) }, key.aes, blob.subarray(12)));
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const key = await loadKey(args.has("--init"));
  await mkdir(path.join(OUT, "i"), { recursive: true });
  const written = new Set();
  const put = async (rel, plain) => {
    const file = path.join(OUT, rel);
    const blob = await seal(key, plain);
    const old = (await exists(file)) ? await readFile(file) : null;
    if (!old || !old.equals(blob)) await writeFile(file, blob);
    written.add(rel);
    return blob;
  };

  // Photos: every string in the JSON / every src="" in the kitchen page that names a file under
  // guide/files is replaced by "sealed:i/<name>.bin|<mime>"; the name hides the original file name.
  const refs = new Map();
  const sealFile = async rel => {
    if (refs.has(rel)) return refs.get(rel);
    const src = path.join(SRC, "files", rel);
    if (!(await exists(src))) return null;
    const name = "i/" + Buffer.from(await hmac(key, Buffer.from("name:" + rel))).subarray(0, 9).toString("base64url") + ".bin";
    await put(name, await readFile(src));
    const ref = `sealed:${name}|${MIME[path.extname(rel).toLowerCase()] || "application/octet-stream"}`;
    refs.set(rel, ref);
    return ref;
  };
  const walk = async o => {
    if (typeof o === "string") return (/^[\w./-]+\.(jpe?g|png|webp|svg)$/i.test(o) && (await sealFile(o))) || o;
    if (Array.isArray(o)) return Promise.all(o.map(walk));
    if (o && typeof o === "object") { const r = {}; for (const [k, v] of Object.entries(o)) r[k] = await walk(v); return r; }
    return o;
  };

  const house = JSON.parse(await readFile(path.join(SRC, "house.private.json"), "utf8"));
  delete house._comment;
  const houseOut = await walk(house);
  const stillPlain = JSON.stringify(houseOut).match(/"assets\/img\/(house|tiles)\/[^"]+"/g);
  if (stillPlain) throw new Error("photo listed in the JSON but missing under guide/files: " + [...new Set(stillPlain)].join(", "));
  await put("house.bin", Buffer.from(JSON.stringify(houseOut)));

  let kitchen = await readFile(path.join(SRC, "kitchen.body.html"), "utf8");
  for (const m of [...kitchen.matchAll(/src="([^"]+\.(?:jpe?g|png|webp|svg))"/gi)]) {
    const ref = await sealFile(m[1].replace(/^\.\.\//, ""));
    if (ref) kitchen = kitchen.replace(m[0], `data-sealed="${ref}"`);
  }
  await put("kitchen.bin", Buffer.from(kitchen));

  // drop sealed photos that are no longer referenced
  for (const f of await readdir(path.join(OUT, "i"))) if (!written.has("i/" + f)) await rm(path.join(OUT, "i", f));

  // round-trip check, always
  const back = JSON.parse(Buffer.from(await unseal(key, await readFile(path.join(OUT, "house.bin")))).toString("utf8"));
  if (JSON.stringify(back) !== JSON.stringify(houseOut)) throw new Error("round-trip check failed");
  console.log(`sealed: ${houseOut.cards.length} cards, ${refs.size} photos, kitchen page. Key is in ${path.relative(ROOT, KEYFILE)} (not in the repo).`);
}

main().catch(e => { console.error("seal failed:", e.message); process.exit(1); });
