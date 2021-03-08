import { sendData } from './api.js';

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
const GUESTS = document.querySelector('#capacity');
const MAIN = document.querySelector('main');
const CLEAN_BUTTON = document.querySelector('.ad-form__reset');
const TEMPLATE_SUCCESS = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const TEMPLATE_ERROR = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const FORM_SUBMIT = document.querySelector('.ad-form');
const TITLE_INPUT = document.querySelector('#title');
const DESCRIPTION_INPUT = document.querySelector('#description');
const FEATURES_CHECKBOX = document.querySelectorAll('.feature__checkbox');




// Разблокировка/блокировка фильтров
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

// Событие изменения цены при изменении типа жилья
TYPE.addEventListener('change', () => {
  PRICE.placeholder = priceType[TYPE.value]
  PRICE.min = priceType[TYPE.value]
})

// Событие синхронизации времени выезда и заезда
CHECKIN.addEventListener('change', () => {
  CHECKOUT.value = CHECKIN.value;
});

// Событие синхронизации времени выезда и заезда
CHECKOUT.addEventListener('change', () => {
  CHECKIN.value = CHECKOUT.value;
});


// Функция оповещения пользователя при выборе кол-ва комнат
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

// Событие при котором срабатывает функция оповещения при смене кол-ва гостей
GUESTS.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})
// Событие при котором срабатывает функция оповещения при смене кол-ва комнат
ROOM_NUMBER.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})




const cleanForm = () => {
  DESCRIPTION_INPUT.value = '';
  TITLE_INPUT.value = '';
  CHECKIN.value = '12:00';
  CHECKOUT.value = '12:00';
  PRICE.value = '';
  PRICE.placeholder = '1000'
  TYPE.value = 'flat';
  FEATURES_CHECKBOX.forEach((element) => {
    element.checked = false
  })
  ROOM_NUMBER.value = '1';
  GUESTS.value = '1';
}

const removeSuccessPopup = () => {
  TEMPLATE_SUCCESS.remove();
  // console.log(7777);
  onSuccessPopupClick();
}

const onSuccessPopupClick = () => {
  TEMPLATE_SUCCESS.removeEventListener('click', removeSuccessPopup)
}


const escKeyDownSuccess = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault()
    TEMPLATE_SUCCESS.remove();
    // console.log('delet popup');
    onSuccessPopupKeydown();
  }
}

const onSuccessPopupKeydown = () => {
  window.removeEventListener('keydown', escKeyDownSuccess)
}


const successSubmit = (onSuccess) => {
  MAIN.append(TEMPLATE_SUCCESS);
  onSuccess();

  TEMPLATE_SUCCESS.addEventListener('click', removeSuccessPopup);
  window.addEventListener('keydown', escKeyDownSuccess)
}


const removeErrorPopup = () => {
  TEMPLATE_ERROR.remove();
  // console.log('00000');
  onErrorPopupclick()
}

const onErrorPopupclick = () => {
  TEMPLATE_ERROR.removeEventListener('click', removeErrorPopup)
}

const escKeyDownError = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault()
    TEMPLATE_ERROR.remove();
    // console.log('delet popup');
    onErrorPopupKeydown();
  }
}

const onErrorPopupKeydown = () => {
  window.removeEventListener('keydown', escKeyDownError)
}



let errorButton;


const buttonOfErrorPopup = () => {
  TEMPLATE_ERROR.remove();
  onButtonErrorPopup()
}

const onButtonErrorPopup = () => {
  errorButton.removeEventListener('click', buttonOfErrorPopup)
}

//Добавление затемнения при ошибке + слушатели для закрытия затемнения
const errorSubmit = () => {
  MAIN.append(TEMPLATE_ERROR);

  TEMPLATE_ERROR.addEventListener('click', removeErrorPopup);
  window.addEventListener('keydown', escKeyDownError);
  errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', buttonOfErrorPopup)
}




const setUserFormClean = (clean) => {
  CLEAN_BUTTON.addEventListener('click', (evt) => {
    evt.preventDefault();
    clean();
  })
}


const setUserFormSubmit = (onSuccess) => {
  FORM_SUBMIT.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //console.log(new FormData(evt.target));

    sendData(
      () => successSubmit(onSuccess),
      () => errorSubmit(),
      new FormData(evt.target),
    );

  })
}




export { getDisabled, ADDRESS, setUserFormSubmit, setUserFormClean, cleanForm };
