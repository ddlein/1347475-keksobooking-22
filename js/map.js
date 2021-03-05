/* global L:readonly */
import { getDisabled, ADDRESS, cleanForm} from './form.js';
import { createCustomPopup } from './card.js';
// import {
//   fillSimilarPromo
// } from './data.js';


const LAT = 35.681700;
const LNG = 139.75388;
const SCALE = 10;
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
    ADDRESS.value = `${LAT}, ${LNG}`;

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
  ADDRESS.value = `${getLanLng.lat.toFixed(5)}, ${getLanLng.lng.toFixed(5)}`;
});

const cleanMap = () => {
  let newLatLng = new L.LatLng(LAT, LNG);
  ADDRESS.value = `${LAT}, ${LNG}`;
  mainPinMarker.setLatLng(newLatLng);
}

const createPin = (array) => {
  array.forEach((promo) => {
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
      .addTo(map)
      .bindPopup(
        createCustomPopup(promo),
      );
  });
}

const cleanFormUser = () => {
  cleanForm();
  cleanMap();
}


export{createPin, cleanMap, cleanFormUser}


