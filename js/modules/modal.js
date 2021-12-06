// function showModalByScroll(modalSelector, modalTimerId) {
//   //открытие модального окна при промотке до конца страницы
//   if (
//     window.pageYOffset + document.documentElement.clientHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     openModal(modalSelector, modalTimerId);
//     window.removeEventListener('scroll', showModalByScroll);
//   }
// }

// import { showModalByScroll } from '../script';

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflowY = 'hidden';
  // window.removeEventListener('scroll', showModalByScroll);

  if (modalTimerId) {
    clearInterval(modalTimerId); // сброс автооткрытия окна после единождого открытия
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflowY = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    //обработчик события на все кнопки для модальных окон
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    // обработчик события на клавишу "Escape"
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    //открытие модального окна при промотке до конца страницы
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
