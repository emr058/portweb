document.documentElement.classList.add("js-motion");

const revealTargets = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const form = document.querySelector("#wholesale-form");
const output = document.querySelector("#request-message");
if (form && output) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const value = (name) => String(values.get(name) || "Belirtilmedi").trim() || "Belirtilmedi";
    output.value = [
      "Merhaba,",
      "",
      `Ürün: ${value("urun")}`,
      `Ambalaj tercihi: ${value("ambalaj")}`,
      `Yaklaşık miktar: ${value("miktar")}`,
      `Firma: ${value("firma")}`,
      `Yetkili kişi: ${value("yetkili")}`,
      `Telefon: ${value("telefon")}`,
      `E-posta: ${value("eposta")}`,
      `Teslim ili: ${value("il")}`,
      `Not: ${value("not")}`,
      "",
      "Ürün dönemi ve güncel koşullar hakkında bilgi rica ederim."
    ].join("\n");
    output.focus();
    output.select();
  });
}
