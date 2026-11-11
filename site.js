document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ДОБАВЛЕНИЕ В КОРЗИНУ
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
            
            // Обновляем сумму в шапке
            updateTotal();

            Swal.fire({
                icon: 'success',
                title: 'Добавлено!',
                text: `Товар "${name}" добавлен.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    // 2. ОТОБРАЖЕНИЕ НА СТРАНИЦЕ КОРЗИНЫ
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalEl = document.getElementById('total-price');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-muted">Корзина пуста.</p>';
            totalEl.textContent = '0';
        } else {
            let html = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                html += `
                <div class="col-12 mb-3">
                    <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
                        <h5 class="mb-0 text-white">${item.name}</h5>
                        <div>
                            <span class="text-danger font-weight-bold mr-4">${item.price} ₽</span>
                            <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Удалить</button>
                        </div>
                    </div>
                </div>`;
            });
            cartContainer.innerHTML = html;
            totalEl.textContent = total;

            // Удаление
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const idx = this.getAttribute('data-index');
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            });
        }
    }

    // Функция для обновления цифры в шапке
    function updateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.querySelectorAll('.cart-total').forEach(el => {
            el.textContent = total;
        });
    }
    updateTotal();
});