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

  const deadline = '2021-12-28T22:35:00';

  function getTimeReamaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
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
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeReamaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }
    }
  }

  setClock('.timer', deadline);

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('[data-modalWindow]');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflowY = 'hidden';
    clearInterval(modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflowY = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  class MenuItem {
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
    }

    changeToRuble() {
      this.price = this.price * this.transfer;
    }

    renderMenuItem() {
      const NewMenuItem = document.createElement('div');
      if (this.classes.indexOf('menu__item') == -1) {
        this.element = 'menu__item';
        NewMenuItem.classList.add(this.element);
      }
      this.classes.forEach((className) => NewMenuItem.classList.add(className));
      NewMenuItem.innerHTML = `
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
          <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parent.append(NewMenuItem);
    }
  }

  new MenuItem(
    'img/tabs/hamburger.jpg',
    'burger',
    'Американо',
    'Для жирных уебкаффф',
    2,
    '.menu .container'
  ).renderMenuItem();

  // new MenuItem(
  //   'img/tabs/vegy.jpg',
  //   'vegy',
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   '.menu .container'
  // ).renderMenuItem();

  new MenuItem(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container'
  ).renderMenuItem();

  new MenuItem(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    '.menu .container'
  ).renderMenuItem();

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/forms/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжeмся!',
    failure: 'Что то пошло не так x_X',
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
          statusMessage.remove();
        }
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
});
