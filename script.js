document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const sortFilter = document.getElementById("sortFilter");
    const products = document.querySelectorAll(".product-card");
    const cartCount = document.querySelector(".cart-count");

    let cartItems = 0;

    function filterProducts() {
        let categoryValue = categoryFilter.value;
        let priceValue = priceFilter.value;
        let sortValue = sortFilter.value;

        let filteredProducts = Array.from(products).filter(product => {
            let productCategory = product.getAttribute("data-category");
            let productPrice = parseInt(product.getAttribute("data-price"));

            let categoryMatch = categoryValue === "all" || productCategory === categoryValue;

            let priceMatch = true;
            if (priceValue === "under5000") priceMatch = productPrice < 55000;
            else if (priceValue === "5000to110000") priceMatch = productPrice >= 55000 && productPrice <= 110000;
            else if (priceValue === "110000to220000") priceMatch = productPrice > 110000 && productPrice <= 220000;
            else if (priceValue === "over220000") priceMatch = productPrice > 220000;

            return categoryMatch && priceMatch;
        });

        if (sortValue === "priceLowHigh") {
            filteredProducts.sort((a, b) => parseInt(a.getAttribute("data-price")) - parseInt(b.getAttribute("data-price")));
        } else if (sortValue === "priceHighLow") {
            filteredProducts.sort((a, b) => parseInt(b.getAttribute("data-price")) - parseInt(a.getAttribute("data-price")));
        } else if (sortValue === "newest") {
            filteredProducts.sort((a, b) => b.dataset.index - a.dataset.index);
        }

        const grid = document.querySelector(".products-grid");
        grid.innerHTML = "";
        filteredProducts.forEach(product => grid.appendChild(product));
    }

    function buyProduct(event) {
        cartItems++;
        cartCount.textContent = cartItems;
        showNotification("Item added to cart");
    }

    function showNotification(message) {
        const note = document.createElement("div");
        note.textContent = message;
        note.className = "notification";
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 2000);
    }

    document.querySelectorAll(".btn-add-cart").forEach(btn => {
        btn.addEventListener("click", buyProduct);
    });

    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);

    filterProducts();
});
