// ===========================================
// TechShop - Product Listing Website
// Main JavaScript File
// ===========================================

// 1. PRODUCT DATA MANAGEMENT
const productsData = [
    {
        id: 1,
        title: "Smartphone X Pro",
        owner: "TechBrand",
        category: "mobile",
        price: 699.99,
        originalPrice: 799.99,
        image: "./assets/images/Smartphone X Pro 1.jpg",
        description: "Latest flagship smartphone with advanced camera system and 5G connectivity.",
        rating: 4.5,
        featured: true
    },
    {
        id: 2,
        title: "Gaming Laptop Pro",
        owner: "GamingTech",
        category: "laptop",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "./assets/images/Gaming Laptop Pro 2.jpg",
        description: "High-performance gaming laptop with RTX graphics and 144Hz display.",
        rating: 4.7,
        featured: false
    },
    {
        id: 3,
        title: "UltraBook Air",
        owner: "UltraTech",
        category: "laptop",
        price: 899.99,
        originalPrice: 999.99,
        image: "./assets/images/UltraBook Air 3.jpg",
        description: "Lightweight and powerful ultrabook for professionals on the go.",
        rating: 4.3,
        featured: false
    },
    {
        id: 4,
        title: "Smart Watch Series 5",
        owner: "WearableTech",
        category: "watch",
        price: 249.99,
        originalPrice: 299.99,
        image: "./assets/images/Smart Watch Series 4.jpg",
        description: "Advanced smartwatch with health monitoring and always-on display.",
        rating: 4.4,
        featured: false
    },
    {
        id: 5,
        title: "Wireless Headphones Pro",
        owner: "AudioTech",
        category: "headphones",
        price: 199.99,
        originalPrice: 249.99,
        image: "./assets/images/Wireless Headphones Pro 5.jpg",
        description: "Premium noise-cancelling headphones with 30-hour battery life.",
        rating: 4.6,
        featured: false
    },
    {
        id: 6,
        title: "Smartphone Y Lite",
        owner: "TechBrand",
        category: "mobile",
        price: 399.99,
        originalPrice: 499.99,
        image: "./assets/images/Smartphone Y Lite 6.jpg",
        description: "Budget-friendly smartphone with great camera and battery life.",
        rating: 4.2,
        featured: false
    },
    {
        id: 7,
        title: "Business Laptop Elite",
        owner: "BusinessTech",
        category: "laptop",
        price: 1099.99,
        originalPrice: 1299.99,
        image: "./assets/images/Business Laptop Elite 7.jpg",
        description: "Secure business laptop with enterprise features and long battery.",
        rating: 4.5,
        featured: false
    },
    {
        id: 8,
        title: "Fitness Tracker Band",
        owner: "FitTech",
        category: "watch",
        price: 79.99,
        originalPrice: 99.99,
        image: "./assets/images/Fitness Tracker Band 8.jpg",
        description: "Activity tracker with heart rate monitor and sleep tracking.",
        rating: 4.0,
        featured: false
    },
    {
        id: 9,
        title: "Gaming Headset Pro",
        owner: "GamingTech",
        category: "headphones",
        price: 149.99,
        originalPrice: 179.99,
        image: "./assets/images/Gaming Headset Pro 9.jpg",
        description: "7.1 surround sound gaming headset with noise-cancelling mic.",
        rating: 4.3,
        featured: false
    },
    {
        id: 10,
        title: "Tablet Pro Max",
        owner: "TechBrand",
        category: "mobile",
        price: 549.99,
        originalPrice: 649.99,
        image: "./assets/images/Tablet Pro Max 10.jpg",
        description: "Powerful tablet for work and entertainment with stylus support.",
        rating: 4.4,
        featured: false
    },
    {
        id: 11,
        title: "Bluetooth Earbuds",
        owner: "AudioTech",
        category: "headphones",
        price: 129.99,
        originalPrice: 159.99,
        image: "./assets/images/Bluetooth Earbuds 11.jpg",
        description: "True wireless earbuds with charging case and water resistance.",
        rating: 4.1,
        featured: false
    },
    {
        id: 12,
        title: "Smart Watch Classic",
        owner: "WearableTech",
        category: "watch",
        price: 179.99,
        originalPrice: 219.99,
        image: "./assets/images/Smart Watch Classic 12.jpg",
        description: "Classic design smartwatch with premium materials and features.",
        rating: 4.2,
        featured: false
    }
];

// 2. GLOBAL VARIABLES
let currentProducts = [...productsData];
let currentProductIndex = 0;
let currentFilter = 'all';
let cartItems = [];
let currentFeaturedProduct = productsData.find(p => p.featured) || productsData[0];

// 3. DOM ELEMENTS
const elements = {
    productsContainer: document.getElementById('products-container'),
    prevBtn: document.getElementById('prev-product-btn'),
    nextBtn: document.getElementById('next-product-btn'),
    currentProduct: document.getElementById('current-product'),
    totalProducts: document.getElementById('total-products'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    cartCount: document.getElementById('cart-count'),
    featuredImg: document.getElementById('featured-img'),
    featuredTitle: document.getElementById('featured-title'),
    featuredOwner: document.getElementById('featured-owner'),
    featuredDescription: document.getElementById('featured-description'),
    featuredPrice: document.getElementById('featured-price'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    navLinks: document.querySelector('.nav-links'),
    newsletterForm: document.getElementById('newsletter-form')
};

// 4. INITIALIZATION
function init() {
    displayProducts();
    updateProductNavigation();
    updateFeaturedProduct();
    loadCart();
    setupEvents();
    addStyles();
}

// 5. PRODUCT DISPLAY
function displayProducts() {
    const container = elements.productsContainer;
    
    if (currentProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try a different search or filter</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = currentProducts.map((product, i) => 
        createProductCard(product, i)
    ).join('');
    
    updateProductNavigation();
}

function createProductCard(product, index) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}" style="--card-index: ${index}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                ${discount > 0 ? `<span class="product-badge" style="background-color: var(--danger-color); left: 1rem; right: auto;">-${discount}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-owner">By ${product.owner}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    
    return `${'<i class="fas fa-star"></i>'.repeat(full)}${half ? '<i class="fas fa-star-half-alt"></i>' : ''}${'<i class="far fa-star"></i>'.repeat(empty)}`;
}

// 6. PRODUCT NAVIGATION
function updateProductNavigation() {
    const total = currentProducts.length;
    
    elements.currentProduct.textContent = total === 0 ? '0' : currentProductIndex + 1;
    elements.totalProducts.textContent = total;
    elements.prevBtn.disabled = currentProductIndex === 0;
    elements.nextBtn.disabled = currentProductIndex >= total - 1;
}

function navigate(direction) {
    const max = currentProducts.length - 1;
    
    if (direction === 'next' && currentProductIndex < max) {
        currentProductIndex++;
    } else if (direction === 'prev' && currentProductIndex > 0) {
        currentProductIndex--;
    }
    
    updateProductNavigation();
    scrollToProduct();
}

function scrollToProduct() {
    const cards = document.querySelectorAll('.product-card');
    if (cards[currentProductIndex]) {
        cards.forEach(c => c.classList.remove('highlight'));
        cards[currentProductIndex].classList.add('highlight');
        cards[currentProductIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// 7. FILTER & SEARCH
function filterProducts(category) {
    currentFilter = category;
    currentProductIndex = 0;
    currentProducts = category === 'all' ? [...productsData] : productsData.filter(p => p.category === category);
    
    const container = elements.productsContainer;
    container.style.opacity = '0';
    
    setTimeout(() => {
        displayProducts();
        container.style.opacity = '1';
    }, 200);
}

function searchProducts(term) {
    const search = term.toLowerCase().trim();
    
    if (!search) {
        filterProducts(currentFilter);
        return;
    }
    
    currentProducts = productsData.filter(p => 
        p.title.toLowerCase().includes(search) ||
        p.owner.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
    
    currentProductIndex = 0;
    displayProducts();
}

// 8. CART MANAGEMENT
function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    const existing = cartItems.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Added to cart');
}

function updateCart() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = total;
    elements.cartCount.parentElement.classList.add('pulse');
    
    setTimeout(() => elements.cartCount.parentElement.classList.remove('pulse'), 300);
    
    localStorage.setItem('techshop_cart', JSON.stringify(cartItems));
}

function loadCart() {
    const saved = localStorage.getItem('techshop_cart');
    if (saved) {
        cartItems = JSON.parse(saved);
        updateCart();
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 10000;
        background: var(--success-color); color: white;
        padding: 1rem 1.5rem; border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2300);
}

// 9. FEATURED PRODUCT
function updateFeaturedProduct() {
    if (!currentFeaturedProduct) return;
    
    elements.featuredImg.src = currentFeaturedProduct.image;
    elements.featuredImg.alt = currentFeaturedProduct.title;
    elements.featuredTitle.textContent = currentFeaturedProduct.title;
    elements.featuredOwner.textContent = `By ${currentFeaturedProduct.owner}`;
    elements.featuredDescription.textContent = currentFeaturedProduct.description;
    elements.featuredPrice.textContent = `$${currentFeaturedProduct.price.toFixed(2)}`;
}

function showProductDetails(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    currentFeaturedProduct = product;
    updateFeaturedProduct();
    
    document.querySelector('.featured-product').scrollIntoView({ behavior: 'smooth' });
    elements.featuredImg.parentElement.classList.add('pulse');
    
    setTimeout(() => elements.featuredImg.parentElement.classList.remove('pulse'), 1000);
}

// 10. EVENT LISTENERS
function setupEvents() {
    // Navigation
    elements.prevBtn.addEventListener('click', () => navigate('prev'));
    elements.nextBtn.addEventListener('click', () => navigate('next'));
    
    // Filter
    elements.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });
    
    // Search
    elements.searchBtn.addEventListener('click', () => searchProducts(elements.searchInput.value));
    elements.searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchProducts(elements.searchInput.value);
    });
    
    // Cart (Event Delegation)
    document.addEventListener('click', (e) => {
        const cartBtn = e.target.closest('.add-to-cart-btn');
        const card = e.target.closest('.product-card');
        
        if (cartBtn) {
            e.stopPropagation();
            addToCart(parseInt(cartBtn.dataset.productId));
        } else if (card) {
            showProductDetails(parseInt(card.dataset.id));
        }
    });
    
    // Featured Product
    document.querySelector('.buy-now-btn')?.addEventListener('click', () => {
        if (currentFeaturedProduct) {
            addToCart(currentFeaturedProduct.id);
            showNotification(`Proceeding to checkout with ${currentFeaturedProduct.title}`);
        }
    });
    
    document.querySelector('.featured-details .add-to-cart-btn')?.addEventListener('click', () => {
        if (currentFeaturedProduct) addToCart(currentFeaturedProduct.id);
    });
    
    // Mobile Menu
    elements.mobileMenuBtn.addEventListener('click', toggleMenu);
    
    document.addEventListener('click', (e) => {
        if (!elements.navLinks.contains(e.target) && 
            !elements.mobileMenuBtn.contains(e.target) && 
            elements.navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Newsletter
    elements.newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for subscribing!');
        elements.newsletterForm.reset();
    });
    
    // Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && elements.navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    elements.navLinks.classList.toggle('active');
    const icon = elements.mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// 11. ANIMATION STYLES
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            box-shadow: 0 0 0 3px var(--accent-color), var(--shadow-lg) !important;
            transform: scale(1.02) !important;
            transition: all 0.3s ease !important;
        }
        
        .pulse { animation: pulse 0.5s ease; }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; }
        }
        
        .no-products {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem;
            color: var(--gray-color);
        }
        
        .no-products i {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: var(--light-gray);
        }
        
        .no-products h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .products-container {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// 12. INITIALIZE
document.addEventListener('DOMContentLoaded', init);

// 13. EXPORT FOR CONSOLE (Development)
window.TechShop = {
    products: productsData,
    cart: cartItems,
    filter: filterProducts,
    search: searchProducts,
    addToCart
};