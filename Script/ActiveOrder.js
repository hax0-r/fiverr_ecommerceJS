const cartFixed = document.getElementById('cartFixed');
const cartToggle = document.getElementById('cartToggle');
const cartToggleClose = document.getElementById('cartToggleClose');

cartToggle.addEventListener('click', () => {
    cartFixed.style.width = '400px';
});

cartToggleClose.addEventListener('click', () => {
    cartFixed.style.width = '0px';
});


const activeOrderSection = document.getElementById("activeOrderSection");
const totalPriceElement = document.getElementById('totalPrice');

const pizzaCategoryButton = document.getElementById('pizzaCategoryButton');
const burgerCategoryButton = document.getElementById('burgerCategoryButton');
const allCategoryButton = document.getElementById('allCategoryButton');

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

const renderCart = (category) => {
    activeOrderSection.innerHTML = "";
    let cart = getCartFromLocalStorage();

    if (category) {
        cart = cart.filter(item => item.category === category);
    }

    cart.forEach((item) => {
        let cartElement = document.createElement('div');
        cartElement.className = "cart";
        cartElement.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.title}">
            <div class="counter">
                <p>${item.title}</p>
                <span>
                    <i class="fa-solid fa-minus"></i>
                    <p>${item.quantity}</p>
                    <i class="fa-solid fa-plus"></i>
                </span>
            </div>
            <div class="delete">
                <i class="fa-solid fa-trash-can"></i>
                <p>${item.price}</p>
            </div>
        `;
        cartElement.querySelector('.fa-plus').addEventListener('click', () => {
            addToCart(item);
        });
        cartElement.querySelector('.fa-minus').addEventListener('click', () => {
            removeFromCart(item);
        });
        cartElement.querySelector('.fa-trash-can').addEventListener('click', () => {
            deleteFromCart(item);
        });
        activeOrderSection.appendChild(cartElement);
    });
    updateTotalPrice();
};

const updateTotalPrice = () => {
    const cart = getCartFromLocalStorage();
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);
    totalPriceElement.innerText = ` $${total.toFixed(2)}`;
};

const addToCart = (item) => {
    let cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex(cartItem => cartItem.title === item.title);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

const removeFromCart = (item) => {
    let cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex(cartItem => cartItem.title === item.title);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

const deleteFromCart = (item) => {
    let cart = getCartFromLocalStorage();
    cart = cart.filter(cartItem => cartItem.title !== item.title);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

// Event listeners for category buttons
pizzaCategoryButton.addEventListener('click', () => renderCart('pizza'));
burgerCategoryButton.addEventListener('click', () => renderCart('burger'));
allCategoryButton.addEventListener('click', () => renderCart());

// Initial render of cart
renderCart();
