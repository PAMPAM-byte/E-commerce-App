const products = [
    {
        id: 1,
        name: "Laptop",
        price: 800,
        image: "image/HP.jpeg"
    },
    {
        id: 2,
        name: "Phone",
        price: 500,
        image: "image/Samsung.jpeg"
    },
    {
        id: 3,
        name: "Headphones",
        price: 150,
        image: "image/Head1.jpeg"
    },
    {
        id: 4,
        name: "Laptop",
        price: 800,
        image: "image/len.jpeg"
    },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalDisplay = document.getElementById("total");
const modal = document.getElementById("checkout-modal");

function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(div);
    });
}

function addToCart(id) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name} ($${item.price})</span>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalDisplay.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    modal.style.display = "flex";
});

function closeModal() {
    modal.style.display = "none";
}

renderProducts();
updateCart();