const similarPromoTemplate = document.querySelector('#card').content.querySelector('.popup');

// Условие на тпп жилья
const getOfferType = (promoType) => {
  switch (promoType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}


// Функция создания одного Объявления с данными по типу шаблона в HTML (template)
const createCustomPopup = (promo) => {
  const promoNode = similarPromoTemplate.cloneNode(true);
  promoNode.querySelector('.popup__title').textContent = promo.offer.title;
  promoNode.querySelector('.popup__text--address').textContent = promo.offer.address;
  promoNode.querySelector('.popup__text--price').textContent = promo.offer.price + ' ₽/ночь';

  promoNode.querySelector('.popup__type').textContent = getOfferType(promo.offer.type);

  promoNode.querySelector('.popup__text--capacity').textContent =
    `${promo.offer.rooms} комнаты для ${promo.offer.guests} гостей`;

  promoNode.querySelector('.popup__text--time').textContent =
    `Заезд после ${promo.offer.checkin}, выезд до ${promo.offer.checkout}`;

  let ul = promoNode.querySelector('.popup__features');
  ul.innerHTML = '';
  for (let i = 0; i < promo.offer.features.length; i++) {
    let li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + promo.offer.features[i]);
    li.textContent = promo.offer.features[i];
    ul.appendChild(li);
  }
  if (ul.children.length === 0) {
    ul.style.display = 'none'
  }

  let divPhotos = promoNode.querySelector('.popup__photos');
  let popupPhoto = promoNode.querySelector('.popup__photo');
  divPhotos.innerHTML = '';
  for (let i = 0; i < promo.offer.photos.length; i++) {
    popupPhoto.src = promo.offer.photos[i];
    divPhotos.appendChild(popupPhoto.cloneNode(true))
  }

  promoNode.querySelector('.popup__description').textContent = promo.offer.description;


  promoNode.querySelector('.popup__avatar').src = promo.author.avatar;

  return promoNode;
}

export {createCustomPopup}
