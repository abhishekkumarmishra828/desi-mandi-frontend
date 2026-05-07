function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  localStorage.setItem("captchaCode", code);

  const el =
    document.getElementById("captchaText") ||
    document.querySelector("[data-captcha-text]");

  if (el) el.textContent = code;
}

document.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();

  const btn =
    document.getElementById("refreshCaptcha") ||
    document.querySelector(".captcha-refresh");

  if (btn) btn.addEventListener("click", generateCaptcha);

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      const input = form.querySelector('input[name="captcha"]');
      if (!input) return;

      const real = localStorage.getItem("captchaCode");

      if (input.value.trim().toUpperCase() !== real) {
        e.preventDefault();
        alert("Invalid captcha. Please enter correct captcha.");
        generateCaptcha();
      }
    });
  });
});
