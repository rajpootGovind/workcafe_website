window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar-premium")
    .classList.toggle("scrolled", window.scrollY > 20);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-premium .nav-link");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ================================================= */
/* INTERSECTION OBSERVER — SCROLL ANIMATIONS */
/* ================================================= */

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  /* Scroll fade-in elements */
  const scrollElements = document.querySelectorAll(
    ".timeline-content, .feature-card, .membership-card, .gallery-item, .about-list li"
  );

  scrollElements.forEach((el, index) => {
    el.classList.add("scroll-fade-in");
    el.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(el);
  });

  /* Timeline stagger */
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    const content = item.querySelector(".timeline-content");
    if (content) {
      content.style.transitionDelay = `${index * 0.12}s`;
    }
  });
});

/* ================================================= */
/* SMOOTH SCROLL */
/* ================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ================================================= */
/* HERO PARALLAX & FADE */
/* ================================================= */

window.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  const scrollY = window.scrollY;
  const heroVideo = heroSection.querySelector(".hero-video");
  const heroContent = heroSection.querySelector(".hero-content");

  if (heroVideo) {
    heroVideo.style.transform = `translateY(${scrollY * 0.35}px)`;
  }

  if (heroContent) {
    heroContent.style.opacity = Math.max(0.15, 1 - scrollY / 700);
  }
});

/* ================================================= */
/* MOBILE NAV CLOSE */
/* ================================================= */

document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const toggle = document.querySelector(".navbar-toggler");
    const collapse = document.querySelector(".navbar-collapse");
    if (collapse && collapse.classList.contains("show")) {
      toggle.click();
    }
  });
});

/* ================================================= */
/* FEATURE CARD HOVER FEEL */
/* ================================================= */

document.querySelectorAll(".feature-card, .timeline-dot").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
  });
});

/* ================================================= */
/* VISION SECTION FLOAT CONTROL */
/* ================================================= */

const visionSection = document.querySelector(".vision-section");
if (visionSection) {
  window.addEventListener("scroll", () => {
    const rect = visionSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    document.querySelectorAll(".vision-card").forEach((card) => {
      card.style.animationPlayState = inView ? "running" : "paused";
    });
  });
}

/* ================================================= */
/* VIDEO SLIDER (LEMERIAN STYLE) */
/* ================================================= */

(function initVideoSlider() {
  const slides = document.querySelectorAll(".video-slide");
  const dots = document.querySelectorAll(".video-indicators .dot");
  if (!slides.length || !dots.length) return;

  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");

    index = (index + 1) % slides.length;

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }, 6000);
})();

/* ================================================= */
/* EXPERIENCE IMAGE SHUFFLE */
/* ================================================= */

document.querySelectorAll(".experience-shuffle-card").forEach((card) => {
  const images = card.querySelectorAll(".shuffle-images img");
  if (!images.length) return;

  let imgIndex = 0;

  setInterval(() => {
    images[imgIndex].classList.remove("active");
    imgIndex = (imgIndex + 1) % images.length;
    images[imgIndex].classList.add("active");
  }, 4200);
});

/* ================================================= */
/* VOICES OF OUR GUESTS — PREMIUM CAROUSEL */
/* ================================================= */

(function initVoicesCarousel() {
  const slides = document.querySelectorAll(".voice-slide");
  const frame = document.querySelector(".voices-carousel-frame");

  if (!slides.length || !frame) return;

  let currentIndex = 0;
  let autoInterval = null;
  const AUTO_DELAY = 3000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function startAuto() {
    stopAuto();
    autoInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, AUTO_DELAY);
  }

  function stopAuto() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  // 🔥 EVENT DELEGATION (THIS FIXES EVERYTHING)
  frame.addEventListener("click", (e) => {
    const prev = e.target.closest(".voice-nav.prev");
    const next = e.target.closest(".voice-nav.next");

    if (next) {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
      startAuto();
    }

    if (prev) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
      startAuto();
    }
  });

  frame.addEventListener("mouseenter", stopAuto);
  frame.addEventListener("mouseleave", startAuto);

  // INIT
  showSlide(currentIndex);
  startAuto();
})();
