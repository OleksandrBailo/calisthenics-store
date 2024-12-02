let tovar1 = {
    img: "/imgs/product-shot-wooden-parallettes-extended-2_91945174-2e6b-43e3-b101-1cf692ed68c2.webp",
    nazva: "Wooden Parallettes",
    count: 20,
    prise: 65
}
let tovar2 = {
    img: "/imgs/premium-parallettes-max-product-photo.webp",
    nazva: "Premium Parallettes Max",
    count: 10,
    prise: 131
}

let tovars = [
    tovar1,
    tovar2,
    {
        img: "/imgs/gornation-metal-parallettes-1.webp",
        nazva: "Metal Parallettes",
        count: 15,
        prise: 109
    }
]
showProducts()
function showProducts() {
    let products = document.querySelector('.products');
    tovars.forEach(tovar => {
        let product = document.createElement('div');
        product.classList.add('product')
        products.appendChild(product);
        product.innerHTML = `
                <div class="img"><img src=${tovar.img} alt=""></div>
                <div class="nameProduct">${tovar.nazva}</div>
                <div class="countProduct">Amount: ${tovar.count}</div>
                <div class="priceProduct">$${tovar.prise}</div>
        `
    });
}