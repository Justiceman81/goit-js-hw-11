import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImg } from './js/pixabay-api.js';
import { createElements } from './js/render-functions.js';

const inputEl = document.querySelector('.input-search');
const btnEl = document.querySelector('.btn-search');
const formEl = document.querySelector('.form-el');
const loader = document.getElementById('loader');
formEl.addEventListener('submit', e => {
  e.preventDefault();
  if (inputEl.value.trim() === '') {
    return;
  } else {
    searchImg(inputEl.value.trim());
    createElements();
  }
});
