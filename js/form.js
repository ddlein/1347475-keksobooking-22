const CHECKIN = document.querySelector('#timein');
const CHECKOUT = document.querySelector('#timeout');
const TYPE = document.querySelector('#type');
const PRICE = document.querySelector('#price');
const FORM = document.querySelector('.ad-form');
const FORM_ELEMENT = FORM.querySelectorAll('fieldset')
const MAP_FILTERS = document.querySelector('.map__filters');
const MAP_FILTER_SETTING = MAP_FILTERS.querySelectorAll('.map__filter');
const ADDRESS = document.querySelector('#address');
const ROOM_NUMBER = document.querySelector('#room_number');
// const ROOM_OPTION = ROOM_NUMBER.querySelectorAll('option');
const GUESTS = document.querySelector('#capacity');
// const GUESTS_OPTION = GUESTS.querySelectorAll('option');


const getDisabled = (isDisabled) => {

  if (isDisabled) {
    FORM.classList.add('ad-form--disabled');
    MAP_FILTERS.classList.add('ad-form--disabled');
  } else {
    FORM.classList.remove('ad-form--disabled');
    MAP_FILTERS.classList.remove('ad-form--disabled');
  }


  FORM_ELEMENT.forEach((fieldset) => {
    fieldset.disabled = isDisabled
  })


  MAP_FILTER_SETTING.forEach((mapFilter) => {
    mapFilter.disabled = isDisabled
  })
}

getDisabled(true)

const priceType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}


TYPE.addEventListener('change', () => {
  PRICE.placeholder = priceType[TYPE.value]
  PRICE.min = priceType[TYPE.value]
})


CHECKIN.addEventListener('change', () => {
  CHECKOUT.value = CHECKIN.value;
});

CHECKOUT.addEventListener('change', () => {
  CHECKIN.value = CHECKOUT.value;
});


// console.log(ROOM_OPTION);



// GUESTS_OPTION.forEach((elem) => {
//   if (ROOM_NUMBER.value < elem.value) {
//     elem.disabled = true;
//   } if (elem.value < ROOM_NUMBER.value) {
//     elem.disabled = true
//   }
// })

// ROOM_NUMBER.addEventListener('change', () => {
//   // console.log(typeof(Number(ROOM_NUMBER.value)));
//   GUESTS_OPTION.forEach((el) => {
//     if (Number(ROOM_NUMBER.value) >= Number(el.value) &&  Number(el.value) !== 0 && Number(ROOM_NUMBER.value) !== 100)  {
//       el.disabled = false;
//     }

//     else if (Number(ROOM_NUMBER.value) === 100 && Number(el.value) === 0) {
//       el.disabled = false
//     } else {
//       el.disabled = true
//     }

//   })
// })

let checkNumberOfGuestsAndRooms = () => {
  let roomsValue = Number(ROOM_NUMBER.value);
  let guestsValue = Number(GUESTS.value);

  if (roomsValue !== 100 && guestsValue === 0) {
    GUESTS.setCustomValidity('Недостаточно гостей');
  } else if (roomsValue < guestsValue) {
    GUESTS.setCustomValidity('Гостей слишком много')
  } else if (roomsValue === 100 && guestsValue !== 0) {
    GUESTS.setCustomValidity('Данный вариант не для гостей')
  } else {
    GUESTS.setCustomValidity('');
  }
}

GUESTS.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})

ROOM_NUMBER.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})






export {getDisabled, ADDRESS};
