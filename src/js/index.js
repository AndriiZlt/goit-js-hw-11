import apiHandler, { fetchingQuery, RESULTSPERPAGE } from './apiService';
import { creatingMarkup } from './creatingMarkup';
import { renderingCards } from './rendering';
import { getRefs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './loadMoreBtn';
import { scrolling } from './scrolling';
import ApiService from './apiService';

const { formRef, galleryRef } = getRefs();
const loadMoreBtn = new LoadMoreBtn('.load-more');
let apiService = new ApiService('');
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '150',
});

formRef.addEventListener('submit', onSearchClick);
loadMoreBtn.ref.addEventListener('click', onMoreClick);

async function onSearchClick(e) {
  e.preventDefault();
  clearGallery(galleryRef);
  apiService = new ApiService(e.currentTarget.elements.searchQuery.value);
  if (!apiService.isEmptyQuery()) {
    const response = await apiService.fetchingQuery();
    if (response) {
      renderingCards(creatingMarkup(response.hits));
      lightbox.refresh();
      loadMoreBtn.show();
    }
  }
}

async function onMoreClick() {
  loadMoreBtn.hide();
  const response = await apiService.fetchingMoreCards();
  if (response) {
    renderingCards(creatingMarkup(response.hits));
    loadMoreBtn.show();
    scrolling();
    lightbox.refresh();
  }
}

function clearGallery(selector) {
  selector.innerHTML = '';
}
