import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImg } from './pixabay-api.js';

const listEl = document.querySelector('.img-list');
let lightbox;

export function createElements() {
  searchImg().then(data => {
    const markup = imgsTemplate(data);
    listEl.insertAdjacentHTML('afterbegin', markup);
    lightbox.refresh();
  });
}

function imgTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li>
    <a href="${largeImageURL}" class="gallery-item">
      <img src="${webformatURL}" alt="${tags}" />
    </a>
    <span>likes ${likes}</span>
    <span>views ${views}</span>
    <span>comments ${comments}</span>
    <span>downloads ${downloads}</span>
    </li>`;
}
function imgsTemplate(arr) {
  if (!Array.isArray(arr)) {
    console.error('Expected an array but got:', arr);
    return '';
  }
  return arr.map(imgTemplate).join('');
}
