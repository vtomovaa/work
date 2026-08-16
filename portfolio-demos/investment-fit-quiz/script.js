const questions = [...document.querySelectorAll('.question')];
const form = document.querySelector('#quizForm');
const nextButton = document.querySelector('#nextButton');
const backButton = document.querySelector('#backButton');
const restartButton = document.querySelector('#restartButton');
const progressBar = document.querySelector('#progressBar');
const stepLabel = document.querySelector('#stepLabel');
const errorMessage = document.querySelector('#errorMessage');
const result = document.querySelector('#result');
let currentStep = 0;

function showStep() {
  questions.forEach((question, index) => question.classList.toggle('is-active', index === currentStep));
  progressBar.style.width = `${((currentStep + 1) / questions.length) * 100}%`;
  stepLabel.textContent = `Question ${currentStep + 1} of ${questions.length}`;
  backButton.hidden = currentStep === 0;
  nextButton.textContent = currentStep === questions.length - 1 ? 'View result →' : 'Continue →';
  errorMessage.textContent = '';
}

nextButton.addEventListener('click', () => {
  const selected = questions[currentStep].querySelector('input:checked');
  if (!selected) { errorMessage.textContent = 'Please choose one option to continue.'; return; }
  if (currentStep < questions.length - 1) { currentStep += 1; showStep(); return; }

  const data = new FormData(form);
  document.querySelector('#resultText').textContent = `You prefer a ${data.get('goal').toLowerCase()} approach, respond to change in a ${data.get('risk').toLowerCase()} way and are most curious about ${data.get('interest').toLowerCase()}.`;
  form.hidden = true;
  stepLabel.hidden = true;
  document.querySelector('.progress').hidden = true;
  result.hidden = false;
});

backButton.addEventListener('click', () => { currentStep -= 1; showStep(); });
restartButton.addEventListener('click', () => { form.reset(); currentStep = 0; form.hidden = false; stepLabel.hidden = false; document.querySelector('.progress').hidden = false; result.hidden = true; showStep(); });
