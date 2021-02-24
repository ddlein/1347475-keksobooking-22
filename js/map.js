/* global L:readonly */
import {getDisabled,ADDRESS} from './form.js';
import {createCustomPopup} from './card.js';
import {fillSimilarPromo} from './data.js';


const LAT = 35.681700;
const LNG = 139.75388;
const SCALE = 12;
const MAIN_PIN_WIDTH = 52;
const PIN_WIDTH = 40;
let getLanLng = 0;
const SIMILAR_PROMO = fillSimilarPromo();

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
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_WIDTH],
} );

const mainPinMarker = L.marker({
  lat: LAT,
  lng: LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
} );

mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  getLanLng = evt.target.getLatLng()
  ADDRESS.value = `${getLanLng.lat.toFixed(5)}, ${getLanLng.lng.toFixed(5)}`;
});


// similarPromo.forEach(({location}) => {
//   const pinMarker = L.marker({
//     lat: location.x,
//     lng: location.y,
//   })
//   pinMarker.addTo(map)
// })



// console.log(createCustomPopup(similarPromo[0]));

SIMILAR_PROMO.forEach((promo) => {
  const pinMarkerIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [PIN_WIDTH, PIN_WIDTH],
    iconAnchor: [PIN_WIDTH / 2, PIN_WIDTH],
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
