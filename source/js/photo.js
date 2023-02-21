import {form} from './form.js';
import { FILE_TYPES } from './avatar.js';

const previewPhoto = form.querySelector('.ad-form__photo');
const fileChoosen = form.querySelector('#images');
const image = document.createElement('img');
image.style.width = '70px';
image.style.height = '70px';
image.setAttribute('alt', 'Фотография жилья');
image.classList.add('ad-form__photo--image');
previewPhoto.appendChild(image);

fileChoosen.addEventListener('change', () => {
  const file = fileChoosen.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => {
    return fileName.endsWith(element);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      image.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
