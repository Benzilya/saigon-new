const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

const header = document.querySelector('.site-header');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Lightweight, layered steam above the hero dish. It is decorative only and
// disappears automatically for users who prefer reduced motion.
const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const steamStyles = document.createElement('link');
  steamStyles.rel = 'stylesheet';
  steamStyles.href = 'steam.css';
  document.head.appendChild(steamStyles);

  const steam = document.createElement('div');
  steam.className = 'steam-field';
  steam.setAttribute('aria-hidden', 'true');
  steam.innerHTML = '<i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i><i class="steam-wisp"></i>';
  hero.appendChild(steam);
}
