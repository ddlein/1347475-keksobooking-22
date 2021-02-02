function getRandomArbitrary(min, max) {
  if (max < min || max < 0 || min < 0) {
    alert('число ДО должно быть больше, чем ОТ и они должны быть положительные')
  } else {
    return Math.round(Math.random() * (max - min) + min);
  }
}

function getRandomFixed(min, max) {
  if (max < min || max < 0 || min < 0) {
    alert('число ДО должно быть больше, чем ОТ и они должны быть положительные')
  } else {
    return ((Math.random() * (max - min) + min)).toFixed(1);
  }
}

getRandomArbitrary(10, 100)
getRandomFixed(10, 100)

// console.log(a)
// console.log(b)
