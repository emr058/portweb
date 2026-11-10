const panel = document.querySelector("[data-filter]");

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

if (panel) {
  const neighborhood = panel.querySelector('[name="neighborhood"]');
  const kind = panel.querySelector('[name="kind"]');
  const status = panel.querySelector("[data-status]");
  const listings = [...document.querySelectorAll("[data-listings] .listing")];
  const mapMarkers = [...document.querySelectorAll("[data-map-neighborhood]")];
  const empty = document.querySelector("[data-empty]");

  function applyFilters() {
    let visibleCount = 0;
    for (const listing of listings) {
      const matches = (neighborhood.value === "all" || listing.dataset.neighborhood === neighborhood.value)
        && (kind.value === "all" || listing.dataset.kind === kind.value);
      listing.hidden = !matches;
      if (matches) visibleCount += 1;
    }
    for (const marker of mapMarkers) {
      marker.hidden = neighborhood.value !== "all" && marker.dataset.mapNeighborhood !== neighborhood.value;
    }
    empty.hidden = visibleCount !== 0;
    status.textContent = visibleCount === 0
      ? "Bu seçimde örnek ilan yok. Başka bir mahalle veya ilan türü seçin."
      : `${visibleCount} örnek ilan gösteriliyor.`;
  }

  neighborhood.addEventListener("change", applyFilters);
  kind.addEventListener("change", applyFilters);
  status.textContent = `${listings.length} örnek ilan gösteriliyor.`;
}
