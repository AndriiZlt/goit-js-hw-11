import { fetchingQuery, RESULTSPERPAGE } from './fetching';
import { createMarkup } from './markup';
import { renderingCards } from './rendering';
import Notiflix from 'notiflix';
import { getRefs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const { formRef, moreBtnRef, galleryRef } = getRefs();
formRef.addEventListener('submit', onSearchClick);
moreBtnRef.addEventListener('click', appendCards);
let page = 1;
let query = '';
let uploaded = 0;
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '150',
});

async function onSearchClick(e) {
  e.preventDefault();
  moreBtnRef.classList.add('visuallyhidden');
  galleryRef.innerHTML = '';
  query = e.currentTarget.elements.searchQuery.value;
  if (query === '') {
    Notiflix.Notify.warning('Type something to search!');
    return;
  }
  page = 1;
  const response = await fetchingQuery(query, page);
  if (response.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  uploaded = response.hits.length;
  renderingCards(createMarkup(response.hits));
  lightbox.refresh();
  moreBtnRef.classList.remove('visuallyhidden');
}

async function appendCards(e) {
  page += 1;
  const response = await fetchingQuery(query, page);
  if (uploaded >= response.totalHits || response.hits.length === 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  uploaded += response.hits.length;
  renderingCards(createMarkup(response.hits));
  lightbox.refresh();
}
