import { creatingMarkup } from './creatingMarkup';
import { renderingCards } from './rendering';
import { getRefs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './LoadMoreBtn';
import { scrolling } from './scrolling';
import ApiService from './ApiService';

const { formRef, galleryRef } = getRefs();
const loadMoreBtn = new LoadMoreBtn('.load-more');
console.log(loadMoreBtn);
let apiService = new ApiService('');
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '150',
});

formRef.addEventListener('submit', onSearchClick);
loadMoreBtn.ref.addEventListener('click', onMoreClick);

async function onSearchClick(e) {
  e.preventDefault();
  clearGallery(galleryRef);
  apiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  apiService.page = 1;
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
