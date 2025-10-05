
let cartCount = 0;
let cartItems = [];

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function addToCart(productName, price) {
    cartCount++;
    cartItems.push({ name: productName, price: price });
    updateCartCount();
    
   
    showNotification(`${productName} added to cart!`, 'success');
}

function buyProduct() {
    
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const price = productCard.querySelector('.current-price').textContent;
    
    addToCart(productName, price);
}

function showAlert() {
    showNotification("Welcome to Luxury Jewelry Store! Discover our exclusive collection.", 'info');
}


function showNotification(message, type = 'info') {
  
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
   
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}


function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    showNotification(`Searching for: ${searchTerm}`, 'info');
                }
            }
        });
    }
}


function toggleWishlist() {
    const wishlistBtn = event.target.closest('.btn-wishlist');
    if (wishlistBtn) {
        const isActive = wishlistBtn.classList.contains('active');
        
        if (isActive) {
            wishlistBtn.classList.remove('active');
            wishlistBtn.style.background = '#dc3545';
            showNotification('Removed from wishlist', 'info');
        } else {
            wishlistBtn.classList.add('active');
            wishlistBtn.style.background = '#28a745';
            showNotification('Added to wishlist', 'success');
        }
    }
}


function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-form input');
    if (emailInput) {
        const email = emailInput.value.trim();
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function initializeMobileMenu() {
    
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: white;
        cursor: pointer;
    `;
    
   
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            .main-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #333;
                flex-direction: column;
            }
            .main-menu.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
}


function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    
    if (name && email) {
        if (name.value.trim() === "" || email.value.trim() === "") {
            showNotification("Please fill in all required fields", 'error');
            return false;
        }
        
        if (!isValidEmail(email.value.trim())) {
            showNotification("Please enter a valid email address", 'error');
            return false;
        }
        
        showNotification("Message sent successfully!", 'success');
        return true;
    }
    
    showNotification("Form submitted successfully!", 'success');
    return true;
}


document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeSmoothScrolling();
    initializeMobileMenu();
    updateCartCount();
    
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-wishlist')) {
            toggleWishlist();
        }
    });
    
    const newsletterBtn = document.querySelector('.newsletter-form button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});