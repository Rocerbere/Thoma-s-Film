(() => {
  const KEY_THEME = "tf_theme";
  const LEGACY_DEVICE_KEY = "tf_device";

  // Desktop-only: purge ancien mode "device/mobile" s'il traîne
  try { localStorage.removeItem(LEGACY_DEVICE_KEY); } catch {}
  document.documentElement.removeAttribute("data-device");

  // Logos: si un fichier manque, on active un fallback CSS
  const logoDark = document.querySelector(".logo-layer .logo-dark");
  const logoLight = document.querySelector(".logo-layer .logo-light");

  logoDark?.addEventListener("error", () => {
    document.documentElement.classList.add("no-logo-dark");
  });

  logoLight?.addEventListener("error", () => {
    document.documentElement.classList.add("no-logo-light");
  });

  function applyTheme() {
    const theme = localStorage.getItem(KEY_THEME) || "dark";
    document.documentElement.setAttribute("data-theme", theme);

    const themeToggle = document.querySelector('[data-toggle="theme"]');
    if (themeToggle) {
      const on = theme === "light";
      themeToggle.setAttribute("data-on", on ? "true" : "false");
      themeToggle.setAttribute("aria-pressed", on ? "true" : "false");
      const label = themeToggle.querySelector(".label");
      if (label) label.textContent = on ? "Blanc" : "Noir";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    localStorage.setItem(KEY_THEME, current === "dark" ? "light" : "dark");
    applyTheme();
  }

  // init
  applyTheme();

  // toggle theme
  const themeBtn = document.querySelector('[data-toggle="theme"]');
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // year
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // mailto devis
  const form = document.querySelector("form[data-mailto]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const to = form.getAttribute("data-mailto") || "";

      const lastname = form.querySelector("[name=lastname]")?.value?.trim() || "";
      const firstname = form.querySelector("[name=firstname]")?.value?.trim() || "";
      const email = form.querySelector("[name=email]")?.value?.trim() || "";
      const phone = form.querySelector("[name=phone]")?.value?.trim() || "";
      const service = form.querySelector("[name=service]")?.value?.trim() || "";
      const deadline = form.querySelector("[name=deadline]")?.value?.trim() || "";
      const budget = form.querySelector("[name=budget]")?.value?.trim() || "";
      const message = form.querySelector("[name=message]")?.value?.trim() || "";

      const subject = encodeURIComponent(`Devis — ${service || "Projet"} — ${firstname} ${lastname}`.trim());
      const body = encodeURIComponent(
        `Nom: ${lastname}\nPrénom: ${firstname}\nEmail: ${email}\nTéléphone: ${phone}\n\nService: ${service}\nDeadline: ${deadline}\nBudget: ${budget}\n\nMessage:\n${message}\n`
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
