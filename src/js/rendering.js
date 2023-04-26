import { getRefs } from './refs';

const { galleryRef } = getRefs();

export function renderingCards(markup) {
  if (markup) {
    galleryRef.insertAdjacentHTML('beforeend', markup);
  }
}
