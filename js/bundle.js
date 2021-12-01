/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  let result = document.querySelector('.calculating__result span'), // задаем параметры
    sex,
    height,
    weight,
    age,
    ratio;

  if (localStorage.getItem('Sex')) {
    sex = localStorage.getItem('Sex'); // проверяем наличие данных в локальной БД и задаем их
  } else {
    sex = 'female'; // если БД пустой - задаем по умоолчанию 'female' и записываем в БД
    localStorage.setItem('Sex', 'female');
  }

  if (localStorage.getItem('Ratio')) {
    ratio = localStorage.getItem('Ratio'); // проверяем наличие данных в локальной БД и задаем их
  } else {
    ratio = 1.375; // если БД пустой - задаем по умоолчанию 1.375 и записываем в БД
    localStorage.setItem('Ratio', 1.375);
  }

  function initLocalSetting(selector, activeClass) {
    const elements = document.querySelectorAll(selector); // активируем и деактивируем поля по данных из локальной БД

    elements.forEach((elem) => {
      elem.classList.remove(activeClass); // отключение всех полей

      if (localStorage.getItem('Sex') === elem.getAttribute('id')) {
        elem.classList.add(activeClass); // сравниваем данные из БД и данные из полей, если одинаковы то активируем
      }
      if (localStorage.getItem('Ratio') === elem.getAttribute('data-ratio')) {
        elem.classList.add(activeClass); // сравниваем данные из БД и данные из полей, если одинаковы то активируем
      }
    });
  }

  initLocalSetting('#gender div', 'calculating__choose-item_active'); // активируем поля с значениями по-умолчанию
  initLocalSetting(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcTotal() {
    //счёт и вывод результатов калькулятора
    if (!(height && weight && age && sex && ratio)) {
      // проверка на заполненность всех полей
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      // если женщина
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      // если мужчина
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal(); // ставим поумолчанию result "0"

  function getStaticInfo(selector, activeClass) {
    // получение статичных данных с выбранных полей
    const elements = document.querySelectorAll(selector); //получение дочерних элементов для делигирования

    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio'); // получение данных по дата атрибуту
          localStorage.setItem('Ratio', +e.target.getAttribute('data-ratio')); // сохраняем ratio в локальной БД
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('Sex', e.target.getAttribute('id')); // сохраняем gender в локальной БД
        }

        elements.forEach((elem) => {
          // отключение всех полей
          elem.classList.remove(activeClass);
        });
        console.log(sex, ratio);
        e.target.classList.add(activeClass); // активация выбранного поля
        calcTotal(); // расчёт и вывод
      });
    });
  }

  getStaticInfo('#gender div', 'calculating__choose-item_active'); // получение гендера и активация
  getStaticInfo(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  ); // получение ratio и активация

  function getDynamicInfo(selector) {
    // получение динамических данных от пользователя с полей заполнения
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        // проверка на ввод символов кроме чисел
        input.style.border = '1px solid red'; // выделение полей красным при вводе нечисел
      } else {
        input.style.border = 'none';
      }

      switch (
        input.getAttribute('id') //получение данных с заполняемых полей из input
      ) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal(); // расчёт и вывод
    });
  }
  getDynamicInfo('#height'); // вызов данных по id
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  class MenuItem {
    //конструктор меню табов
    constructor(src, alt, title, descr, price, parent, ...classes) {
      this.src = src;
      this.title = title;
      this.alt = alt;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.classes = classes;
      this.changeToRuble();
      this.parent = document.querySelector(parent);
      this.renderMenuItem();
    }

    changeToRuble() {
      //конвертация $ в рубли
      this.price = this.price * this.transfer;
    }

    renderMenuItem() {
      //рендер табов на страницу
      const NewMenuItem = document.createElement('div');
      if (this.classes.indexOf('menu__item') == -1) {
        //проверка и подставка класса 'menu__item'
        this.element = 'menu__item';
        NewMenuItem.classList.add(this.element);
      }
      this.classes.forEach((className) => NewMenuItem.classList.add(className)); // добавление частных классов через rest оператор если они присутствуют
      NewMenuItem.innerHTML = `
              <img src=${this.src} alt=${this.alt} />
              <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
              <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(NewMenuItem); //определение куда встраивать в верстку
    }
  }

  const getResource = async (url) => {
    //асинхронное получение данных с сервера по url
    let result = await fetch(url); //ожидание резульатов запроса, defualt 30 секунд

    if (!result.ok) {
      // проверяет результат fetch на наличие ошибок при запросе данных, т.к. 404 для него не ошибка.
      throw new Error(`Could not fetch ${url}, status: ${result.status}`); // если нет результата, создание ошибки и вывод
    }

    return await result.json(); // возвращение результата в виде promise в формате json
  };

  getResource('http://localhost:3000/menu').then((data) => {
    //получение данных из БД
    data.forEach(({ img, alt, title, descr, price, parent }) => {
      // создание массива по свойствам
      new MenuItem(img, alt, title, descr, price, parent); // создание экзепляра через конструктор по свойствам и значениям
    });
  });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
  const sliders = document.querySelectorAll('.offer__slide'),
    counterTotal = document.querySelector('#total'),
    counterCurrent = document.querySelector('#current'),
    sliderPrev = document.querySelector('.offer__slider-prev'),
    sliderNext = document.querySelector('.offer__slider-next'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'), // ячейка обзора слайдов
    slidesField = document.querySelector('.offer__slider-inner'), // поле объединённых слайдов
    slideWidth = window.getComputedStyle(slidesWrapper).width; // ширина для подгонки всех слайдов под ячейку

  let offset = 0; // отступ во время transition, текущее положение slidesField
  let counter = 1;

  counterTotal.innerHTML = getZero(sliders.length); // добавление 0 перед одинарным числом
  counterCurrent.innerHTML = getZero(counter);

  slidesField.style.width = 100 * sliders.length + '%'; // занимает 400% ширины slidesWrapper
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all'; // время перемещения слайдов

  slidesWrapper.style.overflow = 'hidden'; // скрытие слайдов не попадающих в ячейку slidesField

  sliders.forEach((slide) => {
    // подгон ширины всех слайдов под ширину ячейки
    slide.style.width = slideWidth;
  });

  sliderNext.addEventListener('click', () => {
    if (
      offset ==
      deleteNoNumbers(slideWidth) * (sliders.length - 1) // показ первого слайда если смещение равно максимальной ширине
    ) {
      offset = 0;
    } else {
      offset += deleteNoNumbers(slideWidth); // смещение на еденицу ширины слайда влево
    }

    if (counter == sliders.length) {
      // замчкание счётчика конца с началом
      counter = 1;
    } else {
      counter++;
    }

    activateSlider(); // обновляем активность слайдера
  });

  sliderPrev.addEventListener('click', () => {
    if (offset == 0) {
      // показ последнего слайда если смещение равно 0
      offset = deleteNoNumbers(slideWidth) * (sliders.length - 1); // последний слайд
    } else {
      offset -= deleteNoNumbers(slideWidth); // смещение на еденицу ширины слайда вправо
    }

    if (counter == 1) {
      // замыкание счётчика начала с концом
      counter = sliders.length;
    } else {
      counter--;
    }

    activateSlider(); // обновляем активность слайдера
  });

  //Slider navigator

  const sliderOffer = document.querySelector('.offer__slider'), // находим общую обёртку слайдера
    dots = []; // создаем массив для точек навигации

  sliderOffer.style.position = 'relative'; // устанавливаем "местную" ось координат

  const navigatorBlock = document.createElement('ul'); // создаем блок список
  sliderOffer.append(navigatorBlock); // помещаем элемент в обёртку слайдера

  navigatorBlock.classList.add('carousel-indicators'); // применяем стили для точек списка

  for (let i = 0; i < sliders.length; i++) {
    // создаем точки списка из кол-ва слайдов
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1); // задаём индивидуальный дата-аттрибут каждой точке списка
    dot.classList.add('dot');
    navigatorBlock.append(dot); // помещаем точки в блок список

    if (i == 0) {
      // по-умолчанию 1 точка активна
      dot.style.opacity = 1;
    }

    dots.push(dot); // помещаем каждый эелемент (точку) списка в массив dots
  }

  function getZero(num) {
    // позволяет получать 0 перед однозначным числом
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function activateSlider() {
    // задание активного слайдера
    dots.forEach((dot) => (dot.style.opacity = '.5')); //задаем всем точкам навигатора неактивность

    dots[counter - 1].style.opacity = 1; // обновляем текущий активный слайд в навигаторе

    slidesField.style.transform = `translateX(-${offset}px)`; // смещение по Х на заданное расстояние

    counterCurrent.innerHTML = getZero(counter); //обновляем текущий счётчик
  }

  dots.forEach((dot) => {
    // навещиваем обраточик события на каждую точку через массив
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to'); // создаем счётчик по дата-аттрибуту выбранной точки
      counter = slideTo; // обновляем счётик на странице
      offset = deleteNoNumbers(slideWidth) * (slideTo - 1); // устанавливаем смещение по дата-аттрибуту выбранной точки

      activateSlider(); // обновляем активность слайдера
    });
  });

  function deleteNoNumbers(str) {
    // находит в строке Нечисла и удаляет их
    return +str.replace(/\D/g, '');
  }
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = 'none';
    }); // скрывает прочие окна из списка табов

    tabs.forEach((tab) => {
      tab.classList.remove('tabheader__item_active');
    }); // удаляет класс активный из всех табов
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  } // отображает выбранный i тый блок и добавляет класс активный

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    } // по клику перебирает все табы из списка и находит сравнением кликнутый, затем применяет функции
  });
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
  const deadline = '2021-12-28T22:35:00'; //конец таймера акции

  function getTimeReamaining(endtime) {
    // реализация таймера по дням,часам,минутам,секундам до конца акции
    const t = Date.parse(endtime) - Date.parse(new Date()), // разница между концом акции и настоящим временем
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    // позволяет получать 0 перед однозначным числом
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    //вывод таймера на страницу
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); //вызов обновления с интвервалом

    updateClock();

    function updateClock() {
      // обновление таймера через заданный интервал (1 секунда)
      const t = getTimeReamaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        // чтобы таймер не уходил в отрицательные значения
        clearInterval(timeInterval);
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }
    }
  }

  setClock('.timer', deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

  tabs();
  modal();
  timer();
  calc();
  forms();
  slider();
  cards();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map