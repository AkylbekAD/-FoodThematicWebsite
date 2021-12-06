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

async function getResource(url) {
  //асинхронное получение данных с сервера по url
  let result = await fetch(url); //ожидание резульатов запроса, defualt 30 секунд

  if (!result.ok) {
    // проверяет результат fetch на наличие ошибок при запросе данных, т.к. 404 для него не ошибка.
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // если нет результата, создание ошибки и вывод
  }

  return await result.json(); // возвращение результата в виде promise в формате json
}

export { postData };
export { getResource };
