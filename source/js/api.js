

const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((promos) => {
      onSuccess(promos)
    })
    .catch((error) => {
      onError('Не удалось загрузить данные'+ error)
    })
}

const sendData = (onSuccessSubmit, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking1', {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccessSubmit();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
