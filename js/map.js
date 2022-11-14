import {setStateForm, addressForm} from './form.js';
import {createCustomPopup} from './cards.js';
import {resetForm, form, mapFilters} from './form.js';

const map = L.map('map-canvas');
map.on('load', () => {
  setStateForm(false);
})
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// добавляем главный маркер с координатами центра Токио

const mainPinIcon = L.icon({

  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const defaultMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Преобразование коордионат полученных при перемещении главного маркера на карте.

const setCoordinate = () => {
  const regExp = addressForm.value.match(/\d+\.\d+/gm);
  const lat = Number(regExp[0]).toFixed(5);
  const lng = Number(regExp[1]).toFixed(5);
  addressForm.value = `${lat}` + ', ' + `${lng}`;
  return addressForm.value;
};

const setmarker = () => {
  defaultMarker.addTo(map);
  addressForm.value = defaultMarker.getLatLng();
  setCoordinate();
};

setmarker();

defaultMarker.on('moveend', (evt) => {
  addressForm.value = evt.target.getLatLng();
  setCoordinate();
});

let layerGroup = L.layerGroup().addTo(map);
layerGroup.clearLayers();

// добавляем обычные маркеры с координатами похожих обьявлений

const setPin = (data) => {
  const regularPinIcon = L.icon ({
    iconUrl: '../leaflet/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  // let layerGroup = L.layerGroup().addTo(map);
  // layerGroup.clearLayers();
  for (let i = 0; i <= data.length-1; i++) {
    const {location} = data[i];
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: regularPinIcon,
      },
    );

    marker.addTo(layerGroup);
    marker.bindPopup(createCustomPopup(data[i]));
  }
}

// Сброс формы к настройкам по-умолчанию по кнопке reset

const resetfieldForm = () => {
  resetForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    mapFilters.reset();
    map.removeLayer(defaultMarker);
    defaultMarker.setLatLng({lat:35.6895, lng:139.692});
    setmarker();
  });
};

resetfieldForm();

// Восстановление полей формы в первоначальное состояние после публикации

const reverseFormState =  () => {
  form.reset();
  mapFilters.reset();
  map.removeLayer(defaultMarker);
  defaultMarker.setLatLng({lat:35.6895, lng:139.692});
  setmarker();
};

// Удаление всех маркеров на карте

const deletePin = () => {
  layerGroup.clearLayers();
}

export {setPin, resetfieldForm, reverseFormState, deletePin};
