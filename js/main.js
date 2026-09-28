// ============================================
// Work page: image grid + lightbox
//
// TO ADD REAL WORK: replace the placeholder entries below with objects like
//   { src: "work-images/poster-01.jpg", title: "Fall Formal Poster" }
// Put the actual image files in the work-images/ folder. The grid keeps
// each image's own aspect ratio automatically -- no need to crop to a
// fixed shape first.
// ============================================

const WORK_ITEMS = [
  { src: null, title: "Add your first piece here" },
  { src: null, title: "Add your second piece here" },
  { src: null, title: "Add your third piece here" },
  { src: null, title: "Add your fourth piece here" },
  { src: null, title: "Add your fifth piece here" },
  { src: null, title: "Add your sixth piece here" },
  { src: null, title: "Add your seventh piece here" },
  { src: null, title: "Add your eighth piece here" },
];

function renderWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;

  WORK_ITEMS.forEach((item, i) => {
    const cell = document.createElement("div");
    cell.className = "work-item";

    if (item.src) {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title || "";
      img.loading = "lazy";
      cell.appendChild(img);
      cell.addEventListener("click", () => openLightbox(item.src, item.title));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "work-placeholder";
      placeholder.textContent = item.title;
      cell.appendChild(placeholder);
    }

    grid.appendChild(cell);
  });
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  img.alt = alt || "";
  lightbox.classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorkGrid();

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
