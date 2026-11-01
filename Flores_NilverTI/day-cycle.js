/* A complete fantasy day is 120 real seconds; the counter starts at day one. */
(() => {
 const sky=document.querySelector('.time-sky'),clock=document.getElementById('garden-clock');
 if(!sky||!clock)return;
 const root=document.documentElement,body=document.body;
 const DAY_LENGTH=120000,START_HOUR=5.5;
 const phases=[
  {hour:0,top:[7,12,34],bottom:[23,33,68]},
  {hour:5,top:[23,27,67],bottom:[104,65,114]},
  {hour:7,top:[111,158,209],bottom:[255,181,149]},
  {hour:10,top:[69,149,220],bottom:[172,225,246]},
  {hour:15,top:[70,154,228],bottom:[173,226,248]},
  {hour:18,top:[110,86,159],bottom:[248,151,132]},
  {hour:20,top:[20,23,67],bottom:[88,53,110]},
  {hour:24,top:[7,12,34],bottom:[23,33,68]}
 ];
 const blend=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
 const rgb=values=>'rgb('+values.join(',')+')';
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const ease=t=>t*t*(3-2*t);
 const timeEl=document.getElementById('clock-time'),phaseEl=document.getElementById('clock-phase'),dayEl=document.getElementById('clock-day'),symbol=document.getElementById('clock-symbol'),toggle=document.getElementById('clock-toggle');
 let paused=false,elapsed=0,last=performance.now(),lastPaint=-Infinity;
 function tick(now){
  if(!paused)elapsed+=Math.min(now-last,1000);
  last=now;
  const total=START_HOUR+elapsed/DAY_LENGTH*24,day=Math.floor(total/24)+1,hour=total%24;
  if(now-lastPaint>=250 || lastPaint===-Infinity){
   lastPaint=now;
   const hh=String(Math.floor(hour)).padStart(2,'0'),mm=String(Math.floor(hour*60)%60).padStart(2,'0');
   timeEl.textContent=hh+':'+mm;dayEl.textContent='Día '+day+' · Tiempo mágico';
   const phase=hour<5||hour>=20?'night':hour<8?'dawn':hour<17?'day':'dusk';
   body.dataset.phase=phase;
   const names={night:'Noche estrellada',dawn:'Amanecer',day:'Día soleado',dusk:'Atardecer'};
   const symbols={night:'🌙',dawn:'🌅',day:'☀️',dusk:'🌇'};
   phaseEl.textContent=names[phase];symbol.textContent=symbols[phase];
   let from=phases[0],to=phases[1];
   for(let i=0;i<phases.length-1;i++)if(hour>=phases[i].hour&&hour<phases[i+1].hour){from=phases[i];to=phases[i+1];break;}
   const t=ease((hour-from.hour)/(to.hour-from.hour));
   root.style.setProperty('--sky-top',rgb(blend(from.top,to.top,t)));
   root.style.setProperty('--sky-bottom',rgb(blend(from.bottom,to.bottom,t)));
   const sunAltitude=Math.sin(Math.PI*(hour-6)/12);
   const sunVisible=clamp((sunAltitude+.13)*4,0,1);
   root.style.setProperty('--sun-x',(7+86*clamp((hour-6)/12,0,1))+'%');
   root.style.setProperty('--sun-y',(84-65*Math.max(0,sunAltitude))+'%');
   root.style.setProperty('--sun-opacity',sunVisible.toFixed(2));
   const moonProgress=((hour+6)%24)/12;
   const moonAltitude=Math.max(0,Math.sin(Math.PI*moonProgress));
   root.style.setProperty('--moon-x',(8+83*clamp(moonProgress,0,1))+'%');
   root.style.setProperty('--moon-y',(85-63*moonAltitude)+'%');
   root.style.setProperty('--moon-opacity',clamp((1-sunVisible)*1.15,0,1).toFixed(2));
   root.style.setProperty('--horizon-glow',phase==='dusk'?'#ffac827a':phase==='dawn'?'#ffe2a070':'#72d6a43d');
  }
  if(!paused)requestAnimationFrame(tick);
 }
 toggle?.addEventListener('click',()=>{
  paused=!paused;toggle.textContent=paused?'▶':'⏸';
  toggle.setAttribute('aria-label',paused?'Reanudar ciclo de día y noche':'Pausar ciclo de día y noche');
  toggle.setAttribute('aria-pressed',String(paused));
  if(!paused){last=performance.now();requestAnimationFrame(tick);}
 });
 requestAnimationFrame(tick);
})();
