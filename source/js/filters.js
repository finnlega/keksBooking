/* global _:readonly */

import {mapFilters} from './form.js';
import {deletePin, setPin} from './map.js';
import {SIMILAR_ADVERTISEMENT_COUNT} from './api.js';
import {getData} from './storage.js';

const RERENDER_DELAY = 500;

const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

// чекбоксы

const checkboxWifi = housingFeatures.querySelector('#filter-wifi');
const checkboxDishwasher = housingFeatures.querySelector('#filter-dishwasher');
const checkboxParking = housingFeatures.querySelector('#filter-parking');
const checkboxWasher = housingFeatures.querySelector('#filter-washer');
const checkboxElevator = housingFeatures.querySelector('#filter-elevator');
const checkboxConditioner = housingFeatures.querySelector('#filter-conditioner');

let isWifiChecked = false;
let isDishwasherChecked = false;
let isParkingChecked = false;
let isWasherChecked = false;
let isElevatorChecked = false;
let isConditionerChecked = false;

const handleCheckboxChange = () => {
  isWifiChecked = checkboxWifi.checked;
  isDishwasherChecked = checkboxDishwasher.checked;
  isParkingChecked = checkboxParking.checked;
  isWasherChecked = checkboxWasher.checked;
  isElevatorChecked = checkboxElevator.checked;
  isConditionerChecked = checkboxConditioner.checked;
}

// обработчик события по фильтрам (тип жилья, стоимость, число комнат, число гостей)

const filterType = (type, cb) => {
  type.addEventListener('change', () => {
    cb();
  })
}

// обработчик события по фильтру features

const checkBoxType = (type, cb) => {
  type.addEventListener('change', (evt) => {
    handleCheckboxChange();
    cb(evt.target);
  });
}

const checkFirst = (element, param) => {
  if (param.value !== 'any') {
    return element.offer.type === param.value
  }
  return element;
}

const checkSecond = (element, param) => {
  if (param.value !== 'any') {
    return Number(element.offer.rooms) === Number(param.value)
  }
  return element;
}

const checkThird = (element, param) => {
  if (param.value === 'low') {
    return element.offer.price > 0 && element.offer.price <= 10000;
  }
  else if (param.value === 'middle') {
    return element.offer.price > 10000 && element.offer.price <= 50000;
  }
  else if (param.value === 'high') {
    return element.offer.price > 50000;
  }
  else if (param.value === 'any') {
    return element;
  }
}

const checkFourth = (element, param) => {
  if (Number(param.value) === 0) {
    return Number(element.offer.guests) === 100;
  }
  else if (Number(param.value) !== 0 && param.value !== 'any') {
    return Number(element.offer.guests) === Number(param.value);
  } else {
    return element;
  }
}

const checkFifth = (element, param, filterFeaturesIsTrue) => {
  try {
    if (element.offer.features.length !== 0) {
      for (let j = 0; j < element.offer.features.length; j++) {
        if (filterFeaturesIsTrue) {
          if (element.offer.features[j] === param.value) {
            return element;
          }
        } else {
          return element;
        }
      }
    }
  } catch (err) {
  }
}

const filters = () => {
  let data = [];
  data = getData();
  const result = data.filter( element => (checkFirst(element, housingType) && checkSecond(element, housingRooms) && checkThird(element, housingPrice) && checkFourth(element, housingGuests)
                                            && checkFifth(element, checkboxWifi, isWifiChecked) && checkFifth(element, checkboxDishwasher, isDishwasherChecked)
                                            && checkFifth(element, checkboxParking, isParkingChecked) && checkFifth(element, checkboxWasher, isWasherChecked)
                                            && checkFifth(element, checkboxElevator, isElevatorChecked) && checkFifth(element, checkboxConditioner, isConditionerChecked)));
  if (result.length !== 0) {
    deletePin();
    setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  } else {
    deletePin();
  }
}

filterType(housingType, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

filterType(housingRooms, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

filterType(housingPrice, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

filterType(housingGuests, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxWifi, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxDishwasher, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxParking, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxWasher, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxElevator, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));

checkBoxType(checkboxConditioner, _.debounce(
  () => filters(),
  RERENDER_DELAY,
));
