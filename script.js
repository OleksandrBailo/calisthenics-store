window.addEventListener('load', () => {
    updateCartQuantity();
});

let tovars = [
    {
        id: "0",
        img: "/imgs/product-shot-wooden-parallettes-extended-2_91945174-2e6b-43e3-b101-1cf692ed68c2.webp",
        nazva: "Wooden Parallettes",
        category: "Equipment",
        count: 20,
        prise: 65,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/premium-parallettes-max-product-photo.webp",
        nazva: "Premium Parallettes Max",
        category: "Equipment",
        count: 10,
        prise: 131,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/gornation-metal-parallettes-1.webp",
        nazva: "Metal Parallettes",
        category: "Equipment",
        count: 15,
        prise: 109,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/calisthenics-mesh-shirt-black-front-view.webp",
        nazva: "Mesh Shirt Men",
        category: "Men",
        count: 20,
        prise: 33,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/shorts-taupe-front_53c4f31f-6a30-40c8-b235-d0823f30e7b4.webp",
        nazva: "Rib Shorts Women",
        category: "Women",
        count: 10,
        prise: 38,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/20kg-weight-vest-gornation-side-view_f594debd-77a0-4c6a-9266-132f70b26482.jpg",
        nazva: "Elite Weight Vest 20kg",
        category: "Equipment",
        count: 8,
        prise: 109,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/jump-rope-gornation-1.webp",
        nazva: "Jump Rope",
        category: "Accessories",
        count: 16,
        prise: 22,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/gornation-liquid-chalk-200ml.webp",
        nazva: "Premium Liquid Chalk",
        category: "Accessories",
        count: 29,
        prise: 17,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/Performance-Wrist-Wraps-GORNATION-34941417-34941499-34941478.webp",
        nazva: "Performance Wrist Wraps",
        category: "Accessories",
        count: 21,
        prise: 21,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/baselayer-white-front-dynamic.webp",
        nazva: "Performance Baselayer Men",
        category: "Men",
        count: 12,
        prise: 31,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/bra-white-front.webp",
        nazva: "Rib Sports Bra Women",
        category: "Women",
        count: 12,
        prise: 44,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/pull-up-bar-multi-4.webp",
        nazva: "Pull Up Bar Multi",
        category: "Equipment",
        count: 16,
        prise: 87,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/1-gornation-static-bar.webp",
        nazva: "Static Bar",
        category: "Equipment",
        count: 10,
        prise: 163,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/abwheel-1.webp",
        nazva: "Ab Wheel",
        category: "Equipment",
        count: 24,
        prise: 22,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/Workout-Grips-Leather-GORNATION-34966769-34966795-34966785.webp",
        nazva: "Workout Grips Leather",
        category: "Accessories",
        count: 22,
        prise: 28,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/softgriptape_bec474ac-621c-4089-93bd-abcdc45da81b.webp",
        nazva: "Soft Grip Tape",
        category: "Accessories",
        count: 36,
        prise: 11,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/Performance-Baselayer-Black-2.webp",
        nazva: "Performance Baselayer Men",
        category: "Men",
        count: 16,
        prise: 31,
        howManyWantBuy: 0
    },
    {
        id: "0",
        img: "/imgs/calisthenics-mesh-shirt-black-front-view-woman.webp",
        nazva: "Mesh Shirt Women",
        category: "Women",
        count: 12,
        prise: 33,
        howManyWantBuy: 0
    }
]

let bag = [];

tovars.forEach(tovar => {
    tovar.id = generateRandomString(10);
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

if (localStorage.getItem('products') == undefined)
    localStorage.setItem('products', JSON.stringify(tovars));
else
    tovars = JSON.parse(localStorage.getItem('products'));


showProducts(tovars);
function showProducts(whatToShow) {
    let products = document.querySelector('.products');
    let countItemsDisplay = document.querySelector('.items-count');
    let CountItems = 0;
    whatToShow.forEach(tovar => {
        CountItems += 1;
        let product = document.createElement('div');
        product.classList.add('product')
        products.appendChild(product);
        product.innerHTML = `
                <div class="img"><img src=${tovar.img} alt=""></div>
                <div class="addToBag"><img src="/imgs/Add to Bag.png" alt=""></div>
                <div class="nameProduct">${tovar.nazva}</div>
                <div class="countProduct">Amount: ${tovar.count}</div>
                <div class="priceProduct">$${tovar.prise}</div>
        `
        let addToBag = product.querySelector(".addToBag");
        addToBag.addEventListener("click", (event) => {
            event.stopPropagation();
            addToCart(tovar);
        });

        product.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(tovar));
            window.location.href = "/product/product.html";
        });
    });
    countItemsDisplay.textContent = `${CountItems} Items`
}

function addToCart(tovar) {
    bag = JSON.parse(localStorage.getItem('bag')) || [];
        
    const existingItemIndex = bag.findIndex(item => item.id === tovar.id);

    if (existingItemIndex !== -1) {
        if (bag[existingItemIndex].howManyWantBuy + 1 <= tovar.count) {
            bag[existingItemIndex].howManyWantBuy++;
            tovar.howManyWantBuy++;
        } else if (bag[existingItemIndex].howManyWantBuy == tovar.count) {
            alert("Більше товарів не можна додати, такої кількості немає в наявності!");
        }
    } else {
        if (tovar.howManyWantBuy + 1 <= tovar.count) {
            tovar.howManyWantBuy = 1;
            bag.push({ ...tovar });
        } else {
            alert("Товар уже закінчився!");
        }
    }

    localStorage.setItem('bag', JSON.stringify(bag));
    localStorage.setItem('products', JSON.stringify(tovars));

    updateCartQuantity();
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


let searchInput = document.getElementById('searchInput');

// Налаштування Fuse.js
let options = {
    keys: ['nazva'], // Поле, за яким буде виконуватись пошук
    threshold: 0.4,  // Чутливість до неточностей
    includeScore: true, // Додає рейтинг збігу до результатів (опціонально)
};

let fuse = new Fuse(tovars, options);

searchInput.addEventListener('input', () => {
    let searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm != "") {

        let words = searchTerm.split(" ");

        // Масив для збереження результатів
        let combinedResults = [];

        // Перевірка кожного слова
        words.forEach(word => {
            let results = fuse.search(word);
            combinedResults = [...combinedResults, ...results];
        });

        // Унікальні результати без дублювання
        let filteredTovars = [...new Map(combinedResults.map(result => [result.item, result])).values()]
            .map(result => result.item);

        // Оновлення відображення
        let products = document.querySelector('.products');
        products.innerHTML = '';
        showProducts(filteredTovars);
    }
    else {
        let products = document.querySelector('.products');
        products.innerHTML = '';
        showProducts(tovars);
    }
});


let dropdownButton = document.querySelector(".dropdown-button");
let dropdownMenu = document.querySelector(".dropdown-menu");
let selectedOption = document.querySelector(".selected-option");
let arrow = document.querySelector('.arrow-img');
let dropdownItems = document.querySelectorAll(".dropdown-menu .dropdown-item")

// Відкривання/закривання меню
dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
    if (dropdownMenu.classList.contains("active")) {
        arrow.style.transform = "rotate(-180deg)";
        dropdownButton.style = "border-radius: 4px 4px 0px 0px;"
    } else {
        arrow.style.transform = "rotate(0deg)";
        dropdownButton.style = "border-radius: 4px;"
    }
});

// Закривання меню при кліку поза ним
document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("active");
        arrow.style.transform = "rotate(0deg)";
        dropdownButton.style = "border-radius: 4px;"
    }
});

dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        dropdownItems.forEach((el) => {
            el.classList.remove("selectedItem");
        });
        event.target.classList.add("selectedItem");

        selectedOption.textContent = event.target.textContent;
        selectedOption.style.color = "#000"
        dropdownMenu.classList.remove("active");
        arrow.style.transform = "rotate(0deg)";
        dropdownButton.style = "border-radius: 4px;"

        let tovarsWhatSee = document.querySelectorAll('.product');
        let tovarsWhatSeeArray = Array.from(tovarsWhatSee);
        let isPriceLowHigh = event.target.textContent == "Price (Low - High)";
        let isPriceHighLow = event.target.textContent == "Price (High - Low)";

        if (isPriceLowHigh || isPriceHighLow) {
            tovarsWhatSeeArray.sort((a, b) => {
                let priceA = parseFloat(a.querySelector('.priceProduct').textContent.replace('$', ''));
                let priceB = parseFloat(b.querySelector('.priceProduct').textContent.replace('$', ''));

                if (isPriceLowHigh) {
                    return priceA - priceB;
                }
                else if (isPriceHighLow) {
                    return priceB - priceA;
                }
            });
            let products = document.querySelector('.products');
            products.innerHTML = '';
            tovarsWhatSeeArray.forEach(product => products.appendChild(product));
        }
    });
});

// По категоріям
let logo = document.querySelector('.logo')
let navItems = document.querySelectorAll('.navItem')

function Sort(array) {
    let isPriceLowHigh = selectedOption.textContent == "Price (Low - High)";
    let isPriceHighLow = selectedOption.textContent == "Price (High - Low)";

    if (isPriceLowHigh || isPriceHighLow) {
        array.sort((a, b) => {
            if (isPriceLowHigh) {
                return a.prise - b.prise;
            } else if (isPriceHighLow) {
                return b.prise - a.prise;
            }
            return 0;
        });
    }
}

logo.addEventListener("click", () => {
    location.reload()
});

navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        let selectedCategory = event.target.textContent.trim();
        let filteredTovars = tovars.filter(tovar => tovar.category == selectedCategory);

        Sort(filteredTovars);

        let products = document.querySelector('.products');
        products.innerHTML = '';
        showProducts(filteredTovars);
    });
});

