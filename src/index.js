import './sass/main.scss';
import ImagesApiService from './js/apiService.js';
import imageCard from './templates/imageCard.hbs';


const refs = {
  galleryContainer: document.querySelector('.gallery'),
  inputSearch: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  moveElement: document.querySelector('.my-element-selector')
};

const moveElement = () => {
  refs.moveElement.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

const imagesApiService = new ImagesApiService();

refs.inputSearch.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  refs.galleryContainer.innerHTML = '';
  imagesApiService.query = e.currentTarget.elements.query.value.trim();
  imagesApiService.resetPage();

  if (imagesApiService.query === "") {
    hide();
    return alert('Enter something!');
  };
  
  imagesApiService.fetchImages()
    .then(images => {
      if (images.length === 0) {
        hide();
        return alert('Try to enter something again!');
      }
      renderImagesGallery(images);
      show();
    })
    .catch(onFetchError);
}

function onLoadMore() {
  imagesApiService.fetchImages()
  .then(renderImagesGallery);
}

function renderImagesGallery(images) {
  const imagesMarkup = imageCard(images);
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);
  moveElement();
}

function onFetchError() {
  alert('Something is wrong! Try again!');
}

function show() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hide() {
  refs.loadMoreBtn.classList.add('is-hidden');
}