const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

const navConnect = document.querySelector('.nav-connect');
const navCta = document.querySelector('.nav-cta');

navCta.addEventListener('click', () => {
  const isOpen = navConnect.classList.toggle('is-open');
  navCta.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (event) => {
  if (!navConnect.contains(event.target)) {
    navConnect.classList.remove('is-open');
    navCta.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navConnect.classList.remove('is-open');
    navCta.setAttribute('aria-expanded', 'false');
    navCta.focus();
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const themeButtons = document.querySelectorAll('.theme-swatch');
const availableThemes = ['sage', 'ocean', 'cream', 'sky'];
const storedTheme = localStorage.getItem('portfolio-theme');
const savedTheme = availableThemes.includes(storedTheme) ? storedTheme : 'sage';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const themeColors = {
    sage: '#101812',
    ocean: '#091827',
    cream: '#f3f0e7',
    sky: '#edf6f8'
  };
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColors[theme]);
  localStorage.setItem('portfolio-theme', theme);
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

applyTheme(savedTheme);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
