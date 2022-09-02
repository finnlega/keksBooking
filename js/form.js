import { synchronizeField } from './util.js';

const form = document.querySelector('.ad-form');
const formType = form.querySelector('#type');
// const typeSelect = formType.children;
const formPrice = document.querySelector('#price');

const formTimeIn = form.querySelector('#timein');
const timeIn = formTimeIn.children;
const formTimeOut = form.querySelector('#timeout');
const timeOut = formTimeOut.children;

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

console.log(getPrice);
synchronizeField(formTimeIn,timeOut);
synchronizeField(formTimeOut,timeIn);
