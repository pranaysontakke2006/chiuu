
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());


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


app.get("/", (req, res) => {
  res.send("ShopSphere backend is running!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`ShopSphere backend running at http://localhost:${PORT}`);
});
