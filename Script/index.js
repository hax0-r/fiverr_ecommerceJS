const cartFixed = document.getElementById('cartFixed');
const cartToggle = document.getElementById('cartToggle');
const cartToggleClose = document.getElementById('cartToggleClose');

cartToggle.addEventListener('click', () => {
    cartFixed.style.width = '400px';
})
cartToggleClose.addEventListener('click', () => {
    cartFixed.style.width = '0px';
})


// ===========dynamic Cards=================

const cardsData = [
    {
        imgSrc: "./Assets/Index/Spaghetti.png",
        title: "Spaghetti",
        rating: 3,
        price: "$7.29"
    },
    {
        imgSrc: "./Assets/Index/Sweets.png",
        title: "Sweets",
        rating: 3,
        price: "$7.29"
    },
    {
        imgSrc: "./Assets/Index/Vegetable Pizza.png",
        title: "Vegetable Pizza",
        rating: 3,
        price: "$7.29"
    },
    {
        imgSrc: "./Assets/Index/Mushroom Pizza.png",
        title: "Mushroom Pizza",
        rating: 3,
        price: "$7.29"
    }
];

const cards = document.getElementById("cardSection")

const cardMethod = () => {
    cardsData.map((data) => {
        let cardElement = document.createElement('div')
        cardElement.innerHTML = `
                <div class="card">
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
                        <p>$ ${data.price}</p>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>`
        cards.appendChild(cardElement)
    })
}

cardMethod()


const carts = document.getElementById("cartSection")

const cartMethod = () => {
    cardsData.map((data) => {
        let cartElement = document.createElement('div')
        cartElement.innerHTML = `
                <div class="cart">
                <img src="${data.imgSrc}" alt="${data.title}">
                <div class="counter">
                    <p>${data.title}</p>
                    <span>
                        <i class="fa-solid fa-minus"></i>
                        <p>1</p>
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
                <div class="delete">
                    <i class="fa-solid fa-trash-can"></i>
                    <p>$ ${data.price}</p>
                </div>
            </div>`
        carts.appendChild(cartElement)
    })
}

cartMethod()

