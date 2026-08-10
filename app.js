const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const closeNav = () => {
  if (!toggle || !nav) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Открыть меню');
};

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
      toggle.focus();
    }
  });
}

const header = document.querySelector('.site-header');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Decorative layered steam: CSS-only animation, no animation loop in JavaScript.
const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const steam = document.createElement('div');
  steam.className = 'steam-field';
  steam.setAttribute('aria-hidden', 'true');
  steam.innerHTML = '<i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i>';
  hero.appendChild(steam);
}
