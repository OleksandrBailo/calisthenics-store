let bag = JSON.parse(localStorage.getItem('bag')) || [];

window.addEventListener('load', () => {
    showProductsBag(bag);
});

let logo = document.querySelector('.logo')
logo.addEventListener("click", () => {
    window.location.href = '/index.html';
});

let emptyBagButton = document.querySelector(".emptyBagButton");
emptyBagButton.addEventListener("click", () => {
    window.location.href = '/index.html';
});
let emptyBag = document.querySelector(".emptyBag");

function showProductsBag(whatToShow) {
    emptyBag.style.display = "none";
    let products = document.querySelector('.products');
    let countItemsDisplay = document.querySelector('.items-count');
    let countItemsOrder = document.querySelector('.inSubtotal span');
    products.innerHTML = '';
    let CountItems = 0;
    
    updateBagWithLocalStorage();

    whatToShow.forEach(tovar => {
        CountItems += tovar.howManyWantBuy;

        let product = document.createElement('div');
        product.setAttribute('data-id', tovar.id);
        product.classList.add('product');
        products.appendChild(product);
        product.innerHTML = `
        <div class="img"><img src=${tovar.img} alt=""></div>
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
                        <div class="arrow"><img class="arrow-img" src="/imgs/arrows-down.png" alt=""></div>
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
            let index = bag.findIndex(item => item.id == tovar.id);
            if (index !== -1) {
                bag.splice(index, 1);
                localStorage.setItem('bag', JSON.stringify(bag));
                showProductsBag(bag);
            }
        });
    });

    countItemsDisplay.textContent = `(${CountItems} Items)`;
    countItemsOrder.textContent = CountItems;
    if (CountItems == 0)
        emptyBag.style.display = "block";
    totalPrice();
    initDropdowns();
}

function updateBagWithLocalStorage() {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Оновлюємо кожен товар у кошику (bag)
    bag = bag.filter(item => {
        // Перевіряємо чи є товар у локальному сховищі
        let productInStorage = products.find(product => product.id === item.id);
        
        if (!productInStorage) {
            return false; // Якщо товар більше не існує в localStorage, то видаляємо його з кошика
        }

        // Оновлюємо товар у кошику, якщо були зміни в кількості або інших даних
        item.prise = productInStorage.prise;
        item.count = productInStorage.count;
        item.category = productInStorage.category;
        item.img = productInStorage.img;
        item.nazva = productInStorage.nazva;


        // Якщо кількість товару змінилася, оновлюємо
        if (productInStorage.count < item.howManyWantBuy) {
            item.howManyWantBuy = productInStorage.count;
        }

        return true;
    });

    localStorage.setItem('bag', JSON.stringify(bag));
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

                totalPrice()

                dropdownMenu.classList.remove("active");
                arrow.style.transform = "rotate(0deg)";
                button.style.borderRadius = "4px";
            });
        });
    });
}

let payment = document.getElementById("btnpayment");
payment.addEventListener("click", () => {
    let tovars = JSON.parse(localStorage.getItem('products')) || [];
    let bag = JSON.parse(localStorage.getItem('bag')) || [];

    bag.forEach(item => {
        let productIndex = tovars.findIndex(product => product.id === item.id);
        if (productIndex !== -1) {
            tovars[productIndex].count -= item.howManyWantBuy;

            if (tovars[productIndex].count <= 0) {
                tovars.splice(productIndex, 1);
            }
        }
    });
    bag = [];

    localStorage.setItem('products', JSON.stringify(tovars));
    localStorage.removeItem('bag');
    
    alert("Оплата успішна! Ваше замовлення обробляється.");
    showProductsBag(bag);
});