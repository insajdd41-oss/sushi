document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Форма контактов:', data);

      const name = (data.name || '').trim();
      const email = (data.email || '').trim();
      const message = (data.message || '').trim();

      if (name.length < 2) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите имя (минимум 2 символа)' });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите корректный email' });
        return;
      }
      if (message.length < 10) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Сообщение должно быть не короче 10 символов' });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Сообщение отправлено',
        text: 'Спасибо, ' + name + '! Мы ответим вам на ' + email
      });
      contactForm.reset();
    });
  }

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(checkoutForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Форма заказа:', data);

      const fullname = (data.fullname || '').trim();
      const phone = (data.phone || '').trim();
      const address = (data.address || '').trim();
      const comment = (data.comment || '').trim();

      if (fullname.length < 5 || fullname.split(' ').filter(Boolean).length < 2) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите ФИО полностью (минимум фамилия и имя)' });
        return;
      }
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите корректный номер телефона (10–11 цифр)' });
        return;
      }
      if (address.length < 5) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите адрес доставки (минимум 5 символов)' });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Заказ оформлен!',
        html: 'Спасибо, <b>' + fullname + '</b>!<br>' +
              'Доставим по адресу: ' + address + '<br>' +
              'Курьер свяжется по номеру ' + phone +
              (comment ? '<br><small>Комментарий: ' + comment + '</small>' : '')
      });
      checkoutForm.reset();
    });
  }

  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const product = btn.getAttribute('data-product') || 'Товар';
      const price = btn.getAttribute('data-price') || '';
      console.log('Добавлено в корзину:', { product, price });

      Swal.fire({
        icon: 'success',
        title: 'Добавлено в корзину',
        text: product + (price ? ' — ' + price + ' ₽' : ''),
        timer: 1500,
        showConfirmButton: false
      });
    });
  });

  document.querySelectorAll('.edit-dish').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const dish = link.getAttribute('data-dish') || 'блюдо';
      console.log('Редактирование:', dish);
      Swal.fire({
        icon: 'info',
        title: 'Редактирование',
        text: 'Открываем редактирование: ' + dish,
        timer: 1500,
        showConfirmButton: false
      });
    });
  });

  document.querySelectorAll('.delete-dish').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const dish = link.getAttribute('data-dish') || 'блюдо';
      console.log('Удаление:', dish);

      Swal.fire({
        icon: 'warning',
        title: 'Удалить блюдо?',
        text: dish + ' будет удалено из меню',
        showCancelButton: true,
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        confirmButtonColor: '#dc3545'
      }).then(function (result) {
        if (result.isConfirmed) {
          const row = link.closest('tr');
          if (row) row.remove();

          Swal.fire({
            icon: 'success',
            title: 'Удалено',
            text: dish + ' удалено из меню',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    });
  });

  const addDishForm = document.getElementById('addDishForm');
  if (addDishForm) {
    addDishForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(addDishForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Новое блюдо:', data);

      const title = (data.title || '').trim();
      const category = (data.category || '').trim();
      const price = Number(data.price);
      const weight = Number(data.weight);
      const description = (data.description || '').trim();
      const imageFile = formData.get('image');

      if (title.length < 2) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Введите название блюда (минимум 2 символа)' });
        return;
      }
      if (!category) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Выберите категорию' });
        return;
      }
      if (!price || price <= 0) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Цена должна быть положительным числом' });
        return;
      }
      if (!weight || weight <= 0) {
        Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Вес должен быть положительным числом' });
        return;
      }
      if (imageFile && imageFile.size > 0) {
        if (!imageFile.type.startsWith('image/')) {
          Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Можно загружать только изображения' });
          return;
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          Swal.fire({ icon: 'error', title: 'Ошибка', text: 'Размер изображения не должен превышать 5 МБ' });
          return;
        }
      }

      Swal.fire({
        icon: 'success',
        title: 'Блюдо добавлено!',
        html: '<b>' + title + '</b><br>' +
              'Категория: ' + category + '<br>' +
              'Цена: ' + price + ' ₽<br>' +
              'Вес: ' + weight + ' г' +
              (description ? '<br><small>' + description + '</small>' : '')
      });
      addDishForm.reset();

      const fileLabel = addDishForm.querySelector('.custom-file-label');
      if (fileLabel) {
        fileLabel.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Загрузить файл';
      }
    });

    const imgInput = document.getElementById('imgInput');
    if (imgInput) {
      imgInput.addEventListener('change', function () {
        const label = addDishForm.querySelector('.custom-file-label');
        if (!label) return;
        if (imgInput.files && imgInput.files.length) {
          label.textContent = imgInput.files[0].name;
        } else {
          label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Загрузить файл';
        }
      });
    }
  }

  const reviewForm = document.getElementById('review-form');
  const reviewsList = document.getElementById('reviews-list');

  if (reviewForm && reviewsList) {
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(reviewForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Отзыв:', data);

      const name = (data.name || '').trim();
      const text = (data.text || '').trim();

      if (name.length < 2) {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка',
          text: 'Введите имя (минимум 2 символа)',
          confirmButtonColor: '#ffc107'
        });
        return;
      }
      if (text.length < 10) {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка',
          text: 'Отзыв должен быть не короче 10 символов',
          confirmButtonColor: '#ffc107'
        });
        return;
      }

      const newReview = document.createElement('div');
      newReview.className = 'mb-3 p-3';
      newReview.style.backgroundColor = '#0f0f1a';
      newReview.style.borderRadius = '8px';

      const nameEl = document.createElement('strong');
      nameEl.className = 'text-warning';
      nameEl.textContent = name;

      const timeEl = document.createElement('small');
      timeEl.className = 'text-muted ml-2';
      timeEl.textContent = 'Только что';

      const textEl = document.createElement('p');
      textEl.className = 'mb-0 mt-2';
      textEl.textContent = text;

      newReview.appendChild(nameEl);
      newReview.appendChild(timeEl);
      newReview.appendChild(textEl);
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