import {mapFilters} from './form.js';
import {deletePin, setPin} from './map.js';
import {SIMILAR_ADVERTISEMENT_COUNT} from './api.js';
import {getData} from './storage.js';

const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const housingInput =  housingFeatures.querySelectorAll('input');

const filterType = (type) => {
  type.addEventListener('change', () => {
    filters(filterType(type));
  });
};

const checkFirst = (element, param) => {
  if (param.value !== 'any') {
    if (element.offer.type === param.value) {
      console.log('элемент по типу найден', element);
      return element;
    }
  }
  return element;
}

const checkSecond = (element, param) => {
  // debugger;
  if (param.value !== 'any') {
    if (Number(element.offer.rooms) === Number(param.value)) {
      console.log('элемент по кол-ву комнат найден', element);
      return element;
    }
  }
  return element;
}

const filters = () => {
  let array = [];
  array = getData();
  const result = array.filter( element => (checkFirst(element, housingType) && checkSecond(element, housingRooms)));
  console.log(result);
  if (result.length !== 0) {
    deletePin();
    setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  }
}

filters(filterType(housingType), filterType(housingRooms));


// const filterPrice = () => {
//   housingPrice.addEventListener('change', (evt) => {
//     evt.preventDefault();
//     // let array = [];
//     // array = data.slice();
//     if (evt.target.value === 'low') {
//       const result = getData().filter(element => element.offer.price > 0 && element.offer.price <= 10000);
//       setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//     else if (evt.target.value === 'middle') {
//       const result = getData().filter(element => element.offer.price > 10000 && element.offer.price <= 50000);
//       setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//     else if (evt.target.value === 'high') {
//       const result = getData().filter(element => element.offer.price > 50000);
//       setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//     else {
//       setPin(getData().slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//   });
// };

// filterPrice();

// const filterRooms = () => {
//   housingRooms.addEventListener('change', (evt) => {

//     evt.preventDefault();
//     // let array = [];
//     // array = data.slice();
//     const result = getData().filter(element => Number(element.offer.rooms) === Number(evt.target.value));
//     if (result.length !== 0) {
//       setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//     else {
//       setPin(getData().slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//   });
// }


// const filterGuests = () => {
//   housingGuests.addEventListener('change', (evt) => {
//     evt.preventDefault();
//     // let array = [];
//     // array = data.slice();
//     if (Number(evt.target.value) === 0) {
//       const result = getData().filter(element => Number(element.offer.guests) === 100);
//       setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//     }
//     else if (Number(evt.target.value) !== 0 ) {
//       const result = getData().filter(element => Number(element.offer.guests) === Number(evt.target.value));
//       if (result.length !== 0) {
//         setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//       }
//       else {
//         setPin(getData().slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//       }
//     }
//   });
// }

// filterGuests();

// const filterFeature = () => {

//   for (let element of housingInput) {
//     element.addEventListener ('change', (evt) => {
//       evt.preventDefault();
//       let array = [];
//       array = getData();
//       if (evt.target.checked) {
//         let result = [];
//         for (let i = 0; i < array.length; i++) {
//           const {features} = array[i].offer;
//           try {
//             if (features.length !== 0) {
//               for (let j = 0; j < features.length; j++) {
//                 if (features[j] === evt.target.value) {
//                   result.push(array[i]);
//                   setPin(result.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//                 }
//               }
//             }
//           } catch (err) {
//             console.log('error');
//           }
//         }
//       } else {
//         setPin(getData().slice(0, SIMILAR_ADVERTISEMENT_COUNT));
//       }
//     });
//   }
// }

