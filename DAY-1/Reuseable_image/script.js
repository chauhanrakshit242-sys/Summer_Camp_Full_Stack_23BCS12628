const slides = document.querySelectorAll(".slide");
const carousel = document.getElementById("carousel");

let index = 0;
let interval;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// Auto-slide
function startAutoSlide() {
  interval = setInterval(nextSlide, 2000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

// Pause on hover
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Init
startAutoSlide();
