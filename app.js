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

const themeButtons = [...document.querySelectorAll('.theme-toggle')];
const themeMeta = document.querySelector('meta[name="theme-color"]');
const applyTheme = (theme, persist = true) => {
  document.documentElement.dataset.theme = theme;
  if (persist) localStorage.setItem('saigon-theme', theme);
  themeMeta?.setAttribute('content', theme === 'light' ? '#f4efe5' : '#0b0b09');
  themeButtons.forEach((button) => {
    const next = theme === 'dark' ? 'светлую' : 'тёмную';
    button.setAttribute('aria-label', `Включить ${next} тему`);
    button.setAttribute('title', `Включить ${next} тему`);
    const icon = button.querySelector('.theme-toggle-icon');
    const text = button.querySelector('.theme-toggle-text');
    if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
    if (text) text.textContent = theme === 'dark' ? 'Светлая' : 'Тёмная';
  });
};

const savedTheme = localStorage.getItem('saigon-theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
applyTheme(savedTheme || document.documentElement.dataset.theme || systemTheme, false);
themeButtons.forEach((button) => button.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}));

const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const steam = document.createElement('div');
  steam.className = 'steam-field';
  steam.setAttribute('aria-hidden', 'true');
  steam.innerHTML = `
    <svg class="steam-svg" viewBox="0 0 520 460" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <defs>
        <filter id="steamTurbulence" x="-60%" y="-60%" width="220%" height="240%">
          <feTurbulence type="fractalNoise" baseFrequency="0.010 0.027" numOctaves="3" seed="12" result="noise">
            <animate attributeName="baseFrequency" dur="11s" values="0.010 0.027;0.016 0.021;0.009 0.030;0.010 0.027" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="46" xChannelSelector="R" yChannelSelector="G" result="warped"/>
          <feGaussianBlur in="warped" stdDeviation="10" result="blurred"/>
          <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0.08  0 1 0 0 0.08  0 0 1 0 0.08  0 0 0 .72 0"/>
        </filter>
        <filter id="steamSoft" x="-70%" y="-70%" width="240%" height="250%">
          <feTurbulence type="turbulence" baseFrequency="0.007 0.020" numOctaves="2" seed="4" result="noise2">
            <animate attributeName="baseFrequency" dur="14s" values="0.007 0.020;0.012 0.016;0.006 0.024;0.007 0.020" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise2" scale="58"/>
          <feGaussianBlur stdDeviation="18"/>
        </filter>
        <linearGradient id="steamFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity=".44"/>
          <stop offset=".42" stop-color="#fff" stop-opacity=".27"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <g class="steam-plume">
        <path class="steam-soft" d="M166 426 C111 352 183 310 151 250 C123 196 183 158 164 100 C151 62 184 29 210 7 C202 68 241 92 215 143 C188 198 242 231 214 286 C189 336 231 373 212 426 Z" fill="url(#steamFade)" filter="url(#steamSoft)"/>
        <path class="steam-core" d="M190 427 C153 360 212 319 180 266 C153 221 211 180 190 133 C174 97 205 57 231 31 C219 86 256 111 229 158 C205 201 249 239 224 286 C199 333 241 375 220 427 Z" fill="url(#steamFade)" filter="url(#steamTurbulence)"/>
      </g>
      <g class="steam-plume">
        <path class="steam-soft" d="M283 431 C238 375 296 332 269 276 C245 226 301 188 280 137 C262 94 302 52 326 17 C317 78 349 109 326 156 C301 207 350 244 326 294 C303 342 345 384 323 431 Z" fill="url(#steamFade)" filter="url(#steamSoft)"/>
        <path class="steam-core" d="M306 430 C270 371 326 330 300 279 C276 232 328 195 310 148 C296 109 326 70 348 41 C338 92 370 121 348 166 C326 210 367 250 345 296 C323 343 361 384 343 430 Z" fill="url(#steamFade)" filter="url(#steamTurbulence)"/>
      </g>
      <g class="steam-plume">
        <path class="steam-soft" d="M226 438 C190 391 234 357 216 316 C197 274 235 245 219 207 C204 171 233 142 250 113 C245 153 268 178 253 210 C236 246 269 278 253 316 C237 354 266 395 254 438 Z" fill="url(#steamFade)" filter="url(#steamSoft)"/>
        <path class="steam-core" d="M245 437 C218 392 257 359 241 319 C225 282 258 250 246 215 C235 183 259 155 276 132 C268 169 290 190 274 220 C259 250 286 283 271 317 C255 352 283 395 270 437 Z" fill="url(#steamFade)" filter="url(#steamTurbulence)"/>
      </g>
    </svg>`;
  hero.appendChild(steam);
}
