import { sendData } from './api.js';
// import { cleanMap } from './map.js';
//import {cleanMap} from './map.js';

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
const MAIN = document.querySelector('main');
const CLEAN_BUTTON = document.querySelector('.ad-form__reset');
const TEMPLATE_SUCCESS = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
// const SUCCESS = TEMPLATE_SUCCESS.cloneNode(true);
const TEMPLATE_ERROR = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const FORM_SUBMIT = document.querySelector('.ad-form');

// const ERROR = TEMPLATE_ERROR.cloneNode(true);





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
  const TITLE_INPUT = document.querySelector('#title');
  const DESCRIPTION_INPUT = document.querySelector('#description');
  DESCRIPTION_INPUT.value = '';
  TITLE_INPUT.value = '';
  CHECKIN.value = '12:00';
  CHECKOUT.value = '12:00';
  PRICE.value = '';
  PRICE.placeholder = '1000'
  TYPE.value = 'flat';
  const FEATURES_CHECKBOX = document.querySelectorAll('.feature__checkbox');
  // for (let i = 0; i < FEATURES_CHECKBOX.length; i++) {
  //   FEATURES_CHECKBOX[i].checked = false;
  // }
  FEATURES_CHECKBOX.forEach((element) => {
    element.checked = false
  })
  ROOM_NUMBER.value = '1';
  GUESTS.value = '1';
}





const successSubmit = (onSuccess) => {
  MAIN.append(TEMPLATE_SUCCESS)
  onSuccess()

  window.addEventListener('click', () => {
    TEMPLATE_SUCCESS.remove();
  })


  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      TEMPLATE_SUCCESS.remove()
    }
  })
  // cleanForm()
  window.removeEventListener('click', () => {})
  window.removeEventListener('keydown', () => {})

}



//Удаление при клике кнопки вызванного сообщения об ошибке
const deleteErrorPopup = () => {
  let errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    TEMPLATE_ERROR.remove()
  })
  errorButton.removeEventListener('click', () => {})
}

//Добавление затемнения при ошибке + слушатели для закрытия затемнения
const errorSubmit = () => {
  MAIN.append(TEMPLATE_ERROR);
  // errorButton = document.querySelector('.error__button');
  deleteErrorPopup()

  window.addEventListener('click', () => {
    TEMPLATE_ERROR.remove()
  })

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      TEMPLATE_ERROR.remove()
    }
  })

  window.removeEventListener('click', () => {})
  window.removeEventListener('keydown', () => {})

}




const setUserFormClean = (clean) => {
  CLEAN_BUTTON.addEventListener('click', (evt) => {
    evt.preventDefault();
    clean();
    // cleanForm();
  })
}




// window.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('success')) {
//     TEMPLATE_SUCCESS.remove();
//   }
//   if (evt.target.classList.contains('error')) {
//     TEMPLATE_ERROR.remove()
//   }
// })

// window.addEventListener('keydown', (evt) => {
//   if (evt.keyCode === 27) {
//     TEMPLATE_ERROR.remove()
//     TEMPLATE_SUCCESS.remove()
//   }
// })

// window.removeEventListener('click', (evt) => {
//   if (evt.target.classList.contains('success')) {
//     TEMPLATE_SUCCESS.remove();
//   }
//   if (evt.target.classList.contains('error')) {
//     TEMPLATE_ERROR.remove()
//   }
// })

// window.removeEventListener('keydown', (evt) => {
//   if (evt.keyCode === 27) {
//     TEMPLATE_ERROR.remove()
//     TEMPLATE_SUCCESS.remove()
//   }
// })



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
