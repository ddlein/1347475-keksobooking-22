let getRandomArbitrary = (min, max) => {
  if (max < min || max < 0 || min < 0) {
    alert('число ДО должно быть больше, чем ОТ и они должны быть положительные')
  } else {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }
}

let getRandomFixed = (min, max, decimal) => {
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

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const FROM_X = 35.65000;
const TO_X = 35.70000;

const FROM_Y = 139.70000;
const TO_Y = 139.80000;

// const Y = [
//   139.70000,
//   139.80000,
// ]



const createPromo = () => {
  let valueX = getRandomFixed(FROM_X, TO_X, 5);
  let valueY = getRandomFixed(FROM_Y, TO_Y, 5);
  let getRandomFeatures = (elements) => {
    return elements[getRandomArbitrary(0, elements.length - 1)]
  }

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomArbitrary(1, 8) + '.png',
    },
    offer: {
      title: 'Promo',
      address: valueX + ', ' + valueY,
      price: getRandomArbitrary(100, 4000),
      type: TYPE[getRandomArbitrary(0, TYPE.length - 1)],
      rooms: getRandomArbitrary(1, 4),
      guests: getRandomArbitrary(1, 4),
      checkin: CHECKIN[getRandomArbitrary(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomArbitrary(0, CHECKOUT.length - 1)],
      features: new Array(getRandomArbitrary(1, FEATURES.length-1)).fill(null).map(() => getRandomFeatures(FEATURES)),
      description: 'Супер-предложение',
      photos: new Array(getRandomArbitrary(1, PHOTOS.length-1)).fill(null).map(() => getRandomFeatures(PHOTOS)),
    },
    location: {
      x: valueX,
      y: valueY,
    },
  }
}

const SIMILAR_PROMO_COUNT = 10;

const SIMILAR_PROMO = new Array(SIMILAR_PROMO_COUNT).fill(null).map(() => createPromo())


SIMILAR_PROMO

// console.log(SIMILAR_PROMO);
