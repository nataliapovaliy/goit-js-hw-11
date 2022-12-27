import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { fetchSearch } from './js/fetchSearch';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");

searchForm.addEventListener("submit", onSearch);

function onSearch(event) {
    event.preventDefault();

    const q = event.currentTarget.searchQuery.value;
    console.log(q);

    fetchSearch(q)
        .then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }

            const forCard = data.hits;
            console.log(forCard);

            for (const item of forCard) {
                const htmlCars = `<div class="photo-card">
                                    <a href="${item.largeImageURL}">
                                        <img src="${item.webformatURL}" alt="" loading="lazy" /></a>
                                    <div class="info">
                                        <p class="info-item"><b>Likes</b>${item.likes}</p>
                                        <p class="info-item"><b>Views</b>${item.views}</p>
                                        <p class="info-item"><b>Comments</b>${item.comments}</p>
                                        <p class="info-item"><b>Downloads</b>${item.downloads}</p>
                                    </div>
                                </div> `
                gallery.innerHTML += htmlCars;
            }
        })
        .catch(error => {
            Notiflix.Notify.failure('Error. Please try again.');
        })
    
    
}

