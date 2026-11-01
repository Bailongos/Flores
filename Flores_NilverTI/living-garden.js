/* Decorative life is generated once; no framework or network dependency. */
(() => {
  const scene = document.querySelector('.living-garden');
  if (!scene) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const flowers = [
    [3,5,70,'#ffb8d2',0],[13,1,57,'#f9d67a',1],[23,3,45,'#cbafff',2],
    [32,0,53,'#ffcf8e',3],[43,2,42,'#ff9cbb',4],[54,1,45,'#fff0a4',5],
    [66,0,58,'#d2acff',6],[77,2,46,'#f7bbd7',7],[87,1,65,'#ffcc86',8],[96,4,54,'#b6d5ff',9]
  ];
  for (const [left,bottom,size,color,i] of flowers) {
    const flower = document.createElement('div');
    flower.className = 'mini-flower';
    flower.style.cssText = '--left:'+left+'%;--bottom:'+bottom+'%;--size:'+size+'px;--petal:'+color+';--speed:'+(3.5+i%4)+'s;--delay:'+(-i*.6)+'s';
    flower.innerHTML = '<span class="stem"></span><span class="bloom">'+Array.from({length:8},(_,n)=>'<span class="petal" style="--i:'+n+'"></span>').join('')+'<span class="core"></span></span>';
    scene.appendChild(flower);
  }
  const animals = [
    ['🦋','butterfly',9,37,34,12,0],['🦋','butterfly',71,30,31,14,-4],
    ['🦋','butterfly',38,57,26,16,-8],['🐝','bee',19,72,27,11,-2],
    ['🐝','bee',81,62,25,12,-6],['🐞','ladybug',60,79,23,17,-10]
  ];
  for (const [emoji,type,x,y,size,duration,delay] of animals) {
    const creature = document.createElement('div');
    creature.className = 'critter '+type;
    creature.setAttribute('aria-hidden','true');
    creature.style.cssText = '--x:'+x+'%;--y:'+y+'%;--critter-size:'+size+'px;--duration:'+duration+'s;--delay:'+delay+'s';
    const icon = document.createElement('span');icon.textContent=emoji;creature.appendChild(icon);scene.appendChild(creature);
  }
  for (let i=0;i<25;i++) {
    const light = document.createElement('span');
    light.className='firefly';
    light.style.cssText='--x:'+((i*37+13)%96)+'%;--y:'+(21+(i*23)%69)+'%;--duration:'+(4+i%5)+'s;--delay:'+(-i*.67)+'s';
    scene.appendChild(light);
  }
  const toggle = document.getElementById('animals-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const paused = document.body.classList.toggle('animals-paused');
      toggle.textContent=paused?'▶ Animar animalitos':'⏸ Pausar animalitos';
      toggle.setAttribute('aria-pressed',String(paused));
    });
  }
  if (reduced) {
    document.body.classList.add('animals-paused');
    if(toggle){toggle.textContent='▶ Animar animalitos';toggle.setAttribute('aria-pressed','true')}
  }
})();