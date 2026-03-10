let logo = document.querySelector('.logo')
logo.addEventListener("click", () => {
    window.location.href = '../index.html';
});
window.addEventListener('load', () => {
    updateCartQuantity();
});
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


let history = JSON.parse(localStorage.getItem('history')) || [];
let productStats = {};

history.forEach(purchase => {
    purchase.items.forEach(item => {
        if (!productStats[item.nazva]) {
            productStats[item.nazva] = 0;
        }
        productStats[item.nazva] += item.howManyWantBuy;
    });
});

let productNames = Object.keys(productStats);
let productCounts = Object.values(productStats);

let ctx = document.getElementById('Chart').getContext('2d');
let currentChart;

function renderChart(type) {
    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: type,
        data: {
            labels: productNames,
            datasets: [{
                label: 'Sales',
                data: productCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 186)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Початковий графік (гістограма)
if (history.length === 0) {
    document.querySelector('.ChartBox').innerHTML = "<h2>No sales data yet!</h2>";
} else {
    renderChart('bar');
}

// Додаємо функціонал для кнопок
document.getElementById('lineChartBtn').addEventListener('click', () => renderChart('line'));
document.getElementById('barChartBtn').addEventListener('click', () => renderChart('bar'));
