/* global L:readonly */
import { getDisabled, ADDRESS } from './form.js';
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
  mainPinMarker.setLatLng(newLatLng);
  ADDRESS.value = `${LAT}, ${LNG}`;
  console.log(`${LAT}, ${LNG}`)
}

const createMakePin = (array) => {
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

const showError = (error) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = error;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}













// console.log(successSubmit());
// const formSubmit = document.querySelector('.ad-form');


// formSubmit.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const formData = new FormData(evt.target)
//   // console.log(formData);
//   fetch(
//     ' https://22.javascript.pages.academy/keksobooking', {
//       method: 'POST',
//       body: formData,
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         cleanForm()
//         // console.log(formData);
//         successSubmit()
//       } else {
//         errorSubmit()
//       }
//     })
//     .catch(() => {
//       // console.log(err);
//       errorSubmit()
//     })
// })

export{createMakePin, showError, cleanMap}


