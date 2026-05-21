const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

function setTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    formNote.textContent = 'Silakan isi semua bidang sebelum mengirim.';
    return;
  }

  const subject = encodeURIComponent(`Permintaan portofolio dari ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
  window.location.href = `mailto:sodikin@example.com?subject=${subject}&body=${body}`;
  formNote.textContent = 'Silakan lanjutkan kirim di aplikasi email Anda.';
});

loadTheme();
