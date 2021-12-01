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
