import {similarAdvertisement} from './data.js';
import {setStateForm, addressForm} from './form.js';
import {createCustomPopup} from './cards.js';

const map = L.map('map-canvas')
  .on('load', () => {
    // console.log('Карта инициализирована');
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

defaultMarker.addTo(map);
addressForm.value = defaultMarker.getLatLng();
setCoordinate();

defaultMarker.on('moveend', (evt) => {
  addressForm.value = evt.target.getLatLng();
  setCoordinate();
});

// добавляем обычные маркеры с координатами похожих обьявлений

const regularPinIcon = L.icon ({
  iconUrl: '../leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

for (let i = 0; i <= similarAdvertisement.length-1; i++) {
  const {address} = similarAdvertisement[i];
  const marker = L.marker(
    {
      lat: address.match(/\d+\.\d+/gm)[0],
      lng: address.match(/\d+\.\d+/gm)[1],
    },
    {
      icon: regularPinIcon,
    },
  );

  marker.addTo(map);
  marker.bindPopup(createCustomPopup(similarAdvertisement[i]));
}
