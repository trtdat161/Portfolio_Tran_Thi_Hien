/* =============================================
   script.js — Portfolio Hien Tran Thi
   ============================================= */
document.querySelector(".year").textContent = new Date().getFullYear();
(function () {
  "use strict";

  // ─── Navbar: scroll effect ───────────────────
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load

  // ─── Mobile menu toggle ──────────────────────
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ─── Scroll Reveal ───────────────────────────
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ─── Smooth active nav link highlight ────────
  const sections = document.querySelectorAll("section[id]");
  const allNavLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          allNavLinks.forEach(function (a) {
            a.classList.toggle(
              "active-link",
              a.getAttribute("href") === "#" + id,
            );
          });
        }
      });
    },
    { threshold: 0.35 },
  );

  sections.forEach(function (s) {
    sectionObserver.observe(s);
  });

  // ─── Staggered reveal for grids ──────────────
  // Adds delay to sibling .reveal elements inside grids
  const grids = document.querySelectorAll(
    ".exp-grid, .skills-grid, .products-grid",
  );

  grids.forEach(function (grid) {
    const children = grid.querySelectorAll(".reveal");
    children.forEach(function (child, i) {
      child.style.transitionDelay = i * 0.1 + "s";
    });
  });
})();
