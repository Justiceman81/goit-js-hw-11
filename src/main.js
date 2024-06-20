import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  const value = refs.formEl.elements[0].value.trim();
  if (!value) {
    iziToast.error({
      message: 'Info Search input must be filled!',
    });
    return;
  } else {
    searchImg(value)
      .then(data => {
        if (data.length === 0) {
          throw new Error('Error! Nothing to load');
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
        });
      });
  }
  showLoader();
  const arr = searchImg(value);
  if (arr.length !== 0) {
    arr.then(data => createElements(data.hits));
  }
  arr.catch(err => {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'center',
    });
  });
  arr.finally(() => {
    hideLoader();
    refs.formEl.reset();
  });
});
