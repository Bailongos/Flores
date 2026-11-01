/* Magic forest: handcrafted SVG scenery and pointer-triggered fairy dust. */
(() => {
 const world=document.querySelector('.enchanted-world');
 if(!world)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const svg=(body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true">'+body+'</svg>';
 const fungus=(color)=>svg('<ellipse cx="50" cy="88" rx="40" ry="8" fill="#6cbf9e" opacity=".22"/><path class="stalk" d="M39 50 Q44 66 38 86 Q51 93 62 86 Q55 66 61 50Z"/><path class="halo" d="M10 53 Q12 15 50 13 Q90 15 92 53"/><path class="cap" d="M8 57 Q14 12 50 13 Q86 12 92 57 Q51 74 8 57Z" style="--cap:'+color+'"/><ellipse cx="30" cy="45" rx="6" ry="4" class="dots"/><ellipse cx="57" cy="29" rx="8" ry="5" class="dots"/><ellipse cx="70" cy="48" rx="5" ry="3.5" class="dots"/><ellipse cx="45" cy="54" rx="4" ry="3" class="dots"/>');
 const crystal=(color)=>svg('<ellipse cx="50" cy="94" rx="42" ry="6" fill="'+color+'" opacity=".28"/><path class="facet" d="M35 84 L28 42 L48 9 L66 40 L61 84Z" fill="'+color+'"/><path class="facet" d="M49 9 L48 83 L66 40Z" opacity=".55"/><path class="facet" d="M6 87 L14 56 L30 39 L39 88Z" fill="'+color+'"/><path class="facet" d="M64 90 L67 55 L83 36 L96 90Z" fill="'+color+'"/><path class="shine" d="M46 19 L36 45 L42 41Z"/><path class="shine" d="M81 48 L72 69 L77 67Z"/>');
 const fairy=(color)=>svg(
  '<defs><radialGradient id="pixieLight"><stop offset="0" stop-color="#fffefa"/><stop offset=".35" stop-color="'+color+'"/><stop offset="1" stop-color="'+color+'" stop-opacity=".2"/></radialGradient></defs>'+
  '<g class="fairy-wing wing-upper"><path d="M49 51 C17 -2 -6 16 18 49 Q30 64 49 51Z" fill="#c7ecff" fill-opacity=".83" stroke="#f4ffff" stroke-width="1.3"/><path d="M45 53 C5 45 14 85 38 75Z" fill="#9bdbe3" fill-opacity=".58" stroke="#eaffff" stroke-width="1.2"/></g>'+
  '<g class="fairy-wing wing-lower"><path d="M51 51 C83 -2 106 16 82 49 Q70 64 51 51Z" fill="#e7ceff" fill-opacity=".82" stroke="#faf3ff" stroke-width="1.3"/><path d="M55 53 C95 45 86 85 62 75Z" fill="#c69afc" fill-opacity=".58" stroke="#fff0ff" stroke-width="1.2"/></g>'+
  '<ellipse cx="50" cy="57" rx="9" ry="17" fill="url(#pixieLight)" opacity=".88"/>'+
  '<circle cx="50" cy="37" r="8" fill="#ffefcf"/><path d="M42 38 Q38 21 50 24 Q63 21 58 38 Q53 31 42 38" fill="#f4d79c"/>'+
  '<path d="M45 70 Q50 85 55 70" fill="none" stroke="'+color+'" stroke-width="4" stroke-linecap="round"/>'+
  '<circle cx="50" cy="56" r="4" fill="#fff" /><circle cx="47" cy="54" r="1.5" fill="#fff" />');
 const decorations=[
  ['fungus',3,3,115,'#bd7aff','#d6a4ff'],['crystal',15,1,90,'#8deeff','#88f9ed'],
  ['fungus',81,3,105,'#ff83bc','#ffb3e3'],['crystal',91,0,110,'#b4a3ff','#b3a4ff'],
  ['fungus',27,0,65,'#82cefa','#8fe8fc'],['crystal',72,2,75,'#f9b8ff','#dfabff']
 ];
 decorations.filter((_,i)=>window.matchMedia('(max-width: 700px)').matches ? i%2===0 : true).forEach(([type,x,bottom,size,color,glow],i)=>{
  const node=document.createElement('div');node.className='fantasy-object '+type;
  node.style.cssText='--x:'+x+'%;--bottom:'+bottom+'%;--size:'+size+'px;--cap:'+color+';--glow:'+glow+';--delay:'+(i*.3)+'s;--duration:'+(4+i%3)+'s';
  node.innerHTML=type==='fungus'?fungus(color):crystal(color);world.appendChild(node);
 });
 [[8,40,72,'#93ffdd',12,0],[78,35,80,'#ffd1f2',16,-6],[47,46,59,'#d0b2ff',13,-10]].filter((_,i)=>!window.matchMedia('(max-width: 700px)').matches || i===1).forEach(([x,y,size,color,duration,delay])=>{
  const node=document.createElement('div');node.className='fairy';
  node.style.cssText='--x:'+x+'%;--y:'+y+'%;--size:'+size+'px;--glow:'+color+';--duration:'+duration+'s;--delay:'+delay+'s';node.innerHTML=fairy(color);world.appendChild(node);
 });
 for(let i=0;i<(window.matchMedia('(max-width: 700px)').matches?6:12);i++){
  const orb=document.createElement('div');orb.className='floating-orb';
  orb.style.cssText='--x:'+((i*37+11)%97)+'%;--y:'+(17+(i*29)%73)+'%;--size:'+(3+i%5*2)+'px;--glow:'+(i%2?'#b9a2ff':'#8cffe2')+';--duration:'+(4+i%6)+'s;--delay:'+(-i*.43)+'s';world.appendChild(orb);
 }
 if(!reduced && !window.matchMedia('(max-width: 700px)').matches)for(let i=0;i<3;i++){
  const star=document.createElement('div');star.className='shooting-star';
  star.style.cssText='--x:'+(17+i*19)+'%;--y:'+(10+i%3*13)+'%;--length:'+(65+i*13)+'px;--duration:'+(7+i*2)+'s;--delay:'+(i*2.6)+'s';world.appendChild(star);
 }
 function burst(x,y,count=22){
  if(reduced)return;
  const colors=['#ffe9a5','#a8ffe8','#d9acff','#ffbddb','#ffffff'];
  for(let i=0;i<count;i++){
   const angle=2*Math.PI*i/count,dist=45+Math.random()*135;
   const node=document.createElement('span');node.className='sparkle-burst';
   node.style.cssText='--x:'+x+'px;--y:'+y+'px;--dx:'+Math.cos(angle)*dist+'px;--dy:'+Math.sin(angle)*dist+'px;--color:'+colors[i%colors.length];
   world.appendChild(node);node.addEventListener('animationend',()=>node.remove(),{once:true});
  }
 }
 document.getElementById('spell-button')?.addEventListener('click',()=>burst(innerWidth/2,innerHeight*.5,24));
 document.addEventListener('pointerdown',e=>{
  if(e.target.closest('button,a'))return;
  burst(e.clientX,e.clientY,8);
 });
})();
