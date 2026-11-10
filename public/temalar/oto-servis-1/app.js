const form = document.querySelector("[data-request]");
const result = document.querySelector("[data-result]");
const messageField = document.querySelector("[data-message]");
const status = document.querySelector("[data-status]");
const shareButton = document.querySelector("[data-share]");

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  document.documentElement.classList.add("js");
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }
}

if (form && result && messageField && shareButton) {
  const dayField = form.elements.namedItem("preferred-day");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const date = new Date(`${data.get("preferred-day")}T12:00:00`);
    const formattedDate = new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    messageField.value = [
      "Servis talebi",
      `Araç: ${data.get("vehicle")}`,
      `Konu: ${data.get("symptom")}`,
      `Belirti: ${data.get("detail")}`,
      `Tercih edilen gün: ${formattedDate}`,
      "Uygunluk için benimle iletişime geçebilirsiniz.",
    ].join("\n");
    result.hidden = false;
    status.textContent = "Mesaj hazır. Paylaş menüsünden WhatsApp veya e-postayı seçebilirsiniz.";
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  });

  shareButton.addEventListener("click", async () => {
    const text = messageField.value;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Servis talebi", text });
        status.textContent = "Paylaşım menüsü kapandı.";
      } catch (error) {
        if (error.name !== "AbortError") status.textContent = "Paylaşım açılamadı. Mesajı seçip kopyalayın.";
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Mesaj kopyalandı. WhatsApp veya e-posta taslağına yapıştırabilirsiniz.";
    } catch {
      messageField.focus();
      messageField.select();
      status.textContent = "Mesaj seçildi. Kopyalayıp WhatsApp veya e-posta taslağına yapıştırın.";
    }
  });
}
