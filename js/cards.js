import {similarAdvertisement} from './data.js';
import {createItem} from './util.js';
import {createPhoto} from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;

const cardItem = cardTemplate.querySelector('.popup');
const advertisementElement = cardItem.cloneNode(true);
const popupTitle = advertisementElement.querySelector('.popup__title');
const popupAddress = advertisementElement.querySelector('.popup__text--address');
const popupPrice = advertisementElement.querySelector('.popup__text--price');
const popupType = advertisementElement.querySelector('.popup__type');
const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');
const popupTime = advertisementElement.querySelector('.popup__text--time');
const popupFeatures = advertisementElement.querySelector('.popup__features');
const popupFeature = popupFeatures.children;
const popupDescription = advertisementElement.querySelector('.popup__description');
const popupPhotos = advertisementElement.querySelector('.popup__photos');
const popupPhoto = popupPhotos.querySelector('.popup__photo');
const popupAvatar = advertisementElement.querySelector('.popup__avatar');

popupTitle.textContent = similarAdvertisement[0].title;

popupAddress.textContent = similarAdvertisement[0].address;

popupPrice.textContent = `${similarAdvertisement[0].price} ₽/ночь`;

switch (similarAdvertisement[0].type) {
  case 'palace':
    popupType.textContent = 'Дворец';
    break;
  case 'house':
    popupType.textContent = 'Дом';
    break;
  case 'bungalow':
    popupType.textContent = 'Бунгало';
    break;
  default:
    popupType.textContent = 'Квартира';
}

popupCapacity.textContent = `${similarAdvertisement[0].rooms} комнаты для ${similarAdvertisement[0].guests} гостей`;

popupTime.textContent = `Заезд после ${similarAdvertisement[0].checkin}, выезд до ${similarAdvertisement[0].checkout}`;

createItem(popupFeature, similarAdvertisement[0].features);

popupDescription.textContent = similarAdvertisement[0].descriptions;

createPhoto(popupPhoto, similarAdvertisement[0].photos, popupPhotos);

popupAvatar.src = similarAdvertisement[0].author;

mapCanvas.appendChild(advertisementElement);
