window.onload = function() {
    // 1. Обновление цифры в шапке при загрузке
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }
    const cartElements = document.querySelectorAll('.cart-total');
    for (let i = 0; i < cartElements.length; i++) {
        cartElements[i].textContent = total;
    }

    // 2. Добавление в корзину
    document.addEventListener('click', function(e) {
        if (e.target && e.target.textContent.includes('В корзину')) {
            e.preventDefault();
            const card = e.target.closest('.card');
            if (!card) return;

            const name = card.querySelector('.card-title').textContent;
            const priceText = card.querySelector('.text-danger').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: name, price: price });
            localStorage.setItem('cart', JSON.stringify(cart));

            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price;
            }
            const cartElements = document.querySelectorAll('.cart-total');
            for (let i = 0; i < cartElements.length; i++) {
                cartElements[i].textContent = total;
            }

            Swal.fire({
                icon: 'success',
                title: 'Добавлено!',
                text: name + ' добавлен.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    // 3. Отображение корзины на странице cart.html
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalEl = document.getElementById('total-price');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-muted">Корзина пуста.</p>';
            if (totalEl) totalEl.textContent = '0';
        } else {
            let html = '';
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price;
                html += '<div class="col-12 mb-3"><div class="card p-3 d-flex flex-row justify-content-between align-items-center"><h5 class="mb-0 text-white">' + cart[i].name + '</h5><div><span class="text-danger font-weight-bold mr-4">' + cart[i].price + ' ₽</span><button class="btn btn-sm btn-danger remove-btn" data-index="' + i + '">Удалить</button></div></div></div>';
            }
            cartContainer.innerHTML = html;
            if (totalEl) totalEl.textContent = total;

            const removeBtns = document.querySelectorAll('.remove-btn');
            for (let i = 0; i < removeBtns.length; i++) {
                removeBtns[i].addEventListener('click', function() {
                    const idx = this.getAttribute('data-index');
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            }
        }
    }

    // 4. Форма отзывов
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
                newReview.innerHTML = '<strong class="text-warning">' + name + '</strong> <small class="text-muted ml-2">Только что</small><p class="mb-0 mt-2">' + text + '</p>';
                reviewsList.prepend(newReview);
            }
            this.reset();
            Swal.fire({ icon: 'success', title: 'Спасибо за отзыв!', text: 'Ваше мнение очень важно для нас.', confirmButtonColor: '#ffc107' });
        });
    }

    // 5. Форма заказа
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.removeItem('cart'); 
            Swal.fire({ icon: 'success', title: 'Заказ оформлен!', text: 'Курьер уже выехал к вам.', confirmButtonColor: '#ffc107' }).then(() => {
                window.location.href = 'index.html';
            });
        });
    }
};