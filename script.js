// Decleare variables
let slideIndex = 1;
let prevSlideIndex = 1;
let intervalId;
let sideMenuOpen = false;
let headercontainer = document.querySelector(".header-container");
const burger_top = document.querySelector(".burger-top");
const burger_middle = document.querySelector(".burger-middle");
const burger_bottom = document.querySelector(".burger-bottom");
var prevScrollpos = window.scrollY || window.pageYOffset;

// Add event listeners

document.querySelector('.minus').addEventListener('click', () => {
  decreaseSlideIndex();
  clearIntervalId();
  showSlide();
}); 

document.querySelector('.plus').addEventListener('click', () => {
  increaseSlideIndex();
  clearIntervalId();
  showSlide();
}); 

// Functions

function showSlide() {
  const slide = document.querySelectorAll('.slider-slide')[slideIndex - 1];
  const prevSlide = document.querySelectorAll('.slider-slide')[prevSlideIndex - 1];
  slide.classList.toggle("hidden");
  slide.classList.toggle("shown");
  prevSlide.classList.toggle("hidden");
  prevSlide.classList.toggle("shown");

  const currentBullet = document.querySelectorAll('.bullet')[slideIndex - 1];
  const prevBullet = document.querySelectorAll('.bullet')[prevSlideIndex - 1];

  currentBullet.classList.toggle("active");
  prevBullet.classList.toggle("active");
  currentBullet.classList.toggle("inactive");
  prevBullet.classList.toggle("inactive");
}

function decreaseSlideIndex(){
  prevSlideIndex = slideIndex;
  if (slideIndex === 1) {
    slideIndex = 3;
  } else { 
    slideIndex = slideIndex - 1;
  }
}

function increaseSlideIndex(){
  prevSlideIndex = slideIndex;
  if (slideIndex === 3) {
    slideIndex = 1;
  } else { 
    slideIndex = slideIndex + 1;
  }
}

function clearIntervalId() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    increaseSlideIndex();
    showSlide();
  }, 3000);
}

// Event listeners

document.getElementById("burgerClick").addEventListener("click", () => {

  const modal = document.getElementById("modal");
  document.getElementsByTagName("header")

  sideMenuOpen = !sideMenuOpen;

  
  document.querySelector("body").style.overflow = sideMenuOpen ? "hidden" : "visible";

  if (sideMenuOpen) {
    const blur_effect = document.createElement("div");
    blur_effect.className = "blur-effect";
    document.body.appendChild(blur_effect);
  } else {
    document.querySelector(".blur-effect").remove();
  }

  burger_top.classList.toggle("burger-active-top");
  burger_middle.classList.toggle("burger-active-middle");
  burger_bottom.classList.toggle("burger-active-bottom");
  modal.classList.toggle("sidemenu-active");
});

document.addEventListener("DOMContentLoaded", function () {
  var questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    var arrow = question.querySelector(".arrow");
    question.addEventListener("click", function () {
      var answer = question.querySelector(".answer");
      var isOpen = answer.classList.contains("show");

      questions.forEach(function (q) {
        q.querySelector(".answer").classList.remove("show");
        q.querySelector(".arrow").style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        answer.classList.add("show");
        arrow.style.transform = "rotate(180deg)";
      } else {
        answer.classList.remove("show");
        arrow.style.transform = "rotate(0deg)";
      }
    });
  });
});

clearIntervalId();

// Close side menu when clicking outside of it on mobile

document.onclick = function (e) {
  if (!headercontainer.contains(e.target)) {
    modal.classList.remove("sidemenu-active");
    document.querySelector("body").style.overflow = "visible";
    sideMenuOpen = false;
    document.querySelector(".blur-effect").remove();
    burger_top.classList.remove("burger-active-top");
    burger_middle.classList.remove("burger-active-middle");
    burger_bottom.classList.remove("burger-active-bottom");
  }
}

function handleScroll() {
  var currentScrollPos = window.scrollY || window.pageYOffset;
  
  if (prevScrollpos > currentScrollPos) {
      document.querySelector("header").style.top = "0";
  } else if (prevScrollpos < currentScrollPos && currentScrollPos - prevScrollpos > 50) {
    document.querySelector("header").style.top = "-84px"; 
  }

  prevScrollpos = currentScrollPos;
}

if (window.innerWidth < 1023) {
  window.addEventListener('scroll', handleScroll);
} else {
  document.querySelector('header').style.top = "0"; 
}

window.addEventListener('resize', function() {
  if (window.innerWidth < 1023) {
      window.addEventListener('scroll', handleScroll);
  } else {
      window.removeEventListener('scroll', handleScroll);
      document.querySelector('header').style.top = "0"; 
  }
});