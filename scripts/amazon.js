let productsHTML = '';

products.forEach((product) => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button 
            button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>`;

    productsHTML += html + '\n';
});

let productGrid = document.querySelector('.products-grid');
productGrid.innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => { 
            /* In the tutorial, accessing product name is done via the 
            data attribute 'data-product-name' , but before watching
            the solution I first solved it using my own method of
            going up and down the DOM to access product name which can 
            be found inside a div. Switching from product name to id is 
            better for multiple reasons so the tutorial code was used
            instead. My code is found below:
            (note that addToCart used to contain product name not id)

            const productName = productContainer.querySelector('.product-name').innerText;
            addToCart(productName, amount);
            */
           const productId = button.dataset.productId;

           const productContainer = button.closest('.product-container');
           const amount = +productContainer.querySelector('select').value;
           addToCart(productId, amount);
           console.log(cart);   // DEBUGGING STATEMENT
        });
    })