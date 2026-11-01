/* Animaciones artesanales: flores que brotan y criaturas dibujadas con SVG. */
(() => {
  const scene=document.querySelector('.living-garden');
  if(!scene)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const svg=(markup,viewBox='0 0 100 100')=>'<svg class="floral-svg" xmlns="http://www.w3.org/2000/svg" viewBox="'+viewBox+'" aria-hidden="true" focusable="false">'+markup+'</svg>';
  const flowerMarkup=()=>svg(
    '<defs><linearGradient id="petalDepth" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff9e8"/><stop offset="24%" stop-color="var(--petal)"/><stop offset="65%" stop-color="var(--petal)"/><stop offset="100%" stop-color="#59385d"/></linearGradient><radialGradient id="coreDepth" cx="30%" cy="24%" r="75%"><stop offset="0%" stop-color="#fffde7"/><stop offset="44%" stop-color="#ffe18a"/><stop offset="100%" stop-color="#bb7938"/></radialGradient><linearGradient id="stemDepth"><stop stop-color="#135e4a"/><stop offset="48%" stop-color="#69d5a0"/><stop offset="100%" stop-color="#155845"/></linearGradient><linearGradient id="leafDepth" x1="0" x2="1" y1="0" y2=".5"><stop stop-color="#114f43"/><stop offset=".6" stop-color="#56c596"/><stop offset="1" stop-color="#1c6e5a"/></linearGradient></defs>'+
    '<path class="flower-stem" d="M50 182 Q40 116 50 48"/>'+
    '<path class="flower-leaf" d="M47 140 Q6 108 11 97 Q43 95 48 129Z"/>'+
    '<path class="flower-leaf" d="M49 119 Q91 91 88 80 Q55 85 48 109Z"/>'+
    '<path class="flower-leaf" d="M48 166 Q18 155 22 141 Q42 141 50 158Z"/>'+
    '<g class="flower-head">'+
    Array.from({length:9},(_,i)=>'<ellipse class="flower-petal" cx="50" cy="26" rx="12" ry="24" transform="rotate('+(i*40)+' 50 49)"/>').join('')+
    '<circle class="flower-core flower-glimmer" cx="50" cy="49" r="14"/>'+
    '<circle class="flower-specks" cx="45" cy="45" r="1.5"/><circle class="flower-specks" cx="54" cy="51" r="1.3"/><circle class="flower-specks" cx="47" cy="56" r="1.4"/></g>','0 0 100 185');
  const butterfly=(a,b)=>svg(
    '<g class="wing-l"><path d="M49 49 C13 -5 -7 13 11 44 Q20 58 49 54Z" fill="'+a+'"/><path d="M49 54 C10 47 12 92 40 77 Q48 70 49 54Z" fill="'+b+'"/><path d="M43 48 Q20 20 13 27" class="wing-veins"/><circle cx="19" cy="38" r="4" fill="#fff4c6"/></g>'+
    '<g class="wing-r"><path d="M51 49 C87 -5 107 13 89 44 Q80 58 51 54Z" fill="'+a+'"/><path d="M51 54 C90 47 88 92 60 77 Q52 70 51 54Z" fill="'+b+'"/><path d="M57 48 Q80 20 87 27" class="wing-veins"/><circle cx="81" cy="38" r="4" fill="#fff4c6"/></g>'+
    '<ellipse cx="50" cy="54" rx="4.4" ry="24" fill="#192c42"/><circle cx="50" cy="31" r="6" fill="#192c42"/>'+
    '<path d="M48 26 Q37 12 33 18 M52 26 Q63 12 67 18" stroke="#263a48" stroke-width="2" fill="none" stroke-linecap="round"/>');
  const bee=()=>svg(
    '<g class="wing-l"><ellipse cx="31" cy="27" rx="19" ry="26" transform="rotate(-30 31 27)" fill="#ccfbff" fill-opacity=".83" stroke="#ebffff" stroke-width="2"/></g>'+
    '<g class="wing-r"><ellipse cx="68" cy="27" rx="19" ry="26" transform="rotate(30 68 27)" fill="#ccfbff" fill-opacity=".83" stroke="#ebffff" stroke-width="2"/></g>'+
    '<ellipse cx="50" cy="55" rx="31" ry="24" fill="#ffd35c" stroke="#b67d29" stroke-width="2"/>'+
    '<path d="M34 34 Q27 55 33 74 M51 31 Q44 54 50 79 M68 38 Q61 54 69 72" stroke="#342f3b" stroke-width="8" fill="none"/>'+
    '<circle cx="70" cy="48" r="3" fill="#18242e"/><circle cx="72" cy="58" r="4" fill="#ff909c" fill-opacity=".75"/>'+
    '<path d="M18 51 L8 57 L19 63" fill="#c3863b"/>');
  const ladybug=()=>svg(
    '<ellipse cx="50" cy="55" rx="35" ry="28" fill="#211d2e"/>'+
    '<path d="M50 32 C-2 25 10 90 49 82Z" fill="#fb6c70"/><path d="M50 32 C102 25 90 90 51 82Z" fill="#df395f"/>'+
    '<path d="M50 32 V82" stroke="#24202b" stroke-width="3"/>'+
    '<circle cx="30" cy="52" r="6" fill="#341c35"/><circle cx="38" cy="70" r="5" fill="#341c35"/><circle cx="68" cy="51" r="6" fill="#341c35"/><circle cx="60" cy="70" r="5" fill="#341c35"/>'+
    '<circle cx="50" cy="26" r="15" fill="#222331"/><path d="M42 17 L36 9 M58 17 L64 9" stroke="#222331" stroke-width="3" fill="none"/>');
  const flowers=[
    [1,1,151,'#ff9ec8'],[12,0,125,'#ffdb7c'],[24,1,105,'#bfa5ff'],
    [35,-1,112,'#f8a1ab'],[46,1,104,'#ffe6a6'],[57,0,118,'#e2b1ff'],
    [68,-1,116,'#ffbc8d'],[79,1,129,'#f69fc5'],[90,0,149,'#b2d9fa'],
    [7,0,96,'#ffe2a2'],[96,2,96,'#e8a9ff']
  ];
  flowers.forEach(([left,bottom,size,petal],i)=>{
    const el=document.createElement('div');el.className='mini-flower';
    el.style.cssText='--left:'+left+'%;--bottom:'+bottom+'%;--size:'+size+'px;--petal:'+petal+';--flower-angle:'+(i%2===0?'-16deg':'16deg')+';--speed:'+(3.6+i%4*.65)+'s;--delay:'+(-i*.34)+'s;--grow:'+(i*.21)+'s';
    el.innerHTML=flowerMarkup().replace(/id="(petalDepth|coreDepth|stemDepth|leafDepth)"/g, (_,id)=>'id="'+id+i+'"').replace(/url\(#(petalDepth|coreDepth|stemDepth|leafDepth)\)/g,(_,id)=>'url(#'+id+i+')');scene.appendChild(el);
  });
  const creatures=[
    ['butterfly',8,30,114,12,0,butterfly('#a4caff','#7a7fe2')],
    ['butterfly',72,27,108,15,-3,butterfly('#ffb2d8','#f375b9')],
    ['butterfly',38,48,86,17,-8,butterfly('#ffd9a2','#f3ab6a')],
    ['bee',18,65,83,11,-2,bee()],
    ['bee',77,62,79,13,-7,bee()],
    ['ladybug',58,76,56,19,-9,ladybug()]
  ];
  creatures.forEach(([type,x,y,size,duration,delay,art])=>{
    const el=document.createElement('div');el.className='critter '+type;
    el.style.cssText='--x:'+x+'%;--y:'+y+'%;--critter-size:'+size+'px;--duration:'+duration+'s;--delay:'+delay+'s';
    el.innerHTML=art;scene.appendChild(el);
  });
  for(let i=0;i<22;i++){
    const el=document.createElement('span');el.className='firefly';
    el.style.cssText='--x:'+((i*37+13)%96)+'%;--y:'+(20+(i*23)%70)+'%;--duration:'+(4+i%5)+'s;--delay:'+(-i*.67)+'s';
    scene.appendChild(el);
  }
  for(let i=0;i<14;i++){
    const el=document.createElement('span');el.className='magic-spark';
    el.style.cssText='--x:'+((i*29+8)%95)+'%;--bottom:'+(i%4*9)+'%;--duration:'+(5+i%5)+'s;--delay:'+(-i*.63)+'s';scene.appendChild(el);
  }
  const toggle=document.getElementById('animals-toggle');
  if(toggle){
    const refresh=()=>{
      const paused=document.body.classList.contains('animals-paused');
      toggle.textContent=paused?'▶ Animar animalitos':'⏸ Pausar animalitos';
      toggle.setAttribute('aria-pressed',String(paused));
    };
    toggle.addEventListener('click',()=>{document.body.classList.toggle('animals-paused');refresh();});
    if(reduce){document.body.classList.add('animals-paused');refresh();}
  }
})();