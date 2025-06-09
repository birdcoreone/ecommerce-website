document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  document.getElementById("category-title").querySelector("h2").textContent = category.charAt(0).toUpperCase() + category.slice(1);

  fetch('./data.json') 
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(product => product.category === category);
      const list = document.getElementById("product-list");

      if (filtered.length === 0) {
        list.innerHTML = "<p>No products found in this category.</p>";
        return;
      }

      filtered.forEach(product => {
        const section = document.createElement("section");
        section.className = "product-card";
        section.innerHTML = `
          <img src="${product.image.desktop}" alt="${product.name}" />
          ${product.new ? "<p style='color:#D87D4A'>New Product</p>" : ""}
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <a class="btn-orange" href="product.html?slug=${product.slug}">See Product</a>
        `;
        list.appendChild(section);
      });
    });
});

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById('cart-count');
  if (counter) counter.textContent = count;
};
updateCartCount();

const bannerImages = {
  headphones: './assets/category-headphones/desktop/image-category-header.jpg',
  speakers: './assets/category-speakers/desktop/image-category-header.jpg',
  earphones: './assets/category-earphones/desktop/image-category-header.jpg'
};

document.getElementById('banner-title').textContent = category.charAt(0).toUpperCase() + category.slice(1);
document.getElementById('banner-image').src = bannerImages[category];
