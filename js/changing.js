const CHECKIN = document.querySelector('#timein');
const CHECKOUT = document.querySelector('#timeout');
const TYPE = document.querySelector('#type');
const PRICE = document.querySelector('#price');


PRICE.setAttribute('min', PRICE.placeholder)
PRICE.placeholder = 1000;
TYPE.addEventListener('change', () => {
  switch (TYPE.value) {
    case 'bungalow':
      PRICE.placeholder = 20;
      PRICE.setAttribute('min', 20)
      break;
    case 'flat':
      PRICE.placeholder = 1000;
      PRICE.setAttribute('min', 1000)
      break;
    case 'house':
      PRICE.placeholder = 5000;
      PRICE.setAttribute('min', 5000);
      break
    case 'palace':
      PRICE.placeholder = 10000;
      PRICE.setAttribute('min', 10000);
      break;
  }
  PRICE.value = '';
})



CHECKIN.addEventListener('change', () => {
  CHECKOUT.value = CHECKIN.value;
});

CHECKOUT.addEventListener('change', () => {
  CHECKIN.value = CHECKOUT.value;
});
