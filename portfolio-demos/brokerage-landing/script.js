const form = document.querySelector('#contactForm');
const message = document.querySelector('#formMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'Demo complete — no information was sent or saved.';
  form.reset();
});
