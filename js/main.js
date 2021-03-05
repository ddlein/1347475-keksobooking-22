import './data.js';
import './card.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {createPin, cleanFormUser} from './map.js';
import {setUserFormSubmit, setUserFormClean } from './form.js';
import {showError} from './util.js';

getData(createPin, showError)

// setUserFormSubmit(cleanMap)

// setUserFormClean(cleanMap)

setUserFormSubmit(cleanFormUser)

setUserFormClean(cleanFormUser)

