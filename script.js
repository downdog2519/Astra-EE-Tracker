document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("symbolContainer");
  let draggedItem = null;

  // DRAG & DROP
  container.addEventListener("dragstart", (e) => {
    draggedItem = e.target.closest(".symbol-item");
    e.dataTransfer.effectAllowed = "move";
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const target = e.target.closest(".symbol-item");
    if (target && target !== draggedItem) {
      const items = [...container.querySelectorAll(".symbol-item")];
      const draggedIndex = items.indexOf(draggedItem);
      const targetIndex = items.indexOf(target);

      if (draggedIndex < targetIndex) {
        container.insertBefore(draggedItem, target.nextSibling);
      } else {
        container.insertBefore(draggedItem, target);
      }

      updateSymbolNumbers();
    }
  });

  container.addEventListener("dragend", () => {
    draggedItem = null;
  });

  function updateSymbolNumbers() {
    const items = [...container.querySelectorAll(".symbol-item")];
    items.forEach((item, index) => {
      item.querySelector(".symbol-number").textContent = index + 1;
    });
  }

  // CLICK TO ZOOM
  const zoomModal = document.getElementById("zoomModal");
  const zoomImage = document.getElementById("zoomImage");

  container.addEventListener("click", (e) => {
    const img = e.target.closest(".zoomable");
    if (!img) return;

    zoomImage.src = img.src;
    zoomModal.style.display = "flex";
  });

  zoomModal.addEventListener("click", () => {
    zoomModal.style.display = "none";
  });

  // PLANET SELECTOR
  document.querySelectorAll('.planet-select').forEach(select => {
    select.addEventListener('change', function () {
      const planet = this.value;
      const display = this.nextElementSibling;

      if (planet && planetOrder[planet]) {
        display.textContent = `#${planetOrder[planet]}`;
      } else {
        display.textContent = "";
      }
    });
  });

});

