import {createItem} from './util.js';
import {createPhoto} from './util.js';
// import {getRandomArrayElement} from './util.js';
// const mapCanvas = document.querySelector('#map-canvas');
// const cardTemplate = document.querySelector('#card').content;

// const cardItem = cardTemplate.querySelector('.popup');
// const advertisementElement = cardItem.cloneNode(true);
// const popupTitle = advertisementElement.querySelector('.popup__title');
// const popupAddress = advertisementElement.querySelector('.popup__text--address');
// const popupPrice = advertisementElement.querySelector('.popup__text--price');
// const popupType = advertisementElement.querySelector('.popup__type');
// const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');
// const popupTime = advertisementElement.querySelector('.popup__text--time');
// const popupFeatures = advertisementElement.querySelector('.popup__features');
// const popupFeature = popupFeatures.children;
// const popupDescription = advertisementElement.querySelector('.popup__description');
// const popupPhotos = advertisementElement.querySelector('.popup__photos');
// const popupPhoto = popupPhotos.querySelector('.popup__photo');
// const popupAvatar = advertisementElement.querySelector('.popup__avatar');


// const getTemplate = (param, increment) => {
//   // popupTitle.textContent = similarAdvertisement[0].title;

//   // popupAddress.textContent = similarAdvertisement[0].address;

//   // popupPrice.textContent = `${similarAdvertisement[0].price} ₽/ночь`;

//   // switch (similarAdvertisement[0].type) {
//   //   case 'palace':
//   //     popupType.textContent = 'Дворец';
//   //     break;
//   //   case 'house':
//   //     popupType.textContent = 'Дом';
//   //     break;
//   //   case 'bungalow':
//   //     popupType.textContent = 'Бунгало';
//   //     break;
//   //   default:
//   //     popupType.textContent = 'Квартира';
//   // }

//   // popupCapacity.textContent = `${similarAdvertisement[0].rooms} комнаты для ${similarAdvertisement[0].guests} гостей`;

//   // popupTime.textContent = `Заезд после ${similarAdvertisement[0].checkin}, выезд до ${similarAdvertisement[0].checkout}`;

//   // createItem(popupFeature, similarAdvertisement[0].features);

//   // popupDescription.textContent = similarAdvertisement[0].descriptions;

//   // createPhoto(popupPhoto, similarAdvertisement[0].photos, popupPhotos);

//   mapCanvas.appendChild(advertisementElement);

// }

const createCustomPopup = (point) => {

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = cardTemplate.cloneNode(true);
  const {author, offer} = point;
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  switch (offer.type) {
    case 'palace':
      popupElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'house':
      popupElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      popupElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    default:
      popupElement.querySelector('.popup__type').textContent = 'Квартира';
  }

  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  try {
    createItem (popupElement.querySelector('.popup__features').children, offer.features);
  } catch (err) {
    popupElement.querySelector('.popup__features').hidden = true;
  }
  popupElement.querySelector('.popup__description').textContent = offer.description;
  const popupPhoto = popupElement.querySelector('.popup__photo');
  try {
    createPhoto(popupPhoto, offer.photos, popupElement.querySelector('.popup__photos'));
  } catch (err) {
    popupElement.querySelector('.popup__photos').hidden = true;
  }

  return popupElement;
};

export {createCustomPopup};
