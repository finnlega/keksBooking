import {form} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const previewAvatar = form.querySelector('.ad-form-header__preview img');
const fileChoosen = form.querySelector('#avatar');

fileChoosen.addEventListener('change', () => {
  const file = fileChoosen.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => {
    return fileName.endsWith(element);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {FILE_TYPES}
