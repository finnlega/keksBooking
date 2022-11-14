// Тестовые данные

import { getRandomInt } from './util.js';
import { getRandomlocation } from './util.js';
import { getRandomArrayElement} from './util.js';
import { createArray } from './util.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const RANGE_COORDINATES = {
  minX : 35.65000,
  maxX : 35.70000,
  minY : 139.70000,
  maxY : 139.80000,
};

const NUMBER_DECIMAL_PLACES = 5;

const AUTHOR = {
  avatar: () => {
    return 'img/avatars/user0' + getRandomInt(1,8) + '.png';
  },
};

const LOCATION = {
  x : () => {
    return getRandomlocation(RANGE_COORDINATES.minX, RANGE_COORDINATES.maxX, NUMBER_DECIMAL_PLACES);
  },
  y : () => {
    return getRandomlocation(RANGE_COORDINATES.minY, RANGE_COORDINATES.maxY, NUMBER_DECIMAL_PLACES);
  },
};

const OFFER = {
  title: 'Жилье, как в раю',
  address: () => {
    return LOCATION.x() + ', '+ LOCATION.y();
  },
  price: 0,
  type: ['palace', 'flat', 'house', 'bungalow'],
  rooms: 0,
  guests: 0,
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  description: 'Чистое помещение',
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
};

const getAdvertisement = () => {
  return {
    author: AUTHOR.avatar(),
    title: OFFER.title,
    address: OFFER.address(),
    price: getRandomInt(1, 100000),
    type: getRandomArrayElement(OFFER.type),
    rooms: getRandomInt(1, 100),
    guests: getRandomInt(1, 10),
    checkin: getRandomArrayElement(OFFER.checkin),
    checkout: getRandomArrayElement(OFFER.checkout),
    features: createArray(OFFER.features),
    descriptions: OFFER.description,
    photos: createArray(OFFER.photos),
  };
};

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => getAdvertisement());

export { similarAdvertisement};

