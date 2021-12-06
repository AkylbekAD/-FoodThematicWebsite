function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = 'none';
    }); // скрывает прочие окна из списка табов

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    }); // удаляет класс активный из всех табов
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add(activeClass);
  } // отображает выбранный i тый блок и добавляет класс активный

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    } // по клику перебирает все табы из списка и находит сравнением кликнутый, затем применяет функции
  });
}

export default tabs;
