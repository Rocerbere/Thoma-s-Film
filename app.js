/* =========================
   REVEAL ANIMATION (scroll)
========================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (top < trigger) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================
   MENU BURGER (mobile)
========================= */
const burger = document.querySelector("[data-burger]");
const drawer = document.querySelector("[data-drawer]");

if (burger && drawer) {
  burger.addEventListener("click", () => {
    drawer.classList.toggle("is-open");

    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !expanded);
  });

  // fermer quand on clique sur un lien
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================
   FILTRES PORTFOLIO
========================= */
const filters = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll("[data-cat]");

if (filters.length && items.length) {
  filters.forEach(btn => {
    btn.addEventListener("click", () => {

      const value = btn.dataset.filter;

      // active button
      filters.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      // filter items
      items.forEach(item => {
        const categories = item.dataset.cat.split(" ");

        if (value === "all" || categories.includes(value)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    });
  });
}


/* =========================
   SMOOTH SCROLL PREMIUM (LENIS)
========================= */
if (typeof Lenis !== "undefined") {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}


/* =========================
   NAV ACTIVE LINK
========================= */
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("[data-nav]").forEach(link => {
  const href = link.getAttribute("href");

  if (href === currentPage || (href === "index.html" && currentPage === "")) {
    link.classList.add("is-active");
  }
});


/* =========================
   FOOTER YEAR AUTO
========================= */
const year = document.getElementById("y");
if (year) {
  year.textContent = new Date().getFullYear();
}
