document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mainRegForm");
  const demoButton = document.getElementById("demo-submit");
  const message = document.getElementById("demo-form-message");

  if (form) {
    form.addEventListener("submit", (event) => event.preventDefault());
  }

  if (form && demoButton && message) {
    demoButton.addEventListener("click", () => {
      if (!form.reportValidity()) return;

      message.textContent =
        "Demostración de portafolio — no se envió ni guardó ningún dato.";
      form.reset();
    });
  }

  document
    .querySelectorAll("button.lp-action, .button-section button")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        if (form && form.contains(button)) return;
        event.preventDefault();
        document
          .getElementById("desktopForm")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

  const investmentInput = document.getElementById("investment");
  const amountText = document.getElementById("amount");
  const yearSelect = document.getElementById("year");
  const resultText = document.getElementById("result");
  const multipliers = { 2015: 10, 2018: 70, 2020: 5, 2022: 3 };

  const animateValue = (element, start, end, duration = 800) => {
    let startedAt = null;

    const step = (timestamp) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = `$${value.toLocaleString()}`;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const updateResult = () => {
    if (!investmentInput || !yearSelect || !resultText) return;
    const investment = Number(investmentInput.value);
    const multiplier = multipliers[yearSelect.value] || 1;
    animateValue(resultText, 0, investment * multiplier);
  };

  const updateRange = () => {
    if (!investmentInput) return;
    const value =
      ((investmentInput.value - investmentInput.min) /
        (investmentInput.max - investmentInput.min)) *
      100;
    investmentInput.style.setProperty("--range-progress", `${value}%`);
  };

  if (investmentInput && amountText) {
    investmentInput.addEventListener("input", () => {
      amountText.textContent = investmentInput.value;
      updateResult();
      updateRange();
    });
  }

  yearSelect?.addEventListener("change", updateResult);
  updateResult();
  updateRange();

  const timerParts = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  if (Object.values(timerParts).every(Boolean)) {
    let totalSeconds = 350 * 24 * 60 * 60 + 1 * 60 * 60 + 59 * 60 + 59;
    const pad = (value) => String(value).padStart(2, "0");

    const updateTimer = () => {
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      timerParts.days.textContent = days;
      timerParts.hours.textContent = hours;
      timerParts.minutes.textContent = pad(minutes);
      timerParts.seconds.textContent = pad(seconds);

      if (totalSeconds > 0) totalSeconds -= 1;
    };

    updateTimer();
    window.setInterval(updateTimer, 1000);
  }
});
