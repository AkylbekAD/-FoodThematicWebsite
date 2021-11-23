window.addEventListener('DOMContentLoaded', () => {
  // Tabs

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

  // Timer

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

  // Modal окно для приема данных пользователя

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

  // Menu block

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

  // Slider

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
      +slideWidth.slice(0, slideWidth.length - 2) * (sliders.length - 1) // показ первого слайда если смещение равно максимальной ширине
    ) {
      offset = 0;
    } else {
      offset += +slideWidth.slice(0, slideWidth.length - 2); // смещение на еденицу ширины слайда влево
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (counter == sliders.length) {
      counter = 1;
    } else {
      counter++;
    }
    counterCurrent.innerHTML = getZero(counter);
  });

  sliderPrev.addEventListener('click', () => {
    if (offset == 0) {
      // показ последнего слайда если смещение равно 0
      offset =
        +slideWidth.slice(0, slideWidth.length - 2) * (sliders.length - 1); // последний слайд
    } else {
      offset -= +slideWidth.slice(0, slideWidth.length - 2); // смещение на еденицу ширины слайда вправо
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (counter == 1) {
      counter = sliders.length;
    } else {
      counter--;
    }
    counterCurrent.innerHTML = getZero(counter);
  });

  // Second Slider by Course:

  // let counter = 1; // счётчик текущего слайда, поумолчанию стоит 1
  // counterTotal.innerHTML = getZero(sliders.length); // добавление 0 перед одинарным числом

  // function showSlide() {
  //   if (counter > sliders.length) { // замыкание конца с началом слайдов
  //     counter = 1;
  //   }

  //   if (counter < 1) { // замыкание начала с концом слайдов
  //     counter = sliders.length;
  //   }

  //   sliders.forEach((item) => (item.style.display = 'none')); // скрытие всех слайдов
  //   sliders[counter - 1].style.display = 'block'; // показ первого слайда из массива
  //   counterCurrent.innerHTML = getZero(counter); // добавление 0 перед одинарным числом
  // }
  // showSlide();

  // sliderNext.addEventListener('click', () => { // след слайд
  //   counter++;
  //   showSlide();
  // });
  // sliderPrev.addEventListener('click', () => { // пред слайд
  //   counter--;
  //   showSlide();
  // });

  // My first attemtp to Slider:

  // let counter = 1; // счётчик текущего слайда, поумолчанию стоит 1
  // function sliderCounter() {
  //   counterTotal.innerHTML = getZero(sliders.length); // счётчик общего кол-ва слайдов
  //   counterCurrent.innerHTML = getZero(counter);
  //   console.log(counter);
  // }
  // sliderCounter();

  // sliderNext.addEventListener('click', () => {
  //   if (counter > sliders.length - 1) {
  //     sliders[counter - 1].style.display = 'none';
  //     counter = 1;
  //     sliders[counter - 1].style.display = 'block';
  //     sliderCounter();
  //   } else {
  //     sliders[counter - 1].style.display = 'none';
  //     sliders[counter].style.display = 'block';
  //     counter++;
  //     sliderCounter();
  //   }
  // });

  // sliderPrev.addEventListener('click', () => {
  //   if (counter == 1) {
  //     sliders[counter - 1].style.display = 'none';
  //     counter = sliders.length;
  //     sliders[counter - 1].style.display = 'block';
  //     sliderCounter();
  //   } else {
  //     sliders[counter - 1].style.display = 'none';
  //     sliders[counter - 2].style.display = 'block';
  //     counter--;
  //     sliderCounter();
  //   }
  // });
});
