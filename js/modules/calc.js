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

export default calc;
