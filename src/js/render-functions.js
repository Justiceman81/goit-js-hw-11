import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImg } from './pixabay-api.js';
import { refs } from '../main.js';

let lightbox;
const listEl = document.querySelector('.img-list');
export function createElements(values) {
  const gallery = refs.imgGallery;
  const markup = values.hits
    .map(value => {
      return `<li class="list-el">
                <a href="${value.largeImageURL}"><img src='${value.webformatURL}' alt='${value.tags}'></a>
                <div class="content">
                    <div class="item"><h3>Likes</h3><p>${value.likes}</p></div>
                    <div class="item"><h3>Views</h3><p>${value.views}</p></div>
                    <div class="item"><h3>Comments</h3><p>${value.comments}</p></div>
                    <div class="item"><h3>Downloads</h3><p>${value.downloads}</p></div>
                </div>
            </li>`;
    })
    .join('');
  gallery.innerHTML = markup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function showLoader() {
  refs.loader.classList.remove('hidden');
}
export function hideLoader() {
  refs.loader.classList.add('hidden');
}
