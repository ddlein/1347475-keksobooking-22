import { showError } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
const previewHousing = document.querySelector('.ad-form__photo');
// const previewHousing = document.querySelector('.ad-form__photo img');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const mathces = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })

  if (mathces) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    })

    reader.readAsDataURL(file);
  } else {
    showError('Картинки могут быть формата: .gif, .jpg, .jpeg, .png')
  }
})

fileChooserHousing.addEventListener('change', () => {
  const file = fileChooserHousing.files[0];
  const fileName = file.name.toLowerCase();



  const mathces = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })

  if (mathces) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      let img = document.createElement('img');
      img.classList.add('ad-form__photo-img')
      img.alt = 'Фотография жилья';
      img.width = '70';
      img.height = '70';
      previewHousing.appendChild(img);
      img.src = reader.result;
    })

    reader.readAsDataURL(file);
  } else {
    showError('Картинки могут быть формата: .gif, .jpg, .jpeg, .png')
  }
})
