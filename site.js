document.addEventListener('DOMContentLoaded', function() {

    let cartTotal = 0;
    let cartCount = 0;

    function updateCartDisplay() {
        const countEl = document.getElementById('cart-count');
        const totalEl = document.getElementById('cart-total');
        if (countEl && totalEl) {
            countEl.textContent = cartCount;
            totalEl.textContent = cartTotal;
        }
    }

    document.addEventListener('click', function(e) {
        if (e.target && e.target.textContent.includes('В корзину')) {
            e.preventDefault();

            const card = e.target.closest('.card');
            if (!card) return;

            const priceText = card.querySelector('.text-danger').textContent;
            const price = parseInt(priceText.replace(/\D/g, '')); 

            cartTotal += price;
            cartCount += 1;
            updateCartDisplay();

            Swal.fire({
                icon: 'success',
                title: 'Добавлено в корзину!',
                text: `Блюдо добавлено. Сумма: ${cartTotal} ₽`,
                confirmButtonColor: '#ffc107',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('review-name').value;
            const text = document.getElementById('review-text').value;

            if (!name || !text) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Заполните все поля.', confirmButtonColor: '#e94560' });
                return;
            }

            const reviewsList = document.getElementById('reviews-list');
            if (reviewsList) {
                const newReview = document.createElement('div');
                newReview.className = 'mb-3 p-3';
                newReview.style.backgroundColor = '#0f0f1a';
                newReview.style.borderRadius = '8px';
                newReview.innerHTML = `<strong class="text-warning">${name}</strong> <small class="text-muted ml-2">Только что</small><p class="mb-0 mt-2">${text}</p>`;
                reviewsList.prepend(newReview);
            }
            this.reset();
            Swal.fire({ icon: 'success', title: 'Спасибо за отзыв!', text: 'Ваше мнение очень важно для нас.', confirmButtonColor: '#ffc107' });
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            Swal.fire({ icon: 'success', title: 'Заказ оформлен!', text: 'Курьер уже выехал к вам.', confirmButtonColor: '#ffc107' }).then(() => {
                this.reset();
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('fa-trash')) {
            e.preventDefault();
            const row = e.target.closest('tr');
            Swal.fire({
                title: 'Удалить блюдо?',
                text: "Вы уверены?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e94560',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Да, удалить',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                if (result.isConfirmed) {
                    row.remove();
                    Swal.fire('Удалено!', 'Блюдо удалено из меню.', 'success');
                }
            });
        }
    });
});