const cartFixed = document.getElementById('cartFixed');
const cartToggle = document.getElementById('cartToggle');
const cartToggleClose = document.getElementById('cartToggleClose');

cartToggle.addEventListener('click', () => {
    cartFixed.style.width = '350px';
});

cartToggleClose.addEventListener('click', () => {
    cartFixed.style.width = '0px';
});


const cardsData = [
    {
        imgSrc: "./Assets/Index/Spaghetti.png",
        title: "Spaghetti",
        rating: 3,
        price: "$7.29",
        category: "pizza"
    },
    {
        imgSrc: "./Assets/Index/Sweets.png",
        title: "Sweets",
        rating: 3,
        price: "$7.29",
        category: "pizza"
    },
    {
        imgSrc: "./Assets/Index/Vegetable Pizza.png",
        title: "Vegetable Pizza",
        rating: 3,
        price: "$7.29",
        category: "pizza"
    },
    {
        imgSrc: "./Assets/Index/Vegetable Pizza.png",
        title: "Vegetable Pizza",
        rating: 3,
        price: "$7.29",
        category: "pizza"
    },
    {
        imgSrc: "./Assets/Index/Vegetable Pizza.png",
        title: "Vegetable Pizza",
        rating: 3,
        price: "$3.29",
        category: "burger"
    },
    {
        imgSrc: "./Assets/Index/Vegetable Pizza.png",
        title: "Vegetable Pizza",
        rating: 3,
        price: "$3.29",
        category: "burger"
    },
    {
        imgSrc: "./Assets/Index/Mushroom Pizza.png",
        title: "Mushroom Pizza",
        rating: 3,
        price: "$3.29",
        category: "burger"
    }
];

const cards = document.getElementById("cardSection");
const searchInput = document.getElementById('searchInput'); 


const cardMethod = (category, searchTerm) => {
    cards.innerHTML = "";
    let filteredData = category ? cardsData.filter(data => data.category === category) : cardsData;

    if (searchTerm) {
        filteredData = filteredData.filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    filteredData.map((data) => {
        let cardElement = document.createElement('div');
        cardElement.className = "card";
        cardElement.innerHTML = `
            <div>
                <img src="${data.imgSrc}" alt="${data.title}">
            </div>
            <p>${data.title}</p>
            <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <div class="price">
                <p>${data.price}</p>
                <i class="fa-solid fa-plus"></i>
            </div>
        `;
        cardElement.querySelector('.fa-plus').addEventListener('click', () => {
            addToCart(data);
            showNotification(`${data.title} added to cart`);
        });
        cards.appendChild(cardElement);
    });
}

const pizzaCategory = document.getElementById('pizzaCategory');
const burgerCategory = document.getElementById('burgerCategory');
pizzaCategory.addEventListener('click', () => {
    cardMethod('pizza', searchInput.value); // Pass the current search term
    pizzaCategory.classList.add("categoryColor");
    burgerCategory.classList.remove("categoryColor");
});
burgerCategory.addEventListener('click', () => {
    cardMethod('burger', searchInput.value); // Pass the current search term
    pizzaCategory.classList.remove("categoryColor");
    burgerCategory.classList.add("categoryColor");
});

searchInput.addEventListener('input', () => {
    const category = pizzaCategory.classList.contains("categoryColor") ? 'pizza' : 
                     burgerCategory.classList.contains("categoryColor") ? 'burger' : null;
    cardMethod(category, searchInput.value);
});

cardMethod();
const carts = document.getElementById("cartSection");
const totalPriceElement = document.querySelector(".cartFixed p"); // Get the element that displays the total price

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addToCart = (item) => {
    let cart = getCartFromLocalStorage();
    const itemIndex = cart.findIndex(cartItem => cartItem.title === item.title);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    saveCartToLocalStorage(cart);
    renderCart();
}
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

    saveCartToLocalStorage(cart);
    renderCart();
}

const deleteFromCart = (item) => {
    let cart = getCartFromLocalStorage();
    cart = cart.filter(cartItem => cartItem.title !== item.title);
    saveCartToLocalStorage(cart);
    renderCart();
}

const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0).toFixed(2); // Round to 2 decimal places
}

const renderCart = () => {
    carts.innerHTML = "";
    const cart = getCartFromLocalStorage();
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
        carts.appendChild(cartElement);
    });

    const totalPrice = calculateTotalPrice(cart);
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
}

const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

renderCart();