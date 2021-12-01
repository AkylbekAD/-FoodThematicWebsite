function modal() {
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('[data-modalWindow]');

  modalTrigger.forEach((btn) => {
    //обработчик события на все кнопки для модальных окон
    btn.addEventListener('click', openModal);
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflowY = 'hidden';
    // clearInterval(modalTimerId); // сброс автооткрытия окна после единождого открытия
    window.removeEventListener('scroll', showModalByScroll);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflowY = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    // обработчик события на клавишу "Escape"
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 50000); // автооткрытие модального окна через время

  function showModalByScroll() {
    //открытие модального окна при промотке до конца страницы
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;
