document.addEventListener('click', function(e) {
    if (e.target && e.target.textContent.includes('В корзину')) {
        e.preventDefault();
        const card = e.target.closest('.card');
        if (!card) return;

        const name = card.querySelector('.card-title').textContent;
        const priceText = card.querySelector('.text-danger').textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));

        let cart = [];
        let saved = localStorage.getItem('cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
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

document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        let cart = [];
        let saved = localStorage.getItem('cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
        
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
});