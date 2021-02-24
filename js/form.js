const CHECKIN = document.querySelector('#timein');
const CHECKOUT = document.querySelector('#timeout');
const TYPE = document.querySelector('#type');
const PRICE = document.querySelector('#price');
const FORM = document.querySelector('.ad-form');
const FORM_ELEMENT = FORM.querySelectorAll('fieldset')
const MAP_FILTERS = document.querySelector('.map__filters');
const MAP_FILTER_SETTING = MAP_FILTERS.querySelectorAll('.map__filter');
const ADDRESS = document.querySelector('#address');

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

export {getDisabled, ADDRESS};
