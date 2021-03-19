/* global _:readonly */

import './card.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {createPin, cleanFormUser} from './map.js';
import {setUserFormSubmit, setUserFormClean, changeFilterType, changeFilterPrice, changeFilterRooms, changeFilterGuests,changeFilterFeatures} from './form.js';
import {showError} from './util.js';
import './avatar.js';

const RERENDER_DELAY = 500;

getData((promos) => {
  createPin(promos);
  changeFilterType(_.debounce(() => createPin(promos), RERENDER_DELAY))
  changeFilterPrice(_.debounce(() => createPin(promos), RERENDER_DELAY))
  changeFilterRooms(_.debounce(() => createPin(promos), RERENDER_DELAY))
  changeFilterGuests(_.debounce(() => createPin(promos), RERENDER_DELAY))
  changeFilterFeatures(_.debounce(() => createPin(promos), RERENDER_DELAY))
}, showError)

setUserFormSubmit(cleanFormUser)

setUserFormClean(cleanFormUser)

