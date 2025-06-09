document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const form = document.getElementById("checkout-form");
  const summary = document.getElementById("order-summary");

  const updateCartCount = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
  };

  updateCartCount();

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    form.style.display = "none";
    return;
  }

  fetch("./audio_file/data.json")
    .then((res) => res.json())
    .then((products) => {
      let subtotal = 0;
      let summaryHTML = "<h3>Order Summary:</h3><ul>";

      cart.forEach((item) => {
        const product = products.find((p) => p.slug === item.slug);
        const total = item.quantity * product.price;
        subtotal += total;
        summaryHTML += `<li>${product.name} x${item.quantity} - $${total}</li>`;
      });

      const shipping = 50;
      const vat = subtotal * 0.2;
      const finalTotal = subtotal + shipping + vat;

      summaryHTML += `</ul>
        <p>Subtotal: $${subtotal}</p>
        <p>Shipping: $${shipping}</p>
        <p>VAT (20%): $${vat.toFixed(2)}</p>
        <h3>Total: $${finalTotal.toFixed(2)}</h3>
      `;
      summary.innerHTML = summaryHTML;
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valid = form.checkValidity();
    if (!valid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    localStorage.removeItem("cart");
    document.getElementById("confirmation-modal").style.display = "flex";
  });
});

function closeModal() {
  window.location.href = "index.html";
}
