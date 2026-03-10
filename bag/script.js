let bag = JSON.parse(localStorage.getItem('bag')) || [];

window.addEventListener('load', () => {
    showProductsBag(bag);
    renderHistory();
});

let logo = document.querySelector('.logo')
logo.addEventListener("click", () => {
    window.location.href = '../index.html';
});

let emptyBagButton = document.querySelector(".emptyBagButton");
emptyBagButton.addEventListener("click", () => {
    window.location.href = '../index.html';
});
let emptyBag = document.querySelector(".emptyBag");
let confirmationModal = document.getElementById("confirmationModal");
let currentProductToRemove;

function showProductsBag(whatToShow) {
    emptyBag.style.display = "none";
    let products = document.querySelector('.products');
    let countItemsDisplay = document.querySelector('.items-count');
    let countItemsOrder = document.querySelector('.inSubtotal span');
    products.innerHTML = '';
    let CountItems = 0;
    
    updateCartQuantity();

    whatToShow.forEach(tovar => {
        CountItems += tovar.howManyWantBuy;

        let product = document.createElement('div');
        product.setAttribute('data-id', tovar.id);
        product.classList.add('product');
        products.appendChild(product);
        let imgSrc = tovar.img.startsWith('data:') ? tovar.img : '../' + tovar.img;
        product.innerHTML = `
        <div class="img"><img src=${imgSrc} alt=""></div>
        <div class="detail">
            <div class="topDetail">
                <div class="namePrice">
                    <div class="nameProduct">${tovar.nazva}</div>
                    <div class="priceProduct">$${tovar.prise} x <span>${tovar.howManyWantBuy}</span></div>
                </div>
                <div class="countProduct">Amount: <span>${tovar.count}</span></div>
            </div>
            <div class="bottomDetail">
                <div class="dropdown">
                    <button class="dropdown-button">
                        <span class="selected-option">${tovar.howManyWantBuy}</span>
                        <div class="arrow"><img class="arrow-img" src="../imgs/IconsAndLogo/arrows-down.png" alt=""></div>
                    </button>
                    <ul class="dropdown-menu">
                    </ul>
                </div>
                <div class="remove">Remove</div>
            </div>
        </div>
        `;
        
        let dropdownMenu = product.querySelector(".dropdown-menu");

        for (let i = 1; i <= tovar.count; i++) {
            let dropdownItem = document.createElement('li');
            dropdownItem.classList.add('dropdown-item');
            if (i == tovar.howManyWantBuy)
                dropdownItem.classList.add("selectedItem");
            dropdownMenu.appendChild(dropdownItem);
            dropdownItem.textContent = i;
        }

        let btnRemove = product.querySelector(".remove");

        btnRemove.addEventListener("click", () => {
            currentProductToRemove = tovar;
            confirmationModal.style.display = "block";
        });

        let productImg = product.querySelector("img")
        productImg.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(tovar));
            window.location.href = "../product/product.html";
        });
    });

    countItemsDisplay.textContent = `(${CountItems} Items)`;
    countItemsOrder.textContent = CountItems;
    if (CountItems == 0)
        emptyBag.style.display = "block";
    totalPrice();
    initDropdowns();
}

function updateCartQuantity() {
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    
    let qntInBag = document.querySelector('.qntInBag span');
    let totalQuantity = bag.reduce((total, item) => total + item.howManyWantBuy, 0);
    
    if (totalQuantity > 0) {
        qntInBag.textContent = totalQuantity;
        document.querySelector('.qntInBag').style.display = 'flex';
    } else {
        document.querySelector('.qntInBag').style.display = 'none';
    }
}

function totalPrice() {
    let subtotalPrice = document.querySelector(".subtotalPrice span");
    let price = 0;
    bag.forEach((tovar) => {
        let productPrice = parseInt(tovar.prise);
        let quantity = parseInt(tovar.howManyWantBuy);

        if (!isNaN(productPrice) && !isNaN(quantity)) {
            price += productPrice * quantity;
        } else {
            console.warn("Невірні дані для ціни або кількості", tovar);
        }
    });
    subtotalPrice.textContent = price;
    
    let estimatedOrderPrice = document.querySelector(".estimatedOrderPrice span");
    let shipping = document.querySelector(".estimatedShippingPrice span");
    let totalPrice = 0;
    totalPrice += price;
    let shippingPrice = parseInt(shipping.textContent);
    if (shipping.textContent != 'Free' || !isNaN(shippingPrice))
        totalPrice += shippingPrice;

    estimatedOrderPrice.textContent = totalPrice;
}

function initDropdowns() {
    let dropdownButtons = document.querySelectorAll(".dropdown-button");
    let dropdownMenus = document.querySelectorAll(".dropdown-menu");

    dropdownButtons.forEach((button, index) => {
        let dropdownMenu = dropdownMenus[index];
        let selectedOption = button.querySelector(".selected-option");
        let arrow = button.querySelector(".arrow-img");
        let productElement = button.closest('.product');
        let spanPriceProduct = productElement.querySelector('.priceProduct span');

        button.addEventListener("click", () => {
            dropdownMenu.classList.toggle("active");
            if (dropdownMenu.classList.contains("active")) {
                let selectedItem = dropdownMenu.querySelector(".selectedItem");
                if (selectedItem) {
                    dropdownMenu.scrollTop = selectedItem.offsetTop - dropdownMenu.offsetTop;
                }
                arrow.style.transform = "rotate(-180deg)";
                button.style.borderRadius = "4px 4px 0px 0px";
            } else {
                arrow.style.transform = "rotate(0deg)";
                button.style.borderRadius = "4px";
            }
        });

        window.addEventListener("click", (event) => {
            if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("active");
                arrow.style.transform = "rotate(0deg)";
                button.style.borderRadius = "4px";
            }
        });

        let countItemsDisplay = document.querySelector('.items-count');
        let countItemsOrder = document.querySelector('.inSubtotal span')
        let dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
            item.addEventListener("click", (event) => {
                dropdownItems.forEach((el) => el.classList.remove("selectedItem"));
                event.target.classList.add("selectedItem");

                selectedOption.textContent = event.target.textContent;

                const existingItemIndex = bag.findIndex(item => item.id === productElement.dataset.id);
                if (existingItemIndex !== -1) {
                    bag[existingItemIndex].howManyWantBuy = parseInt(event.target.textContent);
                    localStorage.setItem('bag', JSON.stringify(bag));
                }

                let CountItems = 0;
                bag.forEach((tovar) => {
                    CountItems += tovar.howManyWantBuy;
                });
                countItemsDisplay.textContent = `(${CountItems} Items)`;
                countItemsOrder.textContent = CountItems;

                spanPriceProduct.textContent = event.target.textContent;

                updateCartQuantity()
                totalPrice()

                dropdownMenu.classList.remove("active");
                arrow.style.transform = "rotate(0deg)";
                button.style.borderRadius = "4px";
            });
        });
    });
}


let closeButton = document.getElementById("closeButton")
let confirmButton = document.getElementById("confirmButton");
let cancelButton = document.getElementById("cancelButton");

closeButton.addEventListener("click", ()=> {
    confirmationModal.style.display = "none";
});
window.addEventListener("click", (event) => {
    if (event.target === confirmationModal) {
        confirmationModal.style.display = "none";
    }
});

confirmButton.addEventListener("click", ()=> {
    if (currentProductToRemove)
    {
        let index = bag.findIndex(item => item.id == currentProductToRemove.id);
        if (index !== -1) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            let productIndex = products.findIndex(product => product.id === currentProductToRemove.id);
            if (productIndex !== -1) {
                products[productIndex].howManyWantBuy = 0;
                localStorage.setItem('products', JSON.stringify(products));
            }
    
            bag.splice(index, 1);
            localStorage.setItem('bag', JSON.stringify(bag));
            showProductsBag(bag);
        }
    }
    confirmationModal.style.display = "none";
});

cancelButton.addEventListener("click", ()=> {
    confirmationModal.style.display = "none";
});

let payment = document.getElementById("btnpayment");
payment.addEventListener("click", () => {
    let tovars = JSON.parse(localStorage.getItem('products')) || [];
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    let history = JSON.parse(localStorage.getItem('history')) || []; // Історія покупок

    if (bag.length === 0) {
        alert("Your bag is empty! Please add items to your bag before proceeding to payment.");
        return;
    }
    
    let purchase = {
        date: new Date().toLocaleString(),
        items: bag.map(item => ({
            id: item.id,
            nazva: item.nazva,
            img: item.img,
            prise: item.prise,
            howManyWantBuy: item.howManyWantBuy,
        })),
    };

    history.push(purchase);
    localStorage.setItem('history', JSON.stringify(history));

    bag.forEach(item => {
        let productIndex = tovars.findIndex(product => product.id === item.id);
        if (productIndex !== -1) {
            tovars[productIndex].count -= item.howManyWantBuy;

            tovars[productIndex].howManyWantBuy = 0;

            if (tovars[productIndex].count <= 0) {
                tovars.splice(productIndex, 1);
            }
        }
    });

    bag = [];
    localStorage.setItem('products', JSON.stringify(tovars));
    localStorage.removeItem('bag');

    alert("Оплата успішна! Ваше замовлення обробляється.");

    showProductsBag(bag); // Оновлюємо відображення кошика
    renderHistory(); // Відображаємо оновлену історію
});


function renderHistory() {
    let historyContainer = document.querySelector(".historyPayment");
    let history = JSON.parse(localStorage.getItem('history')) || [];
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No purchase history available.</p>";
        return;
    }

    history.forEach((purchase, index) => {
        let totalOrderPrice = purchase.items.reduce((total, item) => {
            return total + item.prise * item.howManyWantBuy;
        }, 0);

        let historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div class="history-date">Purchase #${index + 1} - ${purchase.date} | Total Price: $${totalOrderPrice.toFixed(2)}</div>
            <div class="history-products">
                ${purchase.items.map(item => `
                    <div class="history-product">
                        <div class="img"><img class="history-img" src=${item.img.startsWith('data:') ? item.img : '../' + item.img} alt="${item.nazva}" ></div>
                        <div class="history-details">
                            <div class="historyNamePrice">
                                <div class="history-name">${item.nazva}</div>
                                <div class="history-price">$${item.prise} x <span>${item.howManyWantBuy}</span></div>
                            </div>
                            <div class="history-quantity">Quantity: ${item.howManyWantBuy}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}