// Load quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Wisdom" },
  { text: "You miss 100% of the shots you don’t take.", category: "Inspiration" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");

// Save quotes to localStorage
function saveQuotesToStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ ALX-required: showRandomQuote (uses innerHTML)
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes in this category.</em>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
}

// ✅ ALX-required: addQuote function
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  saveQuotesToStorage();
  updateCategoryFilter(category);
  quoteDisplay.innerHTML = `"${text}" — <strong>${category}</strong>`;

  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added successfully!");
}

// Update the dropdown with new category if needed
function updateCategoryFilter(newCategory) {
  const existingOptions = Array.from(categoryFilter.options).map(opt => opt.value.toLowerCase());

  if (!existingOptions.includes(newCategory.toLowerCase())) {
    const option = document.createElement("option");
    option.value = newCategory;
    option.textContent = newCategory;
    categoryFilter.appendChild(option);
  }
}

// Populate dropdown with initial categories
function populateInitialCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(updateCategoryFilter);
}

// ✅ ALX-required: Event listener for button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", showRandomQuote);

// Run setup
populateInitialCategories();