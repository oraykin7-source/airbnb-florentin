const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const T=[['now','Now'],['t1-sea','1 · Sea'],['t2-olive','2 · Olive'],['t3-midnight','3 · Midnight'],['t4-pop','4 · Pop']];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const v of process.argv.slice(2)){
const html='<body style="margin:0;background:#222;font:700 20px system-ui;color:#fff;padding:20px;display:flex;gap:18px;align-items:flex-start">'+T.map(([n,l])=>`<div><div style="margin-bottom:10px">${l}</div><img src="http://localhost:8420/versions/shots/th-${v}-${n}.png" width="380" style="display:block;border-radius:10px"></div>`).join('')+'</body>';
const p=await (await b.newContext({viewport:{width:2000,height:600}})).newPage();await p.setContent(html);await p.waitForTimeout(1000);
await p.screenshot({path:`versions/shots/sheet-${v}.png`,fullPage:true});}
await b.close()})();
