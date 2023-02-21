import {checkEsc} from './util.js';
// Показ сообщения об успешной отправке объявления

const showMessageError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__message');
  document.body.insertBefore(errorElement, null);
  return errorElement;
};

const closeModalWindowError = () => {
  const element = document.querySelector('.error');
  const buttonError = document.querySelector('.error__button');
  document.addEventListener('keydown', (evt) => {
    if (checkEsc(evt)) {
      evt.preventDefault();
      element.remove();
    }
  });

  document.addEventListener('click', () => {
    element.remove();
  });

  buttonError.addEventListener('click', () => {
    element.remove();
  })
};

export {showMessageError, closeModalWindowError};
