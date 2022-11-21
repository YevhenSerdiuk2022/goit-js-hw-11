import Notiflix from 'notiflix';
import ApifetchImages from './js/fetchImages';
import LoadMoreBtn from './js/load-more-btn';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
}



const apifetchImages = new ApifetchImages();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImagesList);


function onSearch(evt) {
  evt.preventDefault();

  apifetchImages.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (apifetchImages.query !== '') {
     loadMoreBtn.show();
      apifetchImages.resetPage();
      cleaerHTML();
      fetchImagesList();
}
   
}

function fetchImagesList() {
  loadMoreBtn.disable();
  apifetchImages.fetchImages().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      renderImagesList(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtn.enable();
      gallerySimpleLightbox.refresh();
    }
  });
   
}

function renderImagesList(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function cleaerHTML() {
   
    refs.gallery.innerHTML = '';
}
