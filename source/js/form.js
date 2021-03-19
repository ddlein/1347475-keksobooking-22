import { sendData } from './api.js';

const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const form = document.querySelector('.ad-form');
const formElement = form.querySelectorAll('fieldset')
const mapFilters = document.querySelector('.map__filters');
const mapFilterSettings = mapFilters.querySelectorAll('.map__filter');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const main = document.querySelector('main');
const cleanButton = document.querySelector('.ad-form__reset');
const templateSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const templateError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const formSubmit = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const featuresCheckbox = document.querySelectorAll('.feature__checkbox');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const allHousingFeatures = document.querySelectorAll('.map__checkbox')
const priceType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}


// Разблокировка/блокировка фильтров
const getDisabledFilter = (isDisabled) => {

  if (isDisabled) {
    mapFilters.classList.add('map__filters--disabled');
  } else {
    mapFilters.classList.remove('map__filters--disabled');
  }

  mapFilterSettings.forEach((mapFilter) => {
    mapFilter.disabled = isDisabled
  })
}


const getDisabledForm = (isDisabled) => {
  if (isDisabled) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }

  formElement.forEach((fieldset) => {
    fieldset.disabled = isDisabled
  })
}

getDisabledFilter(true) //фильтр по Пинам
getDisabledForm(true) // фильтр по созданию Объяв



// Событие изменения цены при изменении типа жилья
type.addEventListener('change', () => {
  price.placeholder = priceType[type.value]
  price.min = priceType[type.value]
})

// Событие синхронизации времени выезда и заезда
checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});

// Событие синхронизации времени выезда и заезда
checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});


// Функция оповещения пользователя при выборе кол-ва комнат
let checkNumberOfGuestsAndRooms = () => {
  let roomsValue = Number(roomNumber.value);
  let guestsValue = Number(guests.value);

  if (roomsValue !== 100 && guestsValue === 0) {
    guests.setCustomValidity('Недостаточно гостей');
  } else if (roomsValue < guestsValue) {
    guests.setCustomValidity('Гостей слишком много')
  } else if (roomsValue === 100 && guestsValue !== 0) {
    guests.setCustomValidity('Данный вариант не для гостей')
  } else {
    guests.setCustomValidity('');
  }
}

// Событие при котором срабатывает функция оповещения при смене кол-ва гостей
guests.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})
// Событие при котором срабатывает функция оповещения при смене кол-ва комнат
roomNumber.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms()
})




const cleanForm = () => {
  descriptionInput.value = '';
  titleInput.value = '';
  checkin.value = '12:00';
  checkout.value = '12:00';
  price.value = '';
  price.placeholder = '1000'
  type.value = 'flat';
  featuresCheckbox.forEach((element) => {
    element.checked = false
  })
  roomNumber.value = '1';
  guests.value = '1';
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';
  allHousingFeatures.forEach((element) => {
    element.checked = false
  });
}

// удаление попапа об Успешной форме
const removeSuccessPopup = () => {
  templateSuccess.remove();
  onSuccessPopupClick();
}

// удаление слушателя на на Успешном Попапе
const onSuccessPopupClick = () => {
  templateSuccess.removeEventListener('click', removeSuccessPopup)
}

// удаление попапа при нажатии на Esc
const escKeyDownSuccess = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault()
    templateSuccess.remove();
    onSuccessPopupKeydown();
  }
}

// удаление слушателя на Esc
const onSuccessPopupKeydown = () => {
  window.removeEventListener('keydown', escKeyDownSuccess)
}

// Добавление Попапа на экран при успешной отправке формы,
// onSuccess это очистка формы
const successSubmit = (onSuccess) => {
  main.append(templateSuccess);
  onSuccess();

  templateSuccess.addEventListener('click', removeSuccessPopup);
  window.addEventListener('keydown', escKeyDownSuccess)
}


const removeErrorPopup = () => {
  templateError.remove();
  onErrorPopupclick()
}

const onErrorPopupclick = () => {
  templateError.removeEventListener('click', removeErrorPopup)
}

const escKeyDownError = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault()
    templateError.remove();
    onErrorPopupKeydown();
  }
}

const onErrorPopupKeydown = () => {
  window.removeEventListener('keydown', escKeyDownError)
}



let errorButton;

const buttonOfErrorPopup = () => {
  templateError.remove();
  onButtonErrorPopup()
}

const onButtonErrorPopup = () => {
  errorButton.removeEventListener('click', buttonOfErrorPopup)
}

//Добавление затемнения при ошибке + слушатели для закрытия затемнения
const errorSubmit = () => {
  main.append(templateError);

  templateError.addEventListener('click', removeErrorPopup);
  window.addEventListener('keydown', escKeyDownError);
  errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', buttonOfErrorPopup)
}




const setUserFormClean = (clean) => {
  cleanButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clean();
  })
}


const setUserFormSubmit = (onSuccess) => {
  formSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => successSubmit(onSuccess),
      () => errorSubmit(),
      new FormData(evt.target),
    );

  })
}


const changeFilterType = (cb) => {
  housingType.addEventListener('change', () => {
    cb()
  })
}

const changeFilterPrice = (cb) => {
  housingPrice.addEventListener('change', () => {
    cb()
  })
}

const changeFilterRooms = (cb) => {
  housingRooms.addEventListener('change', () => {
    cb()
  })
}

const changeFilterGuests = (cb) => {
  housingGuests.addEventListener('change', () => {
    cb()
  })
}


const changeFilterFeatures = (cb) => {
  housingFeatures.addEventListener('change', () => {
    cb()
  })
}



export { getDisabledFilter, getDisabledForm, address, setUserFormSubmit, setUserFormClean, cleanForm, changeFilterType, changeFilterPrice, changeFilterRooms, changeFilterGuests, changeFilterFeatures};

