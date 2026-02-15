(() => {
  const KEY_THEME = "tf_theme"; // "dark" | "light"

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY_THEME, theme);

    const themeToggle = document.querySelector('[data-toggle="theme"]');
    if (themeToggle) {
      themeToggle.setAttribute("data-on", theme === "light" ? "true" : "false");
      const label = themeToggle.querySelector(".label");
      if (label) label.textContent = theme === "light" ? "Noir" : "Blanc";
    }
  }

  function initTheme() {
    // Nettoyage : ancien "device mode" (si présent)
    try { localStorage.removeItem("tf_device"); } catch (e) {}
    document.documentElement.removeAttribute("data-device");

    const saved = localStorage.getItem(KEY_THEME);
    setTheme(saved === "light" ? "light" : "dark");
  }

  function bindThemeToggle() {
    const btn = document.querySelector('[data-toggle="theme"]');
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  function fillYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function bindMailtoForms() {
    document.querySelectorAll("form[data-mailto]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const to = form.getAttribute("data-mailto") || "";
        const v = (name) => form.querySelector(`[name="${name}"]`)?.value?.trim() || "";

        const lastname = v("lastname");
        const firstname = v("firstname");
        const email = v("email");
        const phone = v("phone");
        const service = v("service");
        const deadline = v("deadline");
        const budget = v("budget");
        const message = v("message");

        const subject = encodeURIComponent(`Devis — ${service || "Projet"} — ${firstname} ${lastname}`.trim());
        const body = encodeURIComponent(
          `Nom: ${lastname}\nPrénom: ${firstname}\nEmail: ${email}\nTéléphone: ${phone}\n\nService: ${service}\nDeadline: ${deadline}\nBudget: ${budget}\n\nMessage:\n${message}\n`
        );

        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    });
  }

  initTheme();
  bindThemeToggle();
  fillYear();
  bindMailtoForms();
})();
