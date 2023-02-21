import { formTitle, formPrice, formRoomNumber, formCapacity, minPrice} from './form.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE =1000000;

// Проверки на заполнение полей формы

// // Проверка заголовка формы

formTitle.addEventListener('input', ()=> {

  const valueLength = formTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
});

// Проверка минимальной цены

const enterPrice = () => {

  formPrice.addEventListener('input', () => {

    const valuePrice = formPrice.value;
    if (valuePrice > MAX_PRICE ) {
      formPrice.setCustomValidity(`Вы ввели цену превышающую ${MAX_PRICE} руб` );
    } else if (valuePrice < minPrice) {
      formPrice.setCustomValidity(`Вы ввели цену меньше минимальной на ${minPrice - valuePrice} рублей`);
    }
    else {
      formPrice.setCustomValidity('');
    }
    formPrice.reportValidity();
  });

};

enterPrice();

// Проверка соответствия кол-ва комнат кол-ву мест.

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const chooseRooms = () => {
  const defaultValue = formRoomNumber.value;
  for (let i = 0; i < formCapacity.length; i++) {
    if (formCapacity[i].value === defaultValue) {
      formCapacity[i].disabled = false;
    } else {
      formCapacity[i].disabled = true;
    }
  }

  formRoomNumber.addEventListener('change', () => {
    const currentValue = formRoomNumber.value;
    for (let j = 0; j < formCapacity.length; j++) {
      if (Number(currentValue) === 100) {
        if (Number(formCapacity[j].value) !== 0) {
          formCapacity[j].disabled = true;
        }
        else {
          formCapacity[j].disabled = false;
        }
      } else if (Number(currentValue) >= Number(formCapacity[j].value) && (Number(formCapacity[j].value) !== 0)) {
        formCapacity[j].disabled = false;
      } else if (Number(currentValue) !== Number(formCapacity[j].value) && Number(currentValue) !== 100) {
        formCapacity[j].disabled = true;
      }
    }
  });
};

chooseRooms();
