/* HealthV.ai Landing Page — Interactions & Animations */
(function () {
  "use strict";

  /* --- Header scroll state --- */
  const header = document.getElementById("header");

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Mobile nav toggle --- */
  function initNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Active nav highlighting on scroll --- */
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    function updateActive() {
      const scrollY = window.scrollY + 100;
      let currentId = "";

      sections.forEach(function (section) {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          currentId = section.id;
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentId) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  /* --- Hero staggered fade-in --- */
  function initHeroAnimations() {
    const heroElements = document.querySelectorAll(".hero .fade-in");
    heroElements.forEach(function (el) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.classList.add("visible");
        });
      });
    });
  }

  /* --- Hero Tiles (static — no flipping) --- */
  function initHeroTiles() {
    // Tiles are now static, no animation needed
  }

  /* --- Scroll reveal (IntersectionObserver) --- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Flow Diagram V2 Animation --- */
  function initFlowDiagram() {
    const diagram = document.getElementById("flow-diagram");
    if (!diagram) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            diagram.classList.add("animated");

            // Stagger flow sources
            var sources = diagram.querySelectorAll(".flow-v2__source");
            sources.forEach(function (src, i) {
              src.style.transitionDelay = (i * 0.1) + "s";
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(diagram);
  }

  /* --- Phone Chat Auto-play --- */
  function initPhoneChat() {
    const chatContainer = document.getElementById("patient-chat");
    if (!chatContainer) return;

    let chatStarted = false;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !chatStarted) {
            chatStarted = true;
            const messages = chatContainer.querySelectorAll(".phone-msg");
            messages.forEach(function (msg) {
              const delay = parseInt(msg.getAttribute("data-delay"), 10) || 0;
              setTimeout(function () {
                msg.classList.add("visible");
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chatContainer);
  }

  /* --- Form handling --- */
  var API_BASE = "https://healthv.ai";
  var WAITLIST_URL = API_BASE + "/api/waitlist";
  var PROVIDER_URL = API_BASE + "/api/provider";

  function submitToAPI(url, data, formEl, successEl) {
    var btn = formEl.querySelector('button[type="submit"]');
    var origText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (res.ok) {
          formEl.style.display = "none";
          successEl.classList.add("show");
        } else {
          btn.textContent = "Try Again";
          btn.disabled = false;
        }
      })
      .catch(function () {
        btn.textContent = "Try Again";
        btn.disabled = false;
      });
  }

  function initForms() {
    // Hero waitlist form
    var heroForm = document.getElementById("hero-form");
    var heroSuccess = document.getElementById("hero-success");
    if (heroForm && heroSuccess) {
      heroForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = heroForm.querySelector('input[type="email"]').value;
        submitToAPI(WAITLIST_URL, { email: email, source: "hero" }, heroForm, heroSuccess);
      });
    }

    // Patient waitlist form
    var patientForm = document.getElementById("patient-form");
    var patientSuccess = document.getElementById("patient-form-success");
    if (patientForm && patientSuccess) {
      patientForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = patientForm.querySelector('input[type="email"]').value;
        submitToAPI(WAITLIST_URL, { email: email, source: "contact-patient" }, patientForm, patientSuccess);
      });
    }

    // Provider form
    var providerForm = document.getElementById("provider-form");
    var providerSuccess = document.getElementById("provider-form-success");
    if (providerForm && providerSuccess) {
      providerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var inputs = providerForm.querySelectorAll(".contact-form__input");
        submitToAPI(PROVIDER_URL, {
          name: inputs[0].value,
          email: inputs[1].value,
          practice: inputs[2].value,
          message: inputs[3].value,
        }, providerForm, providerSuccess);
      });
    }
  }

  /* --- Smooth scroll for anchor links --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* --- Counter animation --- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-count"), 10);
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(function () {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current.toLocaleString();
            }, 30);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Init --- */
  function init() {
    initNav();
    initActiveNav();
    initHeroAnimations();
    initHeroTiles();
    initScrollReveal();
    initFlowDiagram();
    initPhoneChat();
    initForms();
    initSmoothScroll();
    initCounters();
    initScrollTop();
  }

  /* --- Scroll to Top Button --- */
  function initScrollTop() {
    var btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
