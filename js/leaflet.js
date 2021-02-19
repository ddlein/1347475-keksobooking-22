/* global L:readonly */
import {getDisabled, ADDRESS} from './form.js';
import {similarPromo} from './card.js'
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
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

ADDRESS.value = `${LAT}, ${LNG}`;

mainPinMarker.on('moveend', (evt) => {
  ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lat.toFixed(5)}`;
});


similarPromo.forEach(({location}) => {
  const pinMarker = L.marker({
    lat: location.x,
    lng: location.y,
  })
  pinMarker.addTo(map)
})
