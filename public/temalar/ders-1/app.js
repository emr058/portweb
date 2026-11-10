const dayButtons = [...document.querySelectorAll("[data-day]")];
const lessons = [...document.querySelectorAll(".lesson[data-weekday]")];
const status = document.querySelector(".filter-status");

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedDay = button.dataset.day;
    dayButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    let visible = 0;
    lessons.forEach((lesson) => {
      const show = selectedDay === "all" || lesson.dataset.weekday === selectedDay;
      lesson.hidden = !show;
      if (show) visible += 1;
    });
    status.textContent = selectedDay === "all"
      ? "Tüm örnek dersler görünür."
      : `${button.textContent} günü için ${visible} örnek ders görünür.`;
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  document.documentElement.classList.add("js");
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}
