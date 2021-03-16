/* global L:readonly */
import { getDisabledFilter, getDisabledForm, address, cleanForm } from './form.js';
import { createCustomPopup } from './card.js';



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
    getDisabledForm(false)
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
  map.setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);
}

const setFilterforType = (promo) => {
  const housingTypeValue = document.querySelector('#housing-type').value;
  if (housingTypeValue === 'any') {
    return true;
  }
  return promo.offer.type === housingTypeValue;
}



const setFilterForPrice = (promo) => {
  const PRICES = {
    middle: promo.offer.price >= 10000 && promo.offer.price <= 50000,
    low: promo.offer.price < 10000,
    high: promo.offer.price >= 50000,
    // any: promo.offer.price <= 10000 || promo.offer.price >= 50000,
    any: promo.offer.price,
  }
  const housingPriceValue = document.querySelector('#housing-price').value;
  return PRICES[housingPriceValue]
}

const setFilterForRooms = (promo) => {
  const housingRoomsValue = document.querySelector('#housing-rooms').value;
  if (housingRoomsValue === promo.offer.rooms.toString()) {
    return true
  } else if (housingRoomsValue === 'any') {
    return true
  }
}

const setFilterForGuests = (promo) => {
  const housingGuestsValue = document.querySelector('#housing-guests').value;
  if (housingGuestsValue === promo.offer.guests.toString()) {
    return true
  } else if (housingGuestsValue === 'any') {
    return true
  }
}

const setFilterForFeatures = (promo) => {
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  let checkedFeatures = [];
  housingFeatures.forEach((element) => {
    if (element.checked) {
      promo.offer.features.includes(element.value) ? checkedFeatures.push(true) : checkedFeatures.push(false)
    }
  })

  return checkedFeatures.includes(false) ? false : true;
}


let markers = L.layerGroup();


const createPin = (array) => {
  //L.clearLayers();
  map.removeLayer(markers)
  markers.clearLayers()
  let newArr = array
    .filter(setFilterforType)
    .filter(setFilterForPrice)
    .filter(setFilterForRooms)
    .filter(setFilterForGuests)
    .filter(setFilterForFeatures)
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
  getDisabledFilter(false)
}

const cleanFormUser = () => {
  cleanForm();
  cleanMap();
}


export { createPin, cleanMap, cleanFormUser }


