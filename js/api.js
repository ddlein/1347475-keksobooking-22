// const getData = (onSuccess) => {};

const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      // throw new Error(`${response.status} ${response.statusText}`)
    })
    .then((promos) => {
      // console.log(promos);
      onSuccess(promos)
    })
    .catch(() => {
      onError('Не удалось загрузить данные')
    })
}

const sendData = (onSuccessSubmit, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking', {
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
