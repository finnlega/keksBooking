import { synchronizeField } from './util.js';

const form = document.querySelector('.ad-form');
const fieldsetForm = form.querySelectorAll('.ad-form__element');
const formHeader = form.querySelector('.ad-form-header');

const mapFilters = document.querySelector('.map__filters');
const formFilters = mapFilters.querySelectorAll('.map__filter');
const mapFeature = mapFilters.querySelector('.map__features');

const formType = form.querySelector('#type');
// const typeSelect = formType.children;
const formPrice = document.querySelector('#price');

const formTimeIn = form.querySelector('#timein');
const timeIn = formTimeIn.children;
const formTimeOut = form.querySelector('#timeout');
const timeOut = formTimeOut.children;
const addressForm =  document.getElementById('address');

// let arrayType = [];

// for (let iterator of typeSelect) {
//   arrayType.push(iterator.value);
// }
// console.log(arrayType);
// console.log(formPrice);

const getPrice = formType.addEventListener('change', function () {

  if(formType.value === 'bungalow') {
    formPrice.placeholder = 0;
  } else if (formType.value === 'flat') {
    formPrice.placeholder = 1000;
  } else if (formType.value === 'house') {
    formPrice.placeholder = 5000;
  } else if (formType.value === 'palace') {
    formPrice.placeholder = 10000;
  }
  return formPrice.placeholder;
});


synchronizeField(formTimeIn,timeOut);
synchronizeField(formTimeOut,timeIn);

// устанавливаем disabled для родителей элементов формы и навешиваем класс .ad-form--disabled для самой формы и фильтров

const setStateForm = (state) => {
  if (state === true) {
    form.classList.add('.ad-form--disabled');
    formHeader.disabled = true;
    addressForm.disabled = true;
    for (let elementField of fieldsetForm) {
      elementField.disabled = true;
    }

    mapFilters.classList.add('.ad-form--disabled');
    mapFeature.disabled = true;

    for (let elementFilter of formFilters) {
      elementFilter.disabled = true;
    }

  } else {
    form.classList.remove('.ad-form--disabled');
    formHeader.disabled = false;

    for (let elementField of fieldsetForm) {
      elementField.disabled = false;
    }

    mapFilters.classList.remove('.ad-form--disabled');
    mapFeature.disabled = false;

    for (let elementFilter of formFilters) {
      elementFilter.disabled = false;
    }
  }
};

setStateForm(true);

export { setStateForm, addressForm };

