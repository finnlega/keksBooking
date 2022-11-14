import {mapFilters} from './form.js';
import {deletePin, setPin } from './map.js';
import {SIMILAR_ADVERTISEMENT_COUNT} from './api.js';

const housingType = mapFilters.querySelector('#housing-type');

const filterHouseType = (data) => {
  const arr = [];
  housingType.addEventListener('change', (evt) => {
    evt.preventDefault();
    deletePin();
    arr.length = 0;
    for (let element of data) {
      if (evt.target.value === element.offer.type) {
        arr.push(element);
        setPin(arr.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
        // console.log(arr);
      } else if (evt.target.value === 'any') {
        setPin(data.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
      }
    }
  });
};

export {filterHouseType};
