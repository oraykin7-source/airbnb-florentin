const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const fonts=fs.readFileSync('versions/_fonts/fonts-8421.css','utf8');
const themes=[['now',null],['t1-sea','t1-sea.css'],['t2-olive','t2-olive.css'],['t3-midnight','t3-midnight.css'],['t4-pop','t4-pop.css']];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [name,css] of themes){
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:name==='t3-midnight'?'dark':'light'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://localhost:8421/index.html',{waitUntil:'networkidle'}).catch(()=>{});
 await p.addStyleTag({content:fonts});if(css)await p.addStyleTag({content:fs.readFileSync('versions/themes/'+css,'utf8')});
 const go=async(sel)=>{await p.click(sel);await p.waitForTimeout(500);};
 const snap=async(v)=>{await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);await p.screenshot({path:`versions/shots/th-${v}-${name}.png`});};
 await p.evaluate(()=>window.scrollTo(0,0));await snap('home');
 await p.evaluate(()=>window.scrollTo(0,640));await snap('home2');
 await go('.tabbar a[data-target="house"]');await p.evaluate(()=>window.scrollTo(0,0));await snap('apt');
 await p.evaluate(()=>{const c=document.querySelector('#house-cards details');c&&(c.open=true)});await p.evaluate(()=>window.scrollTo(0,150));await snap('apt-open');
 await go('.tabbar a[data-target="places"]');await p.evaluate(()=>window.scrollTo(0,0));await snap('places');
 console.log(name,JSON.stringify(errs));await ctx.close();}
await b.close()})();
