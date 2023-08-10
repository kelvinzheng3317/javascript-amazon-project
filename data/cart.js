import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// [{
//     "id": 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     "quantity": 3
// }, {
//     "id": "54e0eccd-8f36-462b-b68a-8182611d9add",
//     "quantity": 2
// }];

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// product argument is a string for the name of the product
export function addToCart(productId, amount) {
    let productFound = false;
    let productIndex = -1;

    // determines whether the product is already in the cart and if so what index
    for(let i=0; i<cart.length; ++i) {
        if (cart[i].id === productId) {
            productFound = true;
            productIndex = i;
            break;
        }
    }

    // adds var amount more of the product to the cart
    if (productFound) {
        cart[productIndex].quantity += amount;
    } else {
        cart.push({
            "id": productId,
            "quantity": amount
        });
    }

    // updates the cart number inside the cart icon for the header
    let cartQuantity = getCartQuantity();
    document.querySelector('.cart-quantity')
        .innerText = cartQuantity;
    saveToStorage();
}

// inefficient method, is there a better way?
export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.id != productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function getCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;
}

export function getCartTotal() {
    let cartTotal = 0;
    // this is very inefficient, O(n^2) essentially
    cart.forEach((cartItem) => {
        products.forEach((product) => {
            if (product.id === cartItem.id) {
                cartTotal += product.priceCents * cartItem.quantity;
            }
        })
    })
    return (cartTotal/100).toFixed(2);
}
