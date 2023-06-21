const cart = [];
let cartQuantity = 0;

// product argument is a string for the name of the product
function addToCart(productId, amount) {
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
    cartQuantity += amount;
    let cartDisplayNum = document.querySelector('.cart-quantity');
    cartDisplayNum.innerText = cartQuantity;
}