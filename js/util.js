const ALERT_SHOW_TIME = 5000;
const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

// Получение целого числа из диапазона
const getRandomInt = (min, max) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  if (max < min) {
    const saveValue = max;
    max = min;
    min = saveValue;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// Получение географических координат

const getRandomlocation = (min, max, quantitySymbol) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  if (max < min) {
    const saveValue = max;
    max = min;
    min = saveValue;
  }

  let swapNumber = Math.random() * (max - min) + min;
  return swapNumber.toFixed(quantitySymbol);
}

// Получить элемент массива

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length-1)];
};

// Создать новый случайный массив

const createArray = function (array) {

  const indexArray = [getRandomInt(0, array.length-1)];
  // console.log('Новый массив ограничен индексом:'+ ' ' + indexArray);
  const newArray = [];
  for (let i = 0; i <= indexArray; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

// Заполнить случайными элементами массива (features)

const createItem = function (firstElement, secondElement) {
  for (let j = 0; j <= firstElement.length-1; j++) {
    firstElement[j].textContent = secondElement[j];
    if (firstElement[j].textContent === '') {
      firstElement[j].classList.add('hidden');
    }
  }
  return function () {

    return firstElement.textContent = secondElement;
  }
};

// Добавить массив (photo)
const createPhoto = function (firstItem, secondItem, parentItem) {
  firstItem.remove();
  for (let i = 0; i < secondItem.length; i++) {
    firstItem.src = secondItem[i];
    parentItem.appendChild(firstItem.cloneNode());
  }

  return function () {

    return firstItem.src = secondItem;
  }
}

// Синхронизация полей формы

const synchronizeField = (formfield, selectValues) => {
  formfield.addEventListener('change',  function() {
    const currentValue = this.value;

    for (let i = 0; i <= selectValues.length-1; i++ ) {
      if (currentValue === selectValues[i].value) {
        selectValues[i].selected = true;
      }
    }
  });
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#cca6ac';
  alertContainer.style.margin= 'auto';
  alertContainer.style.width = '1200px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const checkEsc = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}


export { getRandomInt, getRandomlocation, getRandomArrayElement, createArray, createItem, createPhoto, synchronizeField, showAlert, checkEsc };
