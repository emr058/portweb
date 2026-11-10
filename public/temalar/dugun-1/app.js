document.documentElement.classList.add("js-motion");

const parts = document.querySelectorAll(".motion-part");
const invite = document.querySelector(".invite-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const entrance = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  parts.forEach((part, index) => {
    part.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
    entrance.observe(part);
  });
} else {
  parts.forEach((part) => part.classList.add("is-visible"));
}

if (invite && !reduceMotion) {
  invite.classList.add("is-sealed");
  requestAnimationFrame(() => requestAnimationFrame(() => invite.classList.add("is-open")));
}

const form = document.querySelector("#request-form");
const output = document.querySelector("#request-output");
const shareButton = document.querySelector("#share-request");
const status = document.querySelector("#request-status");
let requestText = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const date = new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(`${form.elements.date.value}T12:00:00`));
  requestText = `Etkinlik talebi\nTarih: ${date}\nEtkinlik: ${form.elements.kind.value}\nYaklaşık kişi: ${form.elements.guests.value}`;
  output.textContent = requestText;
  shareButton.disabled = false;
  status.textContent = "Özet hazır. Paylaş düğmesi cihazın paylaşım menüsünü açar; desteklenmiyorsa özeti kopyalayın.";
  document.querySelector("#request-card").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
});

shareButton.addEventListener("click", async () => {
  if (!requestText) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Etkinlik talebi", text: requestText });
      status.textContent = "Paylaşım menüsü açıldı.";
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(requestText);
    status.textContent = "Talep özeti kopyalandı. İşletmenin iletişim kanalına yapıştırabilirsiniz.";
  } catch {
    status.textContent = "Talep özeti yukarıda seçilebilir. Kopyalayıp işletmenin iletişim kanalına ekleyin.";
  }
});
