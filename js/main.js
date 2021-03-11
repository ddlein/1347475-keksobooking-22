/* global _:readonly */
import './data.js';
import './card.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {createPin, cleanFormUser} from './map.js';
import {setUserFormSubmit, setUserFormClean, changeFilterType, changeFilterPrice} from './form.js';
import {showError} from './util.js';


getData((promos) => {
  createPin(promos);
  changeFilterType(() => createPin(promos))
  changeFilterPrice(() => createPin(promos))
}, showError)

setUserFormSubmit(cleanFormUser)

setUserFormClean(cleanFormUser)

