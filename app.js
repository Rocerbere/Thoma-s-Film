(() => {
  const KEY_THEME = "tf_theme";   // "dark" | "light"
  const KEY_DEVICE = "tf_device"; // "desktop" | "mobile"

  function applySettings() {
    const theme = localStorage.getItem(KEY_THEME) || "dark";
    const device = localStorage.getItem(KEY_DEVICE) || "desktop";

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-device", device);

    // update toggle UI states if present
    const themeToggle = document.querySelector('[data-toggle="theme"]');
    const deviceToggle = document.querySelector('[data-toggle="device"]');

    if (themeToggle) themeToggle.setAttribute("data-on", theme === "light" ? "true" : "false");
    if (deviceToggle) deviceToggle.setAttribute("data-on", device === "mobile" ? "true" : "false");
  }

  function setTheme(nextTheme){
    localStorage.setItem(KEY_THEME, nextTheme);
    applySettings();
  }

  function setDevice(nextDevice){
    localStorage.setItem(KEY_DEVICE, nextDevice);
    applySettings();
  }

  // init
  applySettings();

  // toggles
  const themeToggle = document.querySelector('[data-toggle="theme"]');
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  const deviceToggle = document.querySelector('[data-toggle="device"]');
  if (deviceToggle) {
    deviceToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-device") || "desktop";
      setDevice(current === "desktop" ? "mobile" : "desktop");
    });
  }

  // year
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // Contact/Devis form -> mailto
  const form = document.querySelector("form[data-mailto]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const to = form.getAttribute("data-mailto") || "";

      const name = form.querySelector("[name=name]")?.value?.trim() || "";
      const email = form.querySelector("[name=email]")?.value?.trim() || "";
      const phone = form.querySelector("[name=phone]")?.value?.trim() || "";
      const service = form.querySelector("[name=service]")?.value?.trim() || "";
      const deadline = form.querySelector("[name=deadline]")?.value?.trim() || "";
      const budget = form.querySelector("[name=budget]")?.value?.trim() || "";
      const message = form.querySelector("[name=message]")?.value?.trim() || "";

      const subject = encodeURIComponent(`Devis — ${service || "Projet"} — ${name || "Client"}`);
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nService: ${service}\nDeadline: ${deadline}\nBudget: ${budget}\n\nMessage:\n${message}\n`
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
