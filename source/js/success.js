import {checkEsc} from './util.js';

// Показ сообщения об успешной отправке объявления

const showMessageSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__message');
  document.body.insertBefore(successElement, null);
  return successElement;
};

// Закрытие модального окна с сообщением успешной отправки объявления

const closeModalWindow = () => {
  const element = document.querySelector('.success');
  document.addEventListener('keydown', (evt) => {
    if (checkEsc(evt)) {
      evt.preventDefault();
      element.remove();
    }
  });

  document.addEventListener('click', () => {
    element.remove();
  });
};

export {showMessageSuccess, closeModalWindow };
