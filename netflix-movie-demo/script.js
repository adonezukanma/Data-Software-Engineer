// Netflix Movie Demo — UI logic (pure client-side, no backend required)

function moviesByCategory(category) {
  return MOVIES.filter((m) => m.category === category);
}

function buildCard(movie) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = movie.id;
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
    <div class="card-info">
      <div class="card-title">${movie.title}</div>
      <div class="card-meta">
        <span class="rating-badge">${movie.rating}★</span>
        <span>${movie.year}</span>
        <span>${movie.maturity}</span>
      </div>
    </div>
  `;
  card.addEventListener("click", () => openModal(movie));
  return card;
}

function renderRows() {
  const rowsEl = document.getElementById("rows");
  rowsEl.innerHTML = "";
  CATEGORIES.forEach((category) => {
    const items = moviesByCategory(category);
    if (!items.length) return;

    const row = document.createElement("section");
    row.className = "row";

    const title = document.createElement("h2");
    title.className = "row-title";
    title.textContent = category;

    const track = document.createElement("div");
    track.className = "row-track";
    items.forEach((m) => track.appendChild(buildCard(m)));

    row.appendChild(title);
    row.appendChild(track);
    rowsEl.appendChild(row);
  });
}

function renderHero() {
  const hero = document.getElementById("hero");
  const featured = MOVIES[0];
  hero.style.backgroundImage = `url(${featured.backdrop})`;
  document.getElementById("hero-title").textContent = featured.title;
  document.getElementById("hero-description").textContent = featured.description;

  const openFeatured = () => openModal(featured);
  document.getElementById("hero-play").addEventListener("click", openFeatured);
  document.getElementById("hero-info").addEventListener("click", openFeatured);
}

function openModal(movie) {
  document.getElementById("modal-backdrop-img").style.backgroundImage = `url(${movie.backdrop})`;
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-rating").textContent = `${movie.rating}★`;
  document.getElementById("modal-year").textContent = movie.year;
  document.getElementById("modal-duration").textContent = movie.duration;
  document.getElementById("modal-maturity").textContent = movie.maturity;
  document.getElementById("modal-description").textContent = movie.description;
  document.getElementById("modal-genre").textContent = movie.genre;
  document.getElementById("modal-backdrop").classList.add("open");
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("open");
}

function setupModal() {
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function setupSearch() {
  const input = document.getElementById("search-input");
  const resultsSection = document.getElementById("search-results");
  const track = document.getElementById("search-track");
  const noResults = document.getElementById("no-results");
  const rowsEl = document.getElementById("rows");
  const hero = document.getElementById("hero");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();

    if (!q) {
      resultsSection.classList.add("hidden");
      rowsEl.style.display = "";
      hero.style.display = "";
      return;
    }

    rowsEl.style.display = "none";
    hero.style.display = "none";
    resultsSection.classList.remove("hidden");

    const matches = MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );

    track.innerHTML = "";
    matches.forEach((m) => track.appendChild(buildCard(m)));
    noResults.classList.toggle("hidden", matches.length > 0);
  });
}

function setupNavScroll() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderRows();
  setupModal();
  setupSearch();
  setupNavScroll();
});
