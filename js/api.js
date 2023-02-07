import {setPin, reverseFormState} from './map.js';
import {showAlert} from './util.js';
import {form} from './form.js';
import {showMessageSuccess, closeModalWindow} from './success.js';
import {showMessageError, closeModalWindowError} from './error.js';
import {setData} from './storage.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      setPin(json.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
      setData(json);
    })
    .catch(() => {
      showAlert('Не все данные загрузились. Попробуйте ещё раз');
    });

};

getData();

const sendUserFormSubmit = () => {

  form.addEventListener('submit', (evt)=>{

    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },

    )
      .then((response) => {
        if (response.ok) {
          showMessageSuccess();
          reverseFormState();
          closeModalWindow();
        }
      })
      .catch(() => {
        showMessageError();
        closeModalWindowError();
      });
  });
};

sendUserFormSubmit();

export { SIMILAR_ADVERTISEMENT_COUNT };
