document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.btn-warning');
    cartButtons.forEach(button => {
        if (button.textContent.includes('В корзину')) {
            button.addEventListener('click', function() {
                const dishName = this.closest('.card-body').querySelector('.card-title').textContent;
                Swal.fire({
                    icon: 'success',
                    title: 'Добавлено в корзину!',
                    text: `Блюдо "${dishName}" успешно добавлено.`,
                    confirmButtonColor: '#ffc107',
                    timer: 2000
                });
            });
        }
    });

    const reviewForm = document.forms['review-form'];
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log("Отзыв:", data);

            if (!data['review-name'] || !data['review-text']) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Заполните все поля.', confirmButtonColor: '#e94560' });
                return;
            }

            const reviewsList = document.getElementById('reviews-list');
            const newReview = document.createElement('div');
            newReview.className = 'mb-3 p-3';
            newReview.style.backgroundColor = '#0f0f1a';
            newReview.style.borderRadius = '8px';
            newReview.innerHTML = `<strong class="text-warning">${data['review-name']}</strong> <small class="text-muted ml-2">Только что</small><p class="mb-0 mt-2">${data['review-text']}</p>`;
            
            reviewsList.prepend(newReview);
            this.reset();

            Swal.fire({ icon: 'success', title: 'Спасибо за отзыв!', text: 'Ваше мнение очень важно для нас.', confirmButtonColor: '#ffc107' });
        });
    }

    const checkoutForm = document.forms['checkout-form'];
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log("Заказ:", data);

            if (!data['fio'] || !data['phone'] || !data['address']) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Заполните ФИО, телефон и адрес.', confirmButtonColor: '#e94560' });
                return;
            }

            Swal.fire({ icon: 'success', title: 'Заказ оформлен!', text: 'Курьер уже выехал к вам.', confirmButtonColor: '#ffc107' }).then(() => {
                this.reset();
            });
        });
    }

    const deleteButtons = document.querySelectorAll('.text-danger .fa-trash');
    deleteButtons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            const row = this.closest('tr');
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
        });
    });

    const editButtons = document.querySelectorAll('.text-warning .fa-pen');
    editButtons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            const row = this.closest('tr');
            const dishName = row.querySelector('td:nth-child(2)').textContent;
            Swal.fire({
                title: 'Редактирование',
                text: `Вы открыли редактирование блюда "${dishName}"`,
                icon: 'info',
                confirmButtonColor: '#ffc107'
            });
        });
    });

    const addDishForm = document.forms['add-dish-form'];
    if (addDishForm) {
        addDishForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log("Новое блюдо:", data);

            if (!data['dish-name'] || !data['dish-price']) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите название и цену блюда.', confirmButtonColor: '#e94560' });
                return;
            }

            Swal.fire({ icon: 'success', title: 'Блюдо добавлено!', text: 'Новая позиция появилась в меню.', confirmButtonColor: '#ffc107' }).then(() => {
                window.location.href = 'admin-menu.html';
            });
        });
    }

    const cancelButtons = document.querySelectorAll('.btn-secondary');
    cancelButtons.forEach(button => {
        if (button.textContent.includes('Отмена')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                this.closest('form').reset();
            });
        }
    });
});