import { synchronizeField  } from './util.js';
// const MIN_TITLE_LENGTH = 30;
// const MAX_TITLE_LENGTH = 100;
// const MAX_PRICE =1000000;
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
// const formDescription = form.querySelector('#description');
// const formFeatures = form.querySelector('.features');
// const formFeature = formFeatures.children;

const ckeckPrice = () =>{
  formType.addEventListener('change', () => {
    if (formType.value === 'bungalow') {
      formPrice.placeholder = 0;
      minPrice = 0;
    } else if (formType.value === 'flat') {
      formPrice.placeholder = 1000;
      minPrice = 1000;
    } else if (formType === 'hotel') {
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

// // Проверки на заполнение полей формы

// // Проверка заголовка формы

// formTitle.addEventListener('input', ()=> {

//   const valueLength = formTitle.value.length;

//   if (valueLength < MIN_TITLE_LENGTH) {
//     formTitle.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
//   } else if (valueLength > MAX_TITLE_LENGTH) {
//     formTitle.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
//   } else {
//     formTitle.setCustomValidity('');
//   }

//   formTitle.reportValidity();
// });

// // Проверка минимальной цены

// const enterPrice = () => {
//   formPrice.addEventListener('input', () => {
//     const valuePrice = formPrice.value;
//     if (valuePrice > MAX_PRICE ) {
//       formPrice.setCustomValidity(`Вы ввели цену превышающую ${MAX_PRICE} руб` );
//     } else if (valuePrice < minPrice) {
//       formPrice.setCustomValidity(`Вы ввели цену меньше минимальной на ${minPrice - valuePrice} рублей`);
//     }
//     else {
//       formPrice.setCustomValidity('');
//     }
//     formPrice.reportValidity();
//   });

// };

// enterPrice();

// // Проверка соответствия кол-ва комнат кол-ву мест.

// // 1 комната — «для 1 гостя»;
// // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// // 100 комнат — «не для гостей».

// const chooseRooms = () => {
//   const defaultValue = formRoomNumber.value;
//   for (let i = 0; i < formCapacity.length; i++) {
//     if (formCapacity[i].value === defaultValue) {
//       formCapacity[i].disabled = false;
//     } else {
//       formCapacity[i].disabled = true;
//     }
//   }

//   formRoomNumber.addEventListener('change', () => {
//     const currentValue = formRoomNumber.value;
//     for (let j = 0; j < formCapacity.length; j++) {
//       if (Number(currentValue) === 100) {
//         if (Number(formCapacity[j].value) !== 0) {
//           formCapacity[j].disabled = true;
//         }
//         else {
//           formCapacity[j].disabled = false;
//         }
//       } else if (Number(currentValue) >= Number(formCapacity[j].value) && (Number(formCapacity[j].value) !== 0)) {
//         formCapacity[j].disabled = false;
//       } else if (Number(currentValue) !== Number(formCapacity[j].value) && Number(currentValue) !== 100) {
//         formCapacity[j].disabled = true;
//       }
//     }
//   });
// };

// chooseRooms();

// Поля формы при нажатии кнопки "Очистить"

// const setFieldFormDefault = () => {
//   formTitle.value = '';
//   formType.value = 'flat';
//   formPrice.value = '';
//   formTimeIn.value = '12:00';
//   formTimeOut.value = '12:00';
//   formRoomNumber.value = '1';
//   formCapacity.value = '1';
//   formDescription.value = '';
// };


// const sendUserFormSubmit = () => {

//   form.addEventListener('submit', (evt)=>{

//     evt.preventDefault();
//     const formData = new FormData(evt.target);
//     fetch(
//       'https://23.javascript.pages.academy/keksobooking',
//       {
//         method: 'POST',
//         body: formData,
//       },

//     )
//       .then((response) => {
//         if (response.ok) {
//           console.log('done');
//           // resetfieldForm();

//           // document.appendChild(showMessageSuccess());
//           // onSuccess();

//         } else {
//           showAlert('Фиг вам');
//         }
//       })
//       .catch(() => {
//         // showMessageSuccess();
//         showAlert('Как же так');
//       });
//   });
// };


export { setStateForm, addressForm, form, formTitle, formPrice, formRoomNumber, formCapacity, minPrice, resetForm, mapFilters };

