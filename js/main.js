import './data.js';
import './card.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {createPin, cleanFormUser} from './map.js';
import {setUserFormSubmit, setUserFormClean, changeFilterType /*changeFilterPrice */ } from './form.js';
import {showError} from './util.js';


getData((prs) => {
  createPin(prs);
  changeFilterType(() => createPin(prs))
  // changeFilterPrice(() => createPin(prs))
}, showError)

setUserFormSubmit(cleanFormUser)

setUserFormClean(cleanFormUser)

