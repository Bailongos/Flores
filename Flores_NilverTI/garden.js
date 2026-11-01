(() => {
  const garden = document.querySelector('.garden-ui');
  if (!garden) return;
  const toast = document.querySelector('#wish-toast');
  const wish = document.querySelector('#wish-button');
  const petals = document.querySelector('#petal-button');
  const wishes = ['Que nunca te falten motivos para sonreír. ✨', 'Ojalá hoy te pase algo tan bonito como tú. 🌼', 'Las cosas más bonitas florecen a su tiempo. 💛', 'Un pequeño recordatorio: haces el mundo más bonito. ♡'];
  let index = 0, hideToast;
  wish?.addEventListener('click', () => {
    toast.textContent = wishes[index++ % wishes.length];
    toast.hidden = false;
    clearTimeout(hideToast);
    hideToast = setTimeout(() => { toast.hidden = true; }, 4400);
  });
  petals?.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i=0; i<24; i++) {
      const petal = document.createElement('span');
      petal.className = 'garden-petal'; petal.textContent = i % 3 === 0 ? '✨' : '🌸';
      petal.style.left = Math.random()*100+'vw';
      petal.style.setProperty('--dx', ((Math.random()-.5)*220)+'px');
      petal.style.setProperty('--dur', (3+Math.random()*3)+'s');
      petal.style.animationDelay = Math.random()*.9+'s';
      document.body.appendChild(petal);
      petal.addEventListener('animationend', () => petal.remove(), {once:true});
    }
  });
})();