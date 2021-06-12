const API_KEY = '22042926-beb76aab4ca671d50b680dadc';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`;
    return fetch(url)
    .then(responce => responce.json())
    .then(({hits}) => { 
      this.incrementPage();
      return hits;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query (newQuery) {
    this.searchQuery = newQuery;
  }
}


