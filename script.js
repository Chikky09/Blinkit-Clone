/*saving data*/
/*loadCart();*/

function saveCart(){
    localStorage.setItem("cartHTML", cartItemsContainer.innerHTML);

    localStorage.setItem("totalItems", totalItems);

    localStorage.setItem("totalPrice", totalPrice);
}

function loadCart(){
    const savedCart = localStorage.getItem("cartHTML");

    const savedItems = localStorage.gatItem("totalItems");

    const savedPrice = localStorage.getItem("totalPrice");

    if(savedCart){
        cartItemsContainer.innerHTML = savedCart;
    }

    if(savedItems){
        totalItems = parseInt(savedItems);
    }

    if(savedPrice){
        totalPrice = parseInt(savedPrice);
    }

updateStickyCart();
saveCart();

totalText.innerText = `Total: ₹${totalPrice}`;
}

/*SELECTORS*/

const addButtons =
document.querySelectorAll(".add-btn");

const stickyCart =
document.querySelector(".sticky-cart");

const stickyText =
document.querySelector(".sticky-cart h3");

const stickyPrice =
document.querySelector(".sticky-cart p");

const cartSidebar =
document.querySelector(".cart-sidebar");

const cartButton =
document.querySelector(".cart-btn-nav");

const closeCart =
document.querySelector(".close-cart");

const cartItemsContainer =
document.querySelector(".cart-items");

const totalText =
document.querySelector(".cart-footer h3");

const productModal =
document.querySelector(".product-modal");

const closeModal =
document.querySelector(".close-modal");

const modalImg =
document.querySelector(".modal-img");

const modalTitle =
document.querySelector(".modal-title");

const modalWeight =
document.querySelector(".modal-weight");

const modalPrice =
document.querySelector(".modal-price");

const searchInput =
document.getElementById("search-input");

const products =
document.querySelectorAll(".product-card");


/* =========================
   VARIABLES
========================= */

let totalItems = 0;

let totalPrice = 0;


/* =========================
   OPEN CART
========================= */

cartButton.addEventListener("click", ()=>{

    cartSidebar.classList.toggle("active");

});


/* =========================
   OPEN STICKY CART
========================= */

stickyCart.addEventListener("click", ()=>{

    cartSidebar.classList.add("active");

});


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener("click", ()=>{

    cartSidebar.classList.remove("active");

});


/* =========================
   ADD TO CART
========================= */

addButtons.forEach((button)=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        const productCard =
        button.closest(".product-card");

        const productName =
        productCard.querySelector("h3").innerText;

        const productPriceText =
        productCard.querySelector(".price").innerText;

        const productPrice =
        parseInt(
            productPriceText.replace("₹","")
        );

        /* IF ALREADY ADDED */

        if(button.classList.contains("added")){

            return;

        }

        button.classList.add("added");

        /* TOTAL */

        totalItems++;

        totalPrice += productPrice;

        updateStickyCart();
        

        totalText.innerText =
        `Total: ₹${totalPrice}`;

        /* CREATE CART ITEM */

        const cartItem =
        document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `

            <div>

                <h4>${productName}</h4>

                <p class="cart-price">
                    ₹${productPrice}
                </p>

            </div>

            <div class="cart-quantity">

                <button class="minus-btn">
                    -
                </button>

                <span class="quantity">
                    1
                </span>

                <button class="plus-btn">
                    +
                </button>

            </div>

        `;

        cartItemsContainer
        .appendChild(cartItem);

        /* CHANGE BUTTON */

        button.innerHTML = `

            <div class="quantity-controls">

                <button class="minus-card">
                    -
                </button>

                <span class="count">
                    1
                </span>

                <button class="plus-card">
                    +
                </button>

            </div>

        `;

        button.style.background =
        "#0c831f";

        button.style.color =
        "#ffffff";

        button.style.border =
        "none";

        /* CARD BUTTONS */

        const plusCard =
        button.querySelector(".plus-card");

        const minusCard =
        button.querySelector(".minus-card");

        const count =
        button.querySelector(".count");

        /* CART BUTTONS */

        const plusBtn =
        cartItem.querySelector(".plus-btn");

        const minusBtn =
        cartItem.querySelector(".minus-btn");

        const quantityText =
        cartItem.querySelector(".quantity");

        const cartPrice =
        cartItem.querySelector(".cart-price");

        let quantity = 1;

        /* UPDATE UI FUNCTION */

        function updateItem(){

            count.innerText = quantity;

            quantityText.innerText = quantity;

            cartPrice.innerText =
            `₹${productPrice * quantity}`;

            totalText.innerText =
            `Total: ₹${totalPrice}`;

            stickyText.innerText =
            `${totalItems} item added`;

            stickyPrice.innerText =
            `₹${totalPrice}`;

        }

        /* PLUS CARD */

        plusCard.addEventListener("click",(e)=>{

            e.stopPropagation();

            quantity++;

            totalPrice += productPrice;

            totalItems++;

            updateItem();

        });

        /* MINUS CARD */

        minusCard.addEventListener("click",(e)=>{

            e.stopPropagation();

            quantity--;

            totalPrice -= productPrice;

            totalItems--;

            if(quantity <= 0){

                cartItem.remove();

                button.innerHTML = "ADD";

                button.classList.remove("added");

                button.style.background =
                "#ffffff";

                button.style.color =
                "#0c831f";

                button.style.border =
                "1px solid #0c831f";

            }
            else{

                updateItem();

            }

            updateStickyCart();
            

        });

        /* PLUS CART */

        plusBtn.addEventListener("click", ()=>{

            quantity++;

            totalPrice += productPrice;

            totalItems++;

            updateItem();

        });

        /* MINUS CART */

        minusBtn.addEventListener("click", ()=>{

            quantity--;

            totalPrice -= productPrice;

            totalItems--;

            if(quantity <= 0){

                cartItem.remove();

                button.innerHTML = "ADD";

                button.classList.remove("added");

                button.style.background =
                "#ffffff";

                button.style.color =
                "#0c831f";

                button.style.border =
                "1px solid #0c831f";

            }
            else{

                updateItem();

            }

            updateStickyCart();
        

            

        });

    });

});


/* =========================
   UPDATE STICKY CART
========================= */

function updateStickyCart(){

    if(totalItems <= 0){

        stickyCart.classList.remove("active");

        cartSidebar.classList.remove("active");

        totalText.innerText = "Total: ₹0";

        return;
    }

    stickyCart.classList.add("active");

    stickyText.innerText =
    `${totalItems} item added`;

    stickyPrice.innerText =
    `₹${totalPrice}`;

    /* AUTO HIDE AFTER 3 SECONDS */

    clearTimeout(window.stickyTimeout);

    window.stickyTimeout = setTimeout(()=>{

        stickyCart.classList.remove("active");

    },3000);

}


/* =========================
   PRODUCT MODAL
========================= */

document
.querySelectorAll(".product-card")
.forEach((card)=>{

    card.addEventListener("click",(e)=>{

        if(
            e.target.closest(".add-btn")
        ){
            return;
        }

        const image =
        card.querySelector("img").src;

        const title =
        card.querySelector("h3").innerText;

        const weight =
        card.querySelector(".weight").innerText;

        const price =
        card.querySelector(".price").innerText;

        modalImg.src = image;

        modalTitle.innerText = title;

        modalWeight.innerText = weight;

        modalPrice.innerText = price;

        productModal.classList.add("active");

    });

});


/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener("click", ()=>{

    productModal.classList.remove("active");

});


/* =========================
   SEARCH PRODUCTS
========================= */

searchInput.addEventListener("keyup", ()=>{

    const searchValue =
    searchInput.value.toLowerCase();

    products.forEach((product)=>{

        const productName =
        product.querySelector("h3")
        .innerText
        .toLowerCase();

        if(
            productName.includes(searchValue)
        ){

            product.style.display =
            "block";

        }
        else{

            product.style.display =
            "none";

        }

    });

});

/* OFFER SLIDER */

/* =========================
   OFFER SLIDER
========================= */

const slides =
document.querySelectorAll(".slide");

let currentSlide = 0;

setInterval(()=>{

    slides[currentSlide]
    .classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;
    }

    slides[currentSlide]
    .classList.add("active");

},3000);




