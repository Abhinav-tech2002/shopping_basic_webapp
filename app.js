const products = [
  { id: 1, name: 'Aero Runner', brand: 'Nike', color: 'Black', type: 'Shoes', price: 129, rating: 4.7, tone: '#d7d0cb' },
  { id: 2, name: 'Classic Tee', brand: 'Zara', color: 'White', type: 'T-Shirt', price: 42, rating: 4.3, tone: '#f3efe9' },
  { id: 3, name: 'City Shell', brand: 'Adidas', color: 'Blue', type: 'Jacket', price: 165, rating: 4.8, tone: '#cadde8' },
  { id: 4, name: 'Relaxed Denim', brand: 'Levi\'s', color: 'Blue', type: 'Jeans', price: 89, rating: 4.2, tone: '#b3c9d9' },
  { id: 5, name: 'Metro Tote', brand: 'Puma', color: 'Black', type: 'Accessories', price: 64, rating: 4.1, tone: '#d9d5d1' },
  { id: 6, name: 'Court Low', brand: 'Nike', color: 'White', type: 'Shoes', price: 98, rating: 4.5, tone: '#f3efea' },
  { id: 7, name: 'Heritage Knit', brand: 'Zara', color: 'Green', type: 'T-Shirt', price: 38, rating: 3.9, tone: '#b4c8b7' },
  { id: 8, name: 'Northline', brand: 'Puma', color: 'Red', type: 'Jacket', price: 214, rating: 4.6, tone: '#d4a1a1' },
  { id: 9, name: 'Ridge Jean', brand: 'Levi\'s', color: 'Black', type: 'Jeans', price: 112, rating: 4.4, tone: '#b7b4b3' },
  { id: 10, name: 'Leather Wrap', brand: 'Adidas', color: 'White', type: 'Accessories', price: 56, rating: 4.0, tone: '#efefee' },
  { id: 11, name: 'Track Flex', brand: 'Nike', color: 'Red', type: 'Shoes', price: 149, rating: 4.7, tone: '#d8a3a2' },
  { id: 12, name: 'Layer Zip', brand: 'Zara', color: 'Black', type: 'Jacket', price: 180, rating: 4.6, tone: '#a9a6a4' }
];

const state = {
  search: '',
  sort: 'default',
  filters: {
    brand: [],
    color: [],
    type: [],
    price: [],
    rating: []
  },
  bag: []
};

const searchInput = document.getElementById('search-input');
const bagButton = document.getElementById('bag-button');
const bagCount = document.getElementById('cart-count');
const productGrid = document.getElementById('product-grid');
const resultCount = document.getElementById('result-count');
const noResults = document.getElementById('no-results');
const sortSelect = document.getElementById('sort-select');
const clearFiltersButton = document.getElementById('clear-filters');
const toast = document.getElementById('toast');

function getSelectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function matchesPrice(product, value) {
  const [min, max] = value.split('-').map(Number);

  if (!Number.isFinite(max)) {
    return product.price >= min;
  }

  return product.price >= min && product.price < max;
}

function matchesRating(product, value) {
  return product.rating >= Number(value);
}

function productMatchesFilters(product) {
  const filters = state.filters;

  if (filters.brand.length && !filters.brand.includes(product.brand)) return false;
  if (filters.color.length && !filters.color.includes(product.color)) return false;
  if (filters.type.length && !filters.type.includes(product.type)) return false;
  if (filters.price.length && !filters.price.some((value) => matchesPrice(product, value))) return false;
  if (filters.rating.length && !filters.rating.some((value) => matchesRating(product, value))) return false;

  if (state.search.trim()) {
    const query = state.search.trim().toLowerCase();
    const searchableText = `${product.name} ${product.brand} ${product.color} ${product.type}`.toLowerCase();
    if (!searchableText.includes(query)) return false;
  }

  return true;
}

function sortProducts(items) {
  const sorted = [...items];

  switch (state.sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

function updateBagCount() {
  bagCount.textContent = state.bag.length;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

function renderProducts() {
  const visibleProducts = sortProducts(products.filter(productMatchesFilters));

  resultCount.textContent = `${visibleProducts.length} item${visibleProducts.length === 1 ? '' : 's'} found`;

  if (!visibleProducts.length) {
    productGrid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card" aria-label="${product.name} product card">
          <div class="product-image" style="background: linear-gradient(135deg, ${product.tone}, #efe5dd 54%, #d8c4b5);">
            <span class="product-badge">${product.brand}</span>
            <div class="product-shape" style="background: rgba(255,255,255,0.32); border-color: rgba(31, 26, 23, 0.1);"></div>
          </div>
          <div class="product-info">
            <div class="product-info-top">
              <div>
                <h2 class="product-name">${product.name}</h2>
                <p class="product-brand">${product.brand}</p>
              </div>
              <span class="product-price">$${product.price}</span>
            </div>
            <div class="product-meta">
              <span class="rating">★ ${product.rating.toFixed(1)}</span>
              <span class="product-type">${product.type}</span>
            </div>
            <button class="add-to-bag" type="button" data-id="${product.id}">Add to bag</button>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-to-bag').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      state.bag.push(id);
      updateBagCount();
      showToast('Added to bag');
    });
  });
}

function syncFiltersFromInputs() {
  state.filters.brand = getSelectedValues('brand');
  state.filters.color = getSelectedValues('color');
  state.filters.type = getSelectedValues('type');
  state.filters.price = getSelectedValues('price');
  state.filters.rating = getSelectedValues('rating');

  renderProducts();
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderProducts();
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderProducts();
});

clearFiltersButton.addEventListener('click', () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  sortSelect.value = 'default';
  searchInput.value = '';
  state.search = '';
  state.sort = 'default';
  state.filters = {
    brand: [],
    color: [],
    type: [],
    price: [],
    rating: []
  };
  renderProducts();
});

bagButton.addEventListener('click', () => {
  const total = state.bag.length;
  const message = total ? `Your bag has ${total} item${total === 1 ? '' : 's'}.` : 'Your bag is empty.';
  showToast(message);
});

document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
  input.addEventListener('change', syncFiltersFromInputs);
});

updateBagCount();
renderProducts();
