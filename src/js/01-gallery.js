// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


import SimpleLightbox from 'simplelightbox';

import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createPictureCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup)


function createPictureCardMarkup (gallerys) {
    return galleryItems.map(({description, original, preview

}) => {
        return `
       
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}">
      </a>
 
    `;
    }).join('');
  
}

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
	
})
