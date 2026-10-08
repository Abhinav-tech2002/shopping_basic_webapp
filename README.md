# MAISON FORM — The Considered Collection

A modern and minimal e-commerce storefront for a curated fashion collection, built with HTML, CSS, and JavaScript.

Maison Form focuses on a clean shopping experience where users can browse products, search the collection, filter products, sort results, and manage items in their shopping bag.

## Overview

Maison Form is a frontend e-commerce project designed around a minimalist fashion-store concept.

The interface includes a curated product collection along with interactive search, filtering, sorting, and shopping-bag functionality.

The project focuses on creating a clean and responsive shopping experience while keeping the interface simple and easy to navigate.

## Features

### 🔍 Product Search

Users can search the collection using the search bar.

The product list dynamically updates based on the search query.

### 🏷️ Brand Filtering

Products can be filtered by brand:

- Nike
- Adidas
- Puma
- Levi's
- Zara

### 🎨 Color Filtering

Users can filter products based on color:

- Black
- White
- Red
- Blue
- Green

### 👕 Item Type Filtering

Products can be filtered by category:

- Shoes
- T-Shirt
- Jacket
- Jeans
- Accessories

### 💰 Price Filtering

Products can be filtered according to price range:

- Under $50
- $50 - $100
- $100 - $200
- $200+

### ⭐ Rating Filtering

Users can filter products based on their minimum rating:

- 4★ & above
- 3★ & above
- 2★ & above

### ↕️ Product Sorting

Products can be sorted using:

- Default
- Price: Low to High
- Price: High to Low
- Rating
- Name A-Z

### 🛍️ Shopping Bag

The header includes a shopping bag with a dynamic item count, allowing the interface to display the number of products added to the bag.

### 🧹 Clear Filters

The **Clear All** option resets the selected filters.

### 📊 Dynamic Results

The number of products matching the current search and filter conditions is displayed dynamically.

If no products match the selected criteria, the application displays:

> No products match your filters.

### 🔔 User Feedback

A toast notification area is included to provide users with feedback when certain actions are performed.

## Design

The website follows a minimalist fashion-store aesthetic with:

- Clean typography
- Neutral visual styling
- Spacious layouts
- Simple navigation
- Product-focused presentation
- Responsive design

The collection section uses the heading:

> "A little more considered."

with the supporting description:

> "Well-made favorites for wherever the day takes you."

## Accessibility

The project includes several accessibility considerations, including:

- Semantic HTML elements
- Accessible form labels
- `aria-label` attributes
- `aria-live` regions for dynamic content
- Screen-reader-friendly hidden labels
- Keyboard-friendly interactive elements

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**

### HTML5

Used to create the structure of the storefront, including:

- Header
- Search
- Filters
- Product collection
- Shopping bag
- Sorting controls

### CSS3

Used for:

- Layout
- Typography
- Responsive design
- Product grid
- Navigation
- Visual styling
- Animations and UI elements

### JavaScript

Used to implement the interactive functionality:

- Product search
- Product filtering
- Product sorting
- Dynamic product rendering
- Shopping bag count
- Result count
- Clear filters
- User notifications

## Project Structure

```text
Maison-Form/
│
├── index.html
├── style.css
├── app.js
└── README.md
