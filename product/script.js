let logo = document.querySelector('.logo')
logo.addEventListener("click", () => {
    window.location.href = '/index.html';
});
window.addEventListener('load', () => {
    updateCartQuantity();
});

// Отримуємо дані поточного товару
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
if (selectedProduct) {
    document.getElementById("productImage").src = selectedProduct.img;
    document.getElementById("productName").textContent = selectedProduct.nazva;
    document.getElementById("productPrice").textContent = selectedProduct.prise;
    document.getElementById("productAmount").textContent = selectedProduct.count;

    // Завантаження коментарів для цього товару
    loadComments(selectedProduct.id);
} else {
    alert("No product selected!");
    window.location.href = "/";
}

// Завантаження коментарів для товару
function loadComments(productId) {
    const commentsSection = document.getElementById('Reviews');
    commentsSection.innerHTML = ""; // Очищення попередніх коментарів

    const comments = JSON.parse(localStorage.getItem("productComments")) || {};
    const productComments = comments[productId] || [];

    productComments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsSection.appendChild(commentElement);
    });

    updateRatingSummary(productId);
}

// Створення HTML для коментаря
function createCommentElement(comment) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('Review');
    
    // Генеруємо HTML для рейтингу з активними та неактивними зірками
    const starsHtml = Array.from({ length: 5 }, (_, index) =>
        `<span class="${index < comment.rating ? 'active' : ''}">&#9733;</span>`
    ).join('');

    reviewDiv.innerHTML = `
        <div class="topOfReview">
            <div class="displayNameReview">${comment.displayName}</div>
            <div class="ratingReview">${starsHtml}</div>
            <div class="dateReview">${comment.date}</div>
        </div>
        <div class="titleReview">${comment.title}</div>
        <div class="textReview">${comment.text}</div>
    `;
    return reviewDiv;
}


// Збереження коментаря
function saveComment(productId, comment) {
    const comments = JSON.parse(localStorage.getItem("productComments")) || {};
    if (!comments[productId]) {
        comments[productId] = [];
    }
    comments[productId].push(comment);
    localStorage.setItem("productComments", JSON.stringify(comments));
}

// Обробка кнопки Submit
document.querySelector('.submit').addEventListener('click', () => {
    const rating = document.querySelectorAll('.rating-stars .active').length;
    const title = document.getElementById('review-title').value.trim();
    const text = document.getElementById('review').value.trim();
    const displayName = document.getElementById('display-name').value.trim();

    if (!rating || !title || !text || !displayName) {
        alert("Please fill out all fields.");
        return;
    }

    const newComment = {
        rating,
        title,
        text,
        displayName,
        date: new Date().toLocaleDateString()
    };

    saveComment(selectedProduct.id, newComment);

    // Додати новий коментар у DOM
    const commentsSection = document.getElementById('Reviews');
    const commentElement = createCommentElement(newComment);
    commentsSection.appendChild(commentElement);

    updateRatingSummary(selectedProduct.id)

    // Очистити форму та закрити модальне вікно
    document.getElementById('review-title').value = "";
    document.getElementById('review').value = "";
    document.getElementById('display-name').value = "";
    document.querySelectorAll('.rating-stars span').forEach(star => star.classList.remove('active'));
    modal.style.display = 'none';
});


// Функція для розрахунку середнього рейтингу
function calculateAverageRating(comments) {
    if (comments.length === 0) {
        return { averageRating: 0, totalRatings: 0 };
    }
    
    const totalRatings = comments.length;
    const sumRatings = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = (sumRatings / totalRatings).toFixed(1);
    
    return { averageRating, totalRatings };
}

// Оновлення загального рейтингу в DOM
function updateRatingSummary(productId) {
    const comments = JSON.parse(localStorage.getItem("productComments")) || {};
    const productComments = comments[productId] || [];
    
    const { averageRating, totalRatings } = calculateAverageRating(productComments);
    
    document.querySelector('.starsSummury').style.setProperty('--rating', averageRating);
    document.querySelector('.rating-valueSummury').textContent = `${averageRating} (${totalRatings})`;
}




const modal = document.getElementById('review-modal');
const openModalBtn = document.getElementById('writeReviews');
const closeModalBtn = document.getElementById('close-modal');
const cancelModalBtn = document.getElementById('cancel-modal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

cancelModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const stars = document.querySelectorAll('.rating-stars span');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
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