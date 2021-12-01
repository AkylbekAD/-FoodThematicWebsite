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
