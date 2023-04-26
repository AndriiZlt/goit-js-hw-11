import { getRefs } from './refs';
import Notiflix from 'notiflix';

const { axios } = getRefs();

export default class ApiService {
  constructor(query) {
    this.searchQuery = query;
    this.page = 1;
    this.RESULTSPERPAGE = 40;
  }

  async fetchingQuery() {
    console.log('fetchingQuery=', this.searchQuery, ', page=', this.page);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=6707322-7bfef4d2355bcd2c21033e4e5&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.RESULTSPERPAGE}&page=${this.page}`
      );
      if (response.data.hits.length === 0 && this.page === 1) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (this.page === 1) {
        Notiflix.Notify.info(
          `Hooray! We found ${response.data.totalHits} images.`
        );
      }

      return await response.data;
    } catch (error) {
      console.log('catch error', error);
    }
  }

  async fetchingMoreCards() {
    this.page += 1;
    const response = await this.fetchingQuery();
    console.log('response.hits.length', response.hits.length);
    if (response.hits.length === 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    } else {
      return response;
    }
  }

  isEmptyQuery() {
    if (this.searchQuery.trim() === '') {
      Notiflix.Notify.warning('Type something to search!');
      return true;
    } else {
      return false;
    }
    s;
  }
}
