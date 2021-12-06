import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';
// export { showModalByScroll };

// function showModalByScroll(modalTimerId) {
//   //открытие модального окна при промотке до конца страницы
//   if (
//     window.pageYOffset + document.documentElement.clientHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     clearInterval(modalTimerId); // сброс автооткрытия окна после единождого открытия

//     openModal('[data-modalWindow]', modalTimerId);
//     window.removeEventListener('scroll', showModalByScroll);
//   }
// }

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => openModal('[data-modalWindow]', modalTimerId),
    5000
  ); // автооткрытие модального окна через время

  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  modal('[data-modal]', '[data-modalWindow]', modalTimerId);
  timer('.timer', '2021-12-28T22:35:00'); //конец таймера акции;
  calc();
  forms('form', modalTimerId);
  slider({
    container: '.offer__slide',
    nextArrow: '.offer__slider-next',
    slide: '.offer__slider',
    totalCounter: '#total',
    prevArrow: '.offer__slider-prev',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  cards();
});
