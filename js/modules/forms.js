function forms() {
  const forms = document.querySelectorAll('form'); //форма в модальном окне которая заполняется пользователем

  const message = {
    //содержание сообщения о статусе отправки данных пользователя через модальное окно
    loading: 'img/forms/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжeмся!',
    failure: 'Что то пошло не так x_X',
  };

  forms.forEach((item) => {
    // для срабатывания каждой формы на странице при отправке
    bindPostData(item);
  });

  const postData = async (url, data) => {
    //асинхронная отправка данных на сервер в БД
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });
    return await result.json();
  };

  function bindPostData(form) {
    // обработчик отправки данных пользователя
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img'); // вывод спиннера во время ожидания отправки
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMessage); // добавляет спиннер в DOM-дерево после формы с сообщением

      const formData = new FormData(form); //создание специального экземпляра, позволяет не устанавливать заголовки

      let json = JSON.stringify(Object.fromEntries(formData.entries())); //преобразование массива в объект, а затем объекта в JSON формат для отправки

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch(() => {
          showThanksModal(message.failure); //вывод сообщения об ошибке
        })
        .finally(() => {
          // метод срабатывающий при обоих исходах then и catch
          form.reset(); // сброс данных в форме
          statusMessage.remove();
        });
    });

    function showThanksModal(message) {
      //вывод сообщения об статусе отправки ввиде модального окна
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide'); // скрытие прочих модальных окон
      openModal();

      const thanksModal = document.createElement('div'); // создания модального окна с благодарностью либо об ошибке
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div> 
        </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        // автоматическое скрытие модального окна через время
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
      }, 4000);
    }
  }
}

module.exports = forms;
