let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let autoPlayInterval = null;

function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === slideIndex);
  });
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function currentSlide(index) {
  slideIndex = index;
  showSlide(slideIndex);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 3000); // 3s
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Event Listeners
document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  stopAutoPlay();
});

document.querySelector(".prev").addEventListener("click", () => {
  prevSlide();
  stopAutoPlay();
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    currentSlide(Number(dot.dataset.index));
    stopAutoPlay();
  });
});

// Initialize
showSlide(slideIndex);
startAutoPlay();
