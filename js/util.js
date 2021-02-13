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

export { getRandomArbitrary, getRandomFixed };
