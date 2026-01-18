(() => {
  const KEY_THEME = "tf_theme";   // "dark" | "light"
  const KEY_DEVICE = "tf_device"; // "desktop" | "mobile"

  function applySettings() {
    const theme = localStorage.getItem(KEY_THEME) || "dark";
    const device = localStorage.getItem(KEY_DEVICE) || "desktop";

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-device", device);

    const themeToggle = document.querySelector('[data-toggle="theme"]');
    const deviceToggle = document.querySelector('[data-toggle="device"]');

    if (themeToggle) themeToggle.setAttribute("data-on", theme === "light" ? "true" : "false");
    if (deviceToggle) deviceToggle.setAttribute("data-on", device === "mobile" ? "true" : "false");
  }

  function toggleTheme(){
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    localStorage.setItem(KEY_THEME, current === "dark" ? "light" : "dark");
    applySettings();
  }

  function toggleDevice(){
    const current = document.documentElement.getAttribute("data-device") || "desktop";
    localStorage.setItem(KEY_DEVICE, current === "desktop" ? "mobile" : "desktop");
    applySettings();
  }

  // init
  applySettings();

  // events
  const themeBtn = document.querySelector('[data-toggle="theme"]');
  if(themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const deviceBtn = document.querySelector('[data-toggle="device"]');
  if(deviceBtn) deviceBtn.addEventListener("click", toggleDevice);

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
