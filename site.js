document.addEventListener('DOMContentLoaded', function() {

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function updateCartDisplay() {
        const cart = getCart();
        const totalSum = cart.reduce((sum, item) => sum + item.price, 0);
        document.querySelectorAll('.cart-total').forEach(el => {
            el.textContent = totalSum;
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target && e.target.textContent.includes('В корзину')) {
            e.preventDefault();
            
            const card = e.target.closest('.card');
            if (!card) return;

            const name = card.querySelector('.card-title').textContent;
            const priceText = card.querySelector('.text-danger').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));

            let cart = getCart();
            cart.push({ name: name, price: price });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            updateCartDisplay();

            Swal.fire({
                icon: 'success',
                title: 'Добавлено!',
                text: `Товар "${name}" добавлен в корзину.`,
                confirmButtonColor: '#ffc107',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        let cart = getCart();
        const totalEl = document.getElementById('total-price');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-muted">Ваша корзина пуста.</p>';
            totalEl.textContent = '0';
        } else {
            let total = 0;
            cartContainer.innerHTML = cart.map((item, index) => {
                total += item.price;
                return `
                <div class="col-12 mb-3">
                    <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
                        <h5 class="mb-0">${item.name}</h5>
                        <div>
                            <span class="text-danger font-weight-bold mr-4">${item.price} ₽</span>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i> Удалить
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');
            totalEl.textContent = total;
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    let cart = getCart();
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload(); 
                });
            });
        }
    }

    updateCartDisplay(); 
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
            localStorage.removeItem('cart'); // Очищаем корзину после заказа
            Swal.fire({ icon: 'success', title: 'Заказ оформлен!', text: 'Курьер уже выехал к вам.', confirmButtonColor: '#ffc107' }).then(() => {
                window.location.href = 'index.html';
            });
        });
    }
});