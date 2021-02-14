import {similarPromo} from './data.js';

// console.log(similarPromo);

const similarListElement = document.querySelector('.map__canvas');
const similarPromoTemplate = document.querySelector('#card').content.querySelector('.popup');

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

similarPromo.forEach((promo) => {
  const promoElement = similarPromoTemplate.cloneNode(true);
  promoElement.querySelector('.popup__title').textContent = promo.offer.title;
  promoElement.querySelector('.popup__text--address').textContent = promo.offer.address;
  promoElement.querySelector('.popup__text--price').textContent = promo.offer.price + ' ₽/ночь';

  promoElement.querySelector('.popup__type').textContent = getOfferType(promo.offer.type);

  promoElement.querySelector('.popup__text--capacity').textContent =
    `${promo.offer.rooms} комнаты для ${promo.offer.guests} гостей`;

  promoElement.querySelector('.popup__text--time').textContent =
    `Заезд после ${promo.offer.checkin}, выезд до ${promo.offer.checkout}`;

  let ul = promoElement.querySelector('.popup__features');
  ul.innerHTML = '';
  for (let i = 0; i < promo.offer.features.length; i++) {
    let li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + promo.offer.features[i]);
    li.textContent = promo.offer.features[i];
    ul.appendChild(li);
  }

  let divPhotos = promoElement.querySelector('.popup__photos');
  let popupPhoto = promoElement.querySelector('.popup__photo');
  divPhotos.innerHTML = '';
  for (let i = 0; i < promo.offer.photos.length; i++) {
    popupPhoto.src = promo.offer.photos[i];
    divPhotos.appendChild(popupPhoto.cloneNode(true))
  }

  promoElement.querySelector('.popup__description').textContent = promo.offer.description;


  promoElement.querySelector('.popup__avatar').src = promo.author.avatar
  similarListElement.appendChild(promoElement);
});
