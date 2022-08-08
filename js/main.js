// Функция возвращает целое число из диапазона
const getRandomInt = (min, max) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  if (max < min) {
    const saveValue = max;
    max = min;
    min = saveValue;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Функция, возвращающая географические коордионаты.

const getRandomlocation = (min, max, quantitySymbol) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  if (max < min) {
    const saveValue = max;
    max = min;
    min = saveValue;
  }

  let swapNumber = Math.random() * (max - min) + min;
  return swapNumber.toFixed(quantitySymbol);
}

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
    return 'img/avatars/user0' + getRandomInt(1,10) + '.png';
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
  title: 'Жилье',
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

// Функция, возвращающает элемент массива.
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length-1)];
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
    features: getRandomArrayElement(OFFER.features),
    descriptions: OFFER.description,
    photos: getRandomArrayElement(OFFER.photos),
  };
};

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => getAdvertisement());
console.log(similarAdvertisement);
