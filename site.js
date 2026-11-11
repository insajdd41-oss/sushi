document.addEventListener('DOMContentLoaded', function() {
    let total = 0;
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price;
        }
    } catch(e) {
        total = 0;
    }
    
    const cartElements = document.querySelectorAll('.cart-total');
    for (let i = 0; i < cartElements.length; i++) {
        cartElements[i].textContent = total;
    }

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
            let newTotal = 0;
            for (let i = 0; i < cart.length; i++) {
                newTotal += cart[i].price;
            }
            const els = document.querySelectorAll('.cart-total');
            for (let i = 0; i < els.length; i++) {
                els[i].textContent = newTotal;
            }
            if (typeof Swal !== 'undefined') {
                Swal.fire({ icon: 'success', title: 'Добавлено!', text: name, timer: 1500, showConfirmButton: false });
            }
        }
    });

    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalEl = document.getElementById('total-price');
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-muted">Корзина пуста.</p>';
            if (totalEl) totalEl.textContent = '0';
        } else {
            let html = '';
            let cartTotal = 0;
            for (let i = 0; i < cart.length; i++) {
                cartTotal += cart[i].price;
                html += '<div class="col-12 mb-3"><div class="card p-3 d-flex flex-row justify-content-between align-items-center"><h5 class="mb-0 text-white">' + cart[i].name + '</h5><div><span class="text-danger font-weight-bold mr-4">' + cart[i].price + ' ₽</span><button class="btn btn-sm btn-danger remove-btn" data-index="' + i + '">Удалить</button></div></div></div>';
            }
            cartContainer.innerHTML = html;
            if (totalEl) totalEl.textContent = cartTotal;
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

    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('fa-trash')) {
            e.preventDefault();
            const row = e.target.closest('tr');
            Swal.fire({
                title: 'Удалить блюдо?',
                text: "Вы уверены, что хотите удалить эту позицию из меню?",
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

        if (e.target && e.target.classList.contains('fa-pen')) {
            e.preventDefault();
            const row = e.target.closest('tr');
            const dishName = row.querySelector('td:nth-child(2)').textContent;
            Swal.fire({
                title: 'Редактирование',
                input: 'text',
                inputValue: dishName,
                inputLabel: 'Новое название блюда',
                showCancelButton: true,
                confirmButtonColor: '#ffc107',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Сохранить',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                if (result.isConfirmed) {
                    row.querySelector('td:nth-child(2)').textContent = result.value;
                    Swal.fire('Сохранено!', 'Название блюда обновлено.', 'success');
                }
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
                newReview.innerHTML = '<strong class="text-warning">' + name + '</strong> <small class="text-muted ml-2">Только что</small><p class="mb-0 mt-2">' + text + '</p>';
                reviewsList.prepend(newReview);
            }
            
            document.getElementById('review-name').value = '';
            document.getElementById('review-text').value = '';

            Swal.fire({ 
                icon: 'success', 
                title: 'Спасибо за отзыв!', 
                text: 'Ваше мнение очень важно для нас.', 
                confirmButtonColor: '#ffc107' 
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            if (!name || !email || !message) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Пожалуйста, заполните все поля.', confirmButtonColor: '#e94560' });
                return;
            }

            Swal.fire({ 
                icon: 'success', 
                title: 'Сообщение отправлено!', 
                text: 'Мы свяжемся с вами в ближайшее время.', 
                confirmButtonColor: '#ffc107' 
            }).then(() => {
                contactForm.reset();
            });
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fio = this.querySelector('input[name="fio"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const address = this.querySelector('input[name="address"]').value;

            if (!fio || !phone || !address) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Заполните ФИО, телефон и адрес.', confirmButtonColor: '#e94560' });
                return;
            }

            localStorage.removeItem('cart'); 
            Swal.fire({ 
                icon: 'success', 
                title: 'Заказ оформлен!', 
                text: 'Курьер уже выехал к вам.', 
                confirmButtonColor: '#ffc107' 
            }).then(() => {
                window.location.href = 'index.html';
            });
        });
    }

    const addDishForm = document.getElementById('add-dish-form');
    if (addDishForm) {
        addDishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="dish-name"]').value;
            const price = this.querySelector('input[name="dish-price"]').value;

            if (!name || !price) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите название и цену блюда.', confirmButtonColor: '#e94560' });
                return;
            }

            Swal.fire({ 
                icon: 'success', 
                title: 'Блюдо добавлено!', 
                text: 'Новая позиция появилась в меню.', 
                confirmButtonColor: '#ffc107' 
            }).then(() => {
                window.location.href = 'admin-menu.html';
            });
        });
    }
});