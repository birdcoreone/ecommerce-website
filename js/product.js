document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
  };
  updateCartCount();

  fetch("./data.json")
    .then((res) => res.json())
    .then((products) => {
      const product = products.find(p => p.slug === slug);
      if (!product) {
        document.getElementById("product-detail").innerHTML = "<p>Product not found</p>";
        return;
      }

      document.getElementById("product-detail").innerHTML = `
        <div class="product-hero dark-bg">
          <img src="${product.image.desktop}" alt="${product.name}">
          <div class="product-info">
            ${product.new ? `<p class="new-product">New Product</p>` : ""}
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>$${product.price}</h3>
            <div class="add-cart-controls">
              <input type="number" min="1" value="1" id="qty">
              <button class="btn-orange" onclick="addToCart('${product.slug}', ${product.price})">Add to Cart</button>
            </div>
          </div>
        </div>

        <div class="features">
          <h3>Features</h3>
          <p>${product.features.replace(/\n/g, "<br>")}</p>
        </div>
      `;
    });
});

function addToCart(slug, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const qty = parseInt(document.getElementById("qty").value, 10);
  const item = cart.find(i => i.slug === slug);

  if (item) {
    item.quantity += qty;
  } else {
    cart.push({ slug, price, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Product added to cart!");
  window.location.reload();
}
