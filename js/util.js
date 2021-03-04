let getRandomArbitrary = (min, max) => {
  if (max < min || max < 0 || min < 0) {
    alert(
      'число ДО должно быть больше, чем ОТ и они должны быть положительные',
    );
  } else {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

let getRandomFixed = (min, max, decimal) => {
  if (max < min || max < 0 || min < 0) {
    alert(
      'число ДО должно быть больше, чем ОТ и они должны быть положительные',
    );
  } else {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
};

const showError = (error) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = error;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}

export {getRandomArbitrary, getRandomFixed, showError};
