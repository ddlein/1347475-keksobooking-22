import './data.js';
import './card.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {createMakePin, showError, cleanMap} from './map.js';
import {setUserFormSubmit} from './form.js'

getData(createMakePin, showError)

setUserFormSubmit(cleanMap)
