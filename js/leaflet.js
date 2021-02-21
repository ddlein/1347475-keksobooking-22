/* global L:readonly */
import {
  getDisabled,
  ADDRESS
} from './form.js';
import {
  similarPromo,
  similarPromoTemplate,
  getOfferType
} from './card.js'
// import {getRandomArbitrary, getRandomFixed} from './util.js'

const LAT = 35.681700;
const LNG = 139.75388;

const map = L.map('map-canvas')
  .on('load', () => {
    getDisabled(false)
    // console.log('UNblocked');

  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
} );

const mainPinMarker = L.marker({
  lat: LAT,
  lng: LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
} );

mainPinMarker.addTo(map);

ADDRESS.value = `${LAT}, ${LNG}`;

mainPinMarker.on('moveend', (evt) => {
  ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lat.toFixed(5)}`;
});


// similarPromo.forEach(({location}) => {
//   const pinMarker = L.marker({
//     lat: location.x,
//     lng: location.y,
//   })
//   pinMarker.addTo(map)
// })

const createCustomPopup = (promo) => {
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
  if (ul.children.length === 0) {
    ul.style.display = 'none'
  }

  let divPhotos = promoElement.querySelector('.popup__photos');
  let popupPhoto = promoElement.querySelector('.popup__photo');
  divPhotos.innerHTML = '';
  for (let i = 0; i < promo.offer.photos.length; i++) {
    popupPhoto.src = promo.offer.photos[i];
    divPhotos.appendChild(popupPhoto.cloneNode(true))
  }

  promoElement.querySelector('.popup__description').textContent = promo.offer.description;


  promoElement.querySelector('.popup__avatar').src = promo.author.avatar;

  return promoElement;
}

// console.log(createCustomPopup(similarPromo[0]));

similarPromo.forEach((promo) => {
  const pinMarkerIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const pinMarker = L.marker({
    lat: promo.location.x,
    lng: promo.location.y,
  }, {
    draggable: true,
    icon: pinMarkerIcon,
  } );

  pinMarker
    .addTo(map)
    .bindPopup(
      createCustomPopup(promo),
    );
});
