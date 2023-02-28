import { synchronizeField  } from './util.js';

let minPrice = 0;

const form = document.querySelector('.ad-form');
const fieldsetForm = form.querySelectorAll('.ad-form__element');
const formHeader = form.querySelector('.ad-form-header');
const resetForm  = form.querySelector('.ad-form__reset');

// Фильтры

const mapFilters = document.querySelector('.map__filters');
const formFilters = mapFilters.querySelectorAll('.map__filter');
const mapFeature = mapFilters.querySelector('.map__features');

// Поля формы

const formTitle = form.querySelector('#title');
const formType = form.querySelector('#type');
const formPrice = document.querySelector('#price');
const formTimeIn = form.querySelector('#timein');
const timeIn = formTimeIn.children;
const formTimeOut = form.querySelector('#timeout');
const timeOut = formTimeOut.children;
const addressForm =  document.querySelector('#address');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');

const ckeckPrice = () => {
  formType.addEventListener('change', () => {

    if (formType.value === 'bungalow') {
      formPrice.placeholder = 0;
      minPrice = 0;
    } else if (formType.value === 'flat') {
      formPrice.placeholder = 1000;
      minPrice = 1000;
    } else if (formType.value === 'hotel') {
      formPrice.placeholder = 3000;
      minPrice = 3000;
    } else if (formType.value === 'house') {
      formPrice.placeholder = 5000;
      minPrice = 5000;
    } else if (formType.value === 'palace') {
      formPrice.placeholder = 10000;
      minPrice = 10000;
    }
    return minPrice;
  });
};

ckeckPrice();
synchronizeField(formTimeIn,timeOut);
synchronizeField(formTimeOut,timeIn);


// устанавливаем disabled для родителей элементов формы и навешиваем класс .ad-form--disabled для самой формы и фильтров

const setStateForm = (state) => {
  if (state) {
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
    addressForm.disabled = false;
    addressForm.readOnly = true;
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

export { setStateForm, addressForm, form, formTitle, formPrice, formRoomNumber, formCapacity, minPrice, resetForm, mapFilters };

