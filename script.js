
document.addEventListener("DOMContentLoaded", function () {
    // ✅ 2. DOM references
    const brandGrid = document.querySelector(".brand-grid");
    const productGallery = document.getElementById("product-gallery");
    const productGrid = document.getElementById("product-grid");
    const dupePanel = document.getElementById("dupe-panel");
    const originalImg = document.getElementById("original-img");
    const dupeImgs = document.getElementById("dupe-imgs");
  
    // ✅ 3. Load brand and render product cards
    function loadBrand(brandId) {
      const brand = data[brandId];
      if (!brand) {
        alert("Brand not found.");
        return;
      }
  
      productGallery.classList.remove("hidden");
      brandGrid.classList.add("hidden");
      productGrid.innerHTML = "";
  
      brand.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.original}" alt="${product.name}" />
          <p>${product.name}</p>
        `;
        card.onclick = () => showDupe(product);
        productGrid.appendChild(card);
      });
    }
  
    // ✅ 4. Show dupes in a modal
    function showDupe(product) {
      originalImg.src = product.original;
      dupeImgs.innerHTML = "";
  
      product.dupes.forEach(dupeUrl => {
        const img = document.createElement("img");
        img.src = dupeUrl;
        img.alt = "Dupe";
        dupeImgs.appendChild(img);
      });
  
      dupePanel.classList.remove("hidden");
    }
  
    // ✅ 5. Hide dupe panel
    function hideDupe() {
      dupePanel.classList.add("hidden");
    }
  
    // ✅ 6. Go back to brand selection
    function goBackToBrands() {
      productGallery.classList.add("hidden");
      brandGrid.classList.remove("hidden");
    }
  

    // ✅ 7. Make functions available to onclick=""
    window.loadBrand = loadBrand;
    window.hideDupe = hideDupe;
    window.goBackToBrands = goBackToBrands;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("product-sidebar");
    const display = document.getElementById("dupe-display");
  
    if (!sidebar || !display) return; // We're not on brand.html
  
    const urlParams = new URLSearchParams(window.location.search);
    const brandId = urlParams.get("brand");
  
    if (!brandId || !data[brandId]) {
      display.innerHTML = "<p>Brand not found.</p>";
      return;
    }
  
    const brand = data[brandId];

    // Inject the Brand Name into the Header of Brand.html page
    const brandTitle = document.getElementById("brand-title");
    if (brandTitle && data[brandId]) {
      brandTitle.textContent = data[brandId].name;
    }
  
    // Populate sidebar with products
    brand.products.forEach(product => {
      const btn = document.createElement("button");
      btn.className = "product-button";
      btn.innerHTML = `
        <img src="${product.original}" alt="${product.name}" />
        <span>${product.name}</span>
        `;
      btn.onclick = () => {
        display.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.original}" alt="Original" />
          <div class="dupe-list">
            ${product.dupes.map(src => `<img src="${src}" alt="Dupe" />`).join("")}
          </div>
        `;
      };
      sidebar.appendChild(btn);
    });
  });

  function goHome() {
    window.location.href = "index.html";
  }
  