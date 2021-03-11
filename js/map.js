/* global L:readonly */
import { getDisabled, address, cleanForm } from './form.js';
import { createCustomPopup } from './card.js';
// import {
//   fillSimilarPromo
// } from './data.js';


const LAT = 35.681700;
const LNG = 139.75388;
const SCALE = 10;
const SIMILAR_PROMO_COUNT = 10;

const MAIN_PIN = {
  width: 52,
  height: 52,
  icon: '../img/main-pin.svg',
}

const PIN = {
  width: 40,
  height: 40,
  icon: '../img/pin.svg',
}

const map = L.map('map-canvas')
  .on('load', () => {
    getDisabled(false)
    address.value = `${LAT}, ${LNG}`;

  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN.icon,
  iconSize: [MAIN_PIN.width, MAIN_PIN.height],
  iconAnchor: [MAIN_PIN.width / 2, MAIN_PIN.height],
});

const mainPinMarker = L.marker({
  lat: LAT,
  lng: LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
});



mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  let getLanLng = evt.target.getLatLng();
  address.value = `${getLanLng.lat.toFixed(5)}, ${getLanLng.lng.toFixed(5)}`;
});

const cleanMap = () => {
  let newLatLng = new L.LatLng(LAT, LNG);
  address.value = `${LAT}, ${LNG}`;
  mainPinMarker.setLatLng(newLatLng);
}

const setFilterforType = (promo) => {
  const housingTypeValue = document.querySelector('#housing-type').value;
  // if (promo.offer.type === housingTypeValue) {
  //   console.log('type selected');
  //   // console.log(1);
  //   return promo
  // } else if (housingTypeValue === 'any') {
  //   console.log('type any');
  //   return promo
  // }


  if (housingTypeValue === 'any') {
    return true;
  }
  return promo.offer.type === housingTypeValue;

  // const HOUSING_PRICE = document.querySelector('#housing-price');
  // if (promo.offer.price === HOUSING_PRICE.value) {
  //   return promo
  // } else if (HOUSING_PRICE.value === 'any') {
  //   return promo
  // }
}



const setFilterForPrice = (promo) => {
  const PRICES = {
    middle: promo.offer.price >= 10000 && promo.offer.price <= 50000,
    low: promo.offer.price < 10000,
    high: promo.offer.price >= 50000,
    any: promo.offer.price <= 10000 || promo.offer.price >= 50000,
    // any: promo.offer.type,
  }
  const housingPriceValue = document.querySelector('#housing-price').value;
  console.log(PRICES[housingPriceValue]);
  return PRICES[housingPriceValue]
  // if (promo.offer.price >= PRICES.middle.min && promo.offer.price <= PRICES.middle.max) {
  //   return promo
  // } else if (promo.offer.price < PRICES[housingPriceValue]) {
  //   console.log('low');
  //   return promo
  // } else if (promo.offer.price > PRICES[housingPriceValue]) {
  //   console.log('high');
  //   return promo
  // } else {
  //   console.log('any');
  //   return promo
  // }
}


let markers = L.layerGroup();


const createPin = (array) => {
  //L.clearLayers();
  // console.log('open');
  map.removeLayer(markers)
  markers.clearLayers()
  // console.log(markers);
  let newArr = array
    .filter(setFilterforType)
    .filter(setFilterForPrice)
    .slice(0, SIMILAR_PROMO_COUNT)
  newArr
    .forEach((promo) => {
      const pinMarkerIcon = L.icon({
        iconUrl: PIN.icon,
        iconSize: [PIN.width, PIN.height],
        iconAnchor: [PIN.width / 2, PIN.height],
      });

      const pinMarker = L.marker({
        lat: promo.location.lat,
        lng: promo.location.lng,
      }, {
        draggable: false,
        icon: pinMarkerIcon,
      });

      pinMarker
        .addTo(markers)
        .bindPopup(
          createCustomPopup(promo),
        );
    });

  markers.addTo(map)
}

const cleanFormUser = () => {
  cleanForm();
  cleanMap();
}


export { createPin, cleanMap, cleanFormUser }


