const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load JSON dataset
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// Endpoint to get all categories
app.get("/categories", (req, res) => {
  const categories = [...new Set(data.map(item => item.category))];
  res.json(categories);
});

// Endpoint to get FAQs by category
app.get("/faqs/:category", (req, res) => {
  const category = req.params.category;
  const faqs = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
  if (faqs.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(faqs);
});

// Endpoint to get all FAQs
app.get("/faqs", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
