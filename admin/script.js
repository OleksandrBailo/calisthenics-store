let tovar1 = {
    id: "0",
    img: "/imgs/product-shot-wooden-parallettes-extended-2_91945174-2e6b-43e3-b101-1cf692ed68c2.webp",
    nazva: "Wooden Parallettes",
    category: "Equipment",
    count: 20,
    prise: 65
}
let tovar2 = {
    id: "0",
    img: "/imgs/premium-parallettes-max-product-photo.webp",
    nazva: "Premium Parallettes Max",
    category: "Equipment",
    count: 10,
    prise: 131
}

let tovars = [
    tovar1,
    tovar2,
    {
        id: "0",
        img: "/imgs/gornation-metal-parallettes-1.webp",
        nazva: "Metal Parallettes",
        category: "Equipment",
        count: 15,
        prise: 109
    },
    {
        id: "0",
        img: "/imgs/calisthenics-mesh-shirt-black-front-view.webp",
        nazva: "Mesh Shirt Men",
        category: "Men",
        count: 20,
        prise: 33
    },
    {
        id: "0",
        img: "/imgs/shorts-taupe-front_53c4f31f-6a30-40c8-b235-d0823f30e7b4.webp",
        nazva: "Rib Shorts Women",
        category: "Women",
        count: 10,
        prise: 38
    },
    {
        id: "0",
        img: "/imgs/20kg-weight-vest-gornation-side-view_f594debd-77a0-4c6a-9266-132f70b26482.jpg",
        nazva: "Elite Weight Vest 20kg",
        category: "Equipment",
        count: 8,
        prise: 109
    },
    {
        id: "0",
        img: "/imgs/jump-rope-gornation-1.webp",
        nazva: "Jump Rope",
        category: "Accessories",
        count: 16,
        prise: 22
    },
    {
        id: "0",
        img: "/imgs/gornation-liquid-chalk-200ml.webp",
        nazva: "Premium Liquid Chalk",
        category: "Accessories",
        count: 29,
        prise: 17
    },
    {
        id: "0",
        img: "/imgs/Performance-Wrist-Wraps-GORNATION-34941417-34941499-34941478.webp",
        nazva: "Performance Wrist Wraps",
        category: "Accessories",
        count: 21,
        prise: 21
    },
    {
        id: "0",
        img: "/imgs/baselayer-white-front-dynamic.webp",
        nazva: "Performance Baselayer Men",
        category: "Men",
        count: 12,
        prise: 31
    },
    {
        id: "0",
        img: "/imgs/bra-white-front.webp",
        nazva: "Rib Sports Bra Women",
        category: "Women",
        count: 12,
        prise: 44
    }
]

tovars.forEach(tovar => {
    tovar.id = generateRandomString(20);
});

if (localStorage.getItem('products') == undefined)
    localStorage.setItem('products', JSON.stringify(tovars));
else
    tovars = JSON.parse(localStorage.getItem('products'));



showProductsAdmin(tovars);
function showProductsAdmin(whatToShow) {
    let products = document.querySelector('.products');
    tovars = JSON.parse(localStorage.getItem('products'));
    products.innerHTML = "";
    let countItemsDisplay = document.querySelector('.items-count');
    let CountItems = 0;
    whatToShow.forEach(tovar => {
        CountItems += 1;
        let product = document.createElement('tr');
        product.classList.add('product')
        products.appendChild(product);
        product.innerHTML = `
            <td>${tovar.id}</td>
            <td>${tovar.category}</td>
            <td class="img"><img src=${tovar.img}></td>
            <td class="nameProduct">${tovar.nazva}</td>
            <td class="priceProduct">$${tovar.prise}</td>
            <td class="countProduct">${tovar.count}</td>
            <td class="action-buttons">
                <input class="edit" type="button" value="Редагувати">
                <input class="delete" type="button" value="Видалити">
            </td>
        `
        let btnDelete = product.querySelector('.delete');
        btnDelete.addEventListener('click', () => {
            let index = tovars.findIndex(item => item.id == tovar.id);
            if (index !== -1) {
                tovars.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(tovars));
                showProductsAdmin(tovars);
            }
        });

        let btnEdit = product.querySelector('.edit');
        btnEdit.addEventListener('click', () => {

        });
    });
    countItemsDisplay.textContent = `${CountItems} Items`
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
        showProductsAdmin(filteredTovars);
    }
    else {
        let products = document.querySelector('.products');
        products.innerHTML = '';
        showProductsAdmin(tovars);
    }
});


let dropdownButton = document.querySelector(".dropdown-button");
let dropdownMenu = document.querySelector(".dropdown-menu");
let selectedOption = document.getElementById("selected-option");
let arrow = document.getElementById('arrowImg');
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
    // Sort(tovars);
    // dropdownItems.forEach((el) => {
    //     el.classList.remove("selectedItem");
    // });
    // selectedOption.textContent = "Choose";
    // selectedOption.style.color = "#333"

    // let products = document.querySelector('.products');
    // products.innerHTML = '';
    // showProducts(tovars);
    window.location.href = '/index.html';
});

navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        let selectedCategory = event.target.textContent.trim();
        let filteredTovars = tovars.filter(tovar => tovar.category == selectedCategory);

        Sort(filteredTovars);

        let products = document.querySelector('.products');
        products.innerHTML = '';
        showProductsAdmin(filteredTovars);
    });
});


const addButton = document.getElementById("addButton");
const modal = document.getElementById("AddModal");
const closeButton = document.getElementById("closeButton");
const form = document.querySelector('form');

addButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Закриття модального вікна при кліку поза ним
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
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

// Додавання нового товару
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const category = form['category'].value;
    const imgInput = document.getElementById('imgInput');
    const nazva = form['nazva'].value;
    const prise = form['prise'].value;
    const count = form['count'].value;

    // Перевіряємо, чи вибрано файл
    if (!imgInput.files.length) {
        alert('Будь ласка, виберіть зображення');
        return;
    }

    const file = imgInput.files[0];
    const reader = new FileReader();

    // Конвертуємо файл у base64
    reader.onload = function () {
        const newProduct = {
            id: generateRandomString(20),
            img: reader.result, // Збереження зображення у форматі base64
            nazva: nazva,
            category: category,
            count: count,
            prise: prise
        };

        tovars = JSON.parse(localStorage.getItem('products')) || [];
        tovars.push(newProduct);
        localStorage.setItem('products', JSON.stringify(tovars));

        showProductsAdmin(tovars);

        form.reset();
        modal.style.display = "none";
    };

    // Читання файлу як Data URL (base64)
    reader.readAsDataURL(file);
});