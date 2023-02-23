import {createItem} from './util.js';
import {createPhoto} from './util.js';

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
      case 'hotel':
      popupElement.querySelector('.popup__type').textContent = 'Отель';
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
