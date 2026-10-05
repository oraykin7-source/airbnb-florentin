const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const out=process.argv[2]||'shots';require('fs').mkdirSync(out,{recursive:true});
const pages=process.argv.slice(3);
for(const p of pages){const name=p.replace(/\W+/g,'_');
 for(const [tag,w,h] of [['m',390,844],['d',1280,800]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:tag==='m'?2:1});const pg=await ctx.newPage();
  const errs=[];pg.on('console',m=>m.type()==='error'&&errs.push(m.text()));pg.on('response',r=>{if(r.status()>=400)errs.push(r.status()+' '+r.url())});pg.on('pageerror',e=>errs.push(String(e)));
  await pg.goto('http://localhost:8420/'+p,{waitUntil:'networkidle'}).catch(e=>errs.push('nav '+e.message));
  await pg.addStyleTag({path:'versions/_fonts/fonts.css'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(1200);
  const ov=await pg.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const bad=await pg.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')));
  console.log(name,tag,'overflowX',ov,'brokenImgs',JSON.stringify(bad),'errors',JSON.stringify(errs));
  await pg.screenshot({path:`${out}/${name}-${tag}-top.png`});
  await pg.screenshot({path:`${out}/${name}-${tag}-full.png`,fullPage:true});
  await ctx.close();}}
await b.close()})();
