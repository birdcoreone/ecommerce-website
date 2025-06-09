document.addEventListener("DOMContentLoaded", () => {
  // Load cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
  };

  updateCartCount();

  // OPTIONAL: Load featured product dynamically
  // Replace static content in hero with dynamic one from data.json
  fetch("./audio_file/data.json") // adjust if needed
    .then((res) => res.json())
    .then((products) => {
      const featured = products.find(p => p.slug === "xx99-mark-two-headphones");
      if (!featured) return;

      const hero = document.querySelector(".hero .container");
      hero.innerHTML = `
        <h4>${featured.new ? 'New Product' : ''}</h4>
        <h1>${featured.name}</h1>
        <p>${featured.description}</p>
        <a href="product.html?slug=${featured.slug}" class="btn-orange">See Product</a>
      `;
    })
    .catch((err) => {
      console.warn("Could not load featured product", err);
    });
});
