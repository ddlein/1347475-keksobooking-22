'use strict'

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

const MIN_PRICE = 100;
const MAX_PRICE = 4000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 4;

const MIN_GUESTS = 1;
const MAX_GUESTS = 4;

const FROM_X = 35.65000;
const TO_X = 35.70000;

const FROM_Y = 139.70000;
const TO_Y = 139.80000;
const DECIMAL = 5;
const SIMILAR_PROMO_COUNT = 10;


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

let getShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.slice(getRandomArbitrary(1, array.length-1))
}

const createPromo = () => {
  let valueX = getRandomFixed(FROM_X, TO_X, DECIMAL);
  let valueY = getRandomFixed(FROM_Y, TO_Y, DECIMAL);
  // let getRandomFeatures = (elements) => {
  //   return elements[getRandomArbitrary(0, elements.length - 1)]
  // }

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomArbitrary(1, 8) + '.png',
    },
    offer: {
      title: 'Promo',
      address: valueX + ', ' + valueY,
      price: getRandomArbitrary(MIN_PRICE, MAX_PRICE),
      type: TYPE[getRandomArbitrary(0, TYPE.length - 1)],
      rooms: getRandomArbitrary(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomArbitrary(MIN_GUESTS, MAX_GUESTS),
      checkin: CHECKIN[getRandomArbitrary(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomArbitrary(0, CHECKOUT.length - 1)],
      // features: new Array(getRandomArbitrary(1, FEATURES.length - 1)).fill(null).map(() => getRandomFeatures(FEATURES)),
      features: getShuffle(FEATURES),
      description: 'Супер-предложение',
      // photos: new Array(getRandomArbitrary(1, PHOTOS.length - 1)).fill(null).map(() => getRandomFeatures(PHOTOS)),
      photos: getShuffle(PHOTOS),
    },
    location: {
      x: valueX,
      y: valueY,
    },
  }
}




const similarPromo = new Array(SIMILAR_PROMO_COUNT).fill(null).map(() => createPromo())


similarPromo

// console.log(similarPromo);
