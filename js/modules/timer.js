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
