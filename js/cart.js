document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById('cart-count');
    if (counter) counter.textContent = count;
  };

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    summary.innerHTML = "";
    updateCartCount();
    return;
  }

  fetch("./data.json") 
    .then((res) => res.json())
    .then((products) => {
      let total = 0;
      cartContainer.innerHTML = "";

      cart.forEach((item) => {
        const product = products.find((p) => p.slug === item.slug);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
          <img src="${product.image.mobile}" alt="${product.name}">
          <div class="cart-info">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
            <div class="cart-controls">
              <button onclick="updateQuantity('${item.slug}', -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity('${item.slug}', 1)">+</button>
              <button class="remove" onclick="removeItem('${item.slug}')">x</button>
            </div>
          </div>
        `;
        cartContainer.appendChild(row);
      });

      summary.innerHTML = `
        <h3>Total: $${total}</h3>
        <a href="checkout.html" class="btn-orange">Proceed to Checkout</a>
      `;

      updateCartCount();
    });
});

function updateQuantity(slug, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((i) => i.slug === slug);

  if (!item) return;
  item.quantity += change;

  if (item.quantity < 1) {
    cart = cart.filter((i) => i.slug !== slug);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(slug) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((i) => i.slug !== slug);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
