document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('review-name').value;
            const text = document.getElementById('review-text').value;
            const newReview = document.createElement('div');
            newReview.className = 'mb-3 p-3';
            newReview.style.backgroundColor = '#0f0f1a';
            newReview.style.borderRadius = '8px';
            newReview.innerHTML = `<strong class="text-warning">${name}</strong> <small class="text-muted ml-2">Только что</small><p class="mb-0 mt-2">${text}</p>`;
            reviewsList.prepend(newReview);
            reviewForm.reset();
            Swal.fire({
                icon: 'success',
                title: 'Спасибо за отзыв!',
                text: 'Ваше мнение очень важно для нас.',
                confirmButtonColor: '#ffc107'
            });
        });
    }
});