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

export {getRandomInt, getRandomlocation, getRandomArrayElement};
