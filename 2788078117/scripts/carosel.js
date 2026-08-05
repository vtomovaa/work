const track = document.querySelector(".section-9 .testimonials");
const pages = document.querySelectorAll(".section-9 .page");
const dots = document.querySelectorAll(".section-9 .dot");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentPage = 0;
const totalPages = pages.length;

function updateCarousel() {
  const pageWidth = pages[0].getBoundingClientRect().width;
  const gap = parseInt(getComputedStyle(track).gap);

  const shift = (pageWidth + gap) * currentPage;
  track.style.transform = `translateX(-${shift}px)`;

  // --------- DOTS LOGIC ----------
  dots.forEach((dot) => dot.classList.remove("active-dot"));
  dots[currentPage].classList.add("active-dot");

  // --------- BUTTON LOGIC ----------
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === totalPages - 1;

  prevBtn.classList.toggle("disabled", currentPage === 0);
  nextBtn.classList.toggle("disabled", currentPage === totalPages - 1);
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateCarousel();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateCarousel();
  }
});
window.addEventListener("resize", updateCarousel);
updateCarousel();

const headingButtons = document.getElementById("heading-buttons");
const mobileContainer = document.getElementById("heading-buttons-mobile");
const desktopContainer = headingButtons.parentElement;

function moveButtons() {
  if (window.innerWidth < 992) {
    mobileContainer.appendChild(headingButtons);
  } else {
    desktopContainer.appendChild(headingButtons);
  }
}

window.addEventListener("resize", moveButtons);
moveButtons();
