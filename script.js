const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check if the user already picked a theme before (saved in browser)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  html.setAttribute('data-theme', 'light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isLight = html.getAttribute('data-theme') === 'light';

  if (isLight) {
    html.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
});