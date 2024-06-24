import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImg } from './js/pixabay-api.js';
import {
  createElements,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

export const refs = {
  formEl: document.querySelector('.form-el'),
  inputEl: document.querySelector('.input-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  refs.imgGallery.innerHTML = '';
  showLoader();
  const value = e.currentTarget.search.value.trim();
  if (!value) {
    iziToast.error({
      message: 'Info Search input must be filled!',
      position: 'topRight',
    });
    return;
  }

  searchImg(value)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createElements(data);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Sorry,',
        message:
          'there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      refs.formEl.reset();
    });
});
