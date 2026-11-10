const form = document.querySelector("#request-form");
const draft = document.querySelector("#draft");
const draftText = document.querySelector("#draft-text");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const values = new FormData(form);
  draftText.value = [
    "İlk görüşme talebi",
    `Çalışma alanı: ${values.get("area")}`,
    `Konu başlığı: ${values.get("subject")}`,
    `Ad soyad: ${values.get("name")}`,
    `İletişim bilgisi: ${values.get("contact")}`,
    "",
    "Uygun olduğunuzda görüşme için izlenecek adımlar hakkında bilgi rica ederim."
  ].join("\n");
  draft.hidden = false;
  draft.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  draftText.focus();
});

if ("IntersectionObserver" in window) {
  const parts = document.querySelectorAll(".section-heading, .area-sheet, .approach-sheet, .form-panel, .site-footer > *");
  parts.forEach((part) => part.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  parts.forEach((part) => observer.observe(part));
}
