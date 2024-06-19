import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createElements } from './render-functions.js';

export function searchImg(img) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const options = new URLSearchParams({
    key: '44348563-8832aea6e55efd6ddd80494f7',
    q: `${img}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${options}`;
  fetch(url)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      } else {
        return data.json();
      }
    })
    .then(value => {
      if (value.length === 0) {
        throw new Error('Error! Nothing to load');
      } else {
        createElements(value);
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
