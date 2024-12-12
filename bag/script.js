let bag = JSON.parse(localStorage.getItem('bag')) || [];


let logo = document.querySelector('.logo')
logo.addEventListener("click", () => {
    window.location.href = '/index.html';
});

let emptyBagButton = document.querySelector(".emptyBagButton");
emptyBagButton.addEventListener("click", () => {
    window.location.href = '/index.html';
});
let emptyBag = document.querySelector(".emptyBag");

showProductsBag(bag);
function showProductsBag(whatToShow) {
    emptyBag.style.display = "none";
    let products = document.querySelector('.products');
    let countItemsDisplay = document.querySelector('.items-count');
    let countItemsOrder = document.querySelector('.inSubtotal span')
    products.innerHTML = '';
    let CountItems = 0;
    whatToShow.forEach(tovar => {
        CountItems += tovar.howManyWantBuy;

        // Підрахунок скільки разів цей товар є в масиві bag
        let howmany = bag.filter(item => item.id == tovar.id).length; // використовуємо filter для підрахунку

        console.log(howmany); // Виведемо кількість однакових товарів

        let product = document.createElement('div');
        product.setAttribute('data-id', tovar.id)
        product.classList.add('product')
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
        `
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
            }
            showProductsBag(bag);
        });
    });
    countItemsDisplay.textContent = `(${CountItems} Items)`
    countItemsOrder.textContent = CountItems;
    if (CountItems == 0)
        emptyBag.style.display = "block";
    initDropdowns();
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

                dropdownMenu.classList.remove("active");
                arrow.style.transform = "rotate(0deg)";
                button.style.borderRadius = "4px";
            });
        });
    });
}

