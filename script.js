
const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, category: "electronics", image: "🎧", rating: 4.5 },
  { id: 2, name: "Smart Watch", price: 2299, category: "electronics", image: "⌚", rating: 4.2 },
  { id: 3, name: "Running Shoes", price: 1799, category: "fashion", image: "👟", rating: 4.4 },
  { id: 4, name: "Cotton T-Shirt", price: 499, category: "fashion", image: "👕", rating: 4.1 },
  { id: 5, name: "Bluetooth Speaker", price: 999, category: "electronics", image: "🔊", rating: 4.3 },
  { id: 6, name: "Table Lamp", price: 799, category: "home", image: "💡", rating: 4.0 },
  { id: 7, name: "Backpack", price: 899, category: "fashion", image: "🎒", rating: 4.2 },
  { id: 8, name: "Coffee Mug Set", price: 399, category: "home", image: "☕", rating: 4.1 }
];

const cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("category");
const resultCount = document.getElementById("resultCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function renderProducts(items) {
  resultCount.textContent = `${items.length} products`;

  if (items.length === 0) {
    productGrid.innerHTML =
      '<p class="empty">No products found. Try another search.</p>';
    return;
  }

  productGrid.innerHTML = items.map(product => `
    <article class="product-card">
      <div class="product-image">${product.image}</div>
      <h3>${product.name}</h3>
      <p class="rating">★ ${product.rating} / 5</p>
      <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
      <button data-id="${product.id}">Add to Cart</button>
    </article>
  `).join("");
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter(product => {
    return product.name.toLowerCase().includes(query) &&
      (category === "all" || product.category === category);
  });

  renderProducts(filtered);
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    const product = products.find(item => item.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  cartCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartTotal.textContent = total.toLocaleString("en-IN");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-image">${item.image}</div>
      <div class="item-info">
        <strong>${item.name}</strong>
        <p>₹${item.price.toLocaleString("en-IN")}</p>
      </div>
      <div class="quantity-controls">
        <button data-action="decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button data-action="increase" data-id="${item.id}">+</button>
      </div>
      <button class="remove-button" data-action="remove"
        data-id="${item.id}">Remove</button>
    </div>
  `).join("");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");

  if (!button) return;

  addToCart(Number(button.dataset.id));
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find(product => product.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  }

  if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart.splice(cart.indexOf(item), 1);
    }
  }

  if (action === "remove") {
    cart.splice(cart.indexOf(item), 1);
  }

  renderCart();
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  filterProducts();
});

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

document.querySelectorAll(".categories a").forEach(link => {
  link.addEventListener("click", () => {
    categorySelect.value = link.dataset.category;
    filterProducts();
  });
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add a product first.");
    return;
  }

  alert("Your cart is ready! We will build checkout in the next step.");
});


async function loadProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");

    if (!response.ok) {
      throw new Error("Could not load products");
    }

    products = await response.json();

    renderProducts(products);
    renderCart();
  } catch (error) {
    productGrid.innerHTML =
      '<p class="empty">Could not load products. Please start the backend.</p>';
    console.error(error);
  }
}

loadProducts();
