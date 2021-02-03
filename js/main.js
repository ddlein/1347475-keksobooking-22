function getRandomArbitrary(min, max) {
  if (max < min || max < 0 || min < 0) {
    alert('число ДО должно быть больше, чем ОТ и они должны быть положительные')
  } else {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
}

function getRandomFixed(min, max, decimal) {
  if (max < min || max < 0 || min < 0) {
    alert('число ДО должно быть больше, чем ОТ и они должны быть положительные')
  } else {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
}

getRandomArbitrary(10, 100)
getRandomFixed(10, 100, 4)

// console.log(a)
// console.log(b)
