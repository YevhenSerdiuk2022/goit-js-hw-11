import Notiflix from "notiflix";
import LoadMoreBtn from "./load-more-btn";

const API_KEY = '31425554-bae5adc86c7a7fb3d8471083a';
const BASE_URL = 'https://pixabay.com/api/';


const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

export default class ApifetchImages {
    constructor() {
        this.searchEl = '';
        this.page = 1;
    }
    async fetchImages() {
        console.log(this);
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchEl}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${this.page}`;
        return await fetch(url)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                        loadMoreBtn.hide();
                        return [];
                    }
             
                    throw new Error(response.status);
                }
                return await response.json()
                    .then(data => {
                        this.incrementPage();
                        return data;
                    })
            }).catch(error => {
                        console.error(error);
                    });
    }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchEl;
    }
    set query(newQuery) {
        this.searchEl = newQuery;
    }
}      

    



