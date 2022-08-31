// Функция возвращает целое число из диапазона
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

//Функция, возвращающая географические коордионаты.

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

// Функция, возвращающает элемент массива.
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length-1)];
};

// Функция создает новый случайный массив.
const createArray = function (array) {

  const indexArray = [getRandomInt(0, array.length-1)];
  // console.log('Новый массив ограничен индексом:'+ ' ' + indexArray);
  const newArray = [];
  for (let i = 0; i <= indexArray; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

// Функция заполяет случайными элементами массива features
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

// Функция добавления массива photo
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

export {getRandomInt, getRandomlocation, getRandomArrayElement, createArray, createItem, createPhoto};
