// ============================================
// Work page: image grid + lightbox
//
// Work items now live in data/work.json instead of being hard-coded here.
// Add, remove, reorder, and describe pieces through the editor at /admin
// (Decap CMS) -- it writes straight to data/work.json and uploads images
// into work-images/. No code editing needed for day-to-day updates.
// ============================================

async function loadWorkItems() {
  try {
    const res = await fetch("data/work.json", { cache: "no-store" });
    if (!res.ok) throw new Error("work.json not found");
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (err) {
    console.warn("Could not load data/work.json:", err);
    return [];
  }
}

async function renderWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;

  const items = await loadWorkItems();

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "work-empty";
    empty.innerHTML = 'No work added yet. Add pieces at <a href="/admin/">/admin</a>.';
    grid.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const cell = document.createElement("div");
    cell.className = "work-item";

    const src = item.image || item.src;
    const img = document.createElement("img");
    img.src = src;
    img.alt = item.title || "";
    img.loading = "lazy";
    cell.appendChild(img);
    cell.addEventListener("click", () => openLightbox(src, item.title, item.description));

    grid.appendChild(cell);
  });
}

function openLightbox(src, title, description) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  img.src = src;
  img.alt = title || "";

  if (caption) {
    caption.innerHTML = "";
    if (title) {
      const h = document.createElement("div");
      h.className = "lightbox-title";
      h.textContent = title;
      caption.appendChild(h);
    }
    if (description) {
      const p = document.createElement("div");
      p.className = "lightbox-description";
      p.textContent = description;
      caption.appendChild(p);
    }
  }

  lightbox.classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

// ============================================
// 3-dot menu (all pages)
// ============================================

function setupMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;
  const toggle = menu.querySelector(".menu-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menu.classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorkGrid();
  setupMenu();

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
