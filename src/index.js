import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
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
            console.log(data);
            console.log(forCard);
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

            for (const item of forCard) {
                const htmlCars = `<div class="photo-card">
                                    <a href="${item.largeImageURL}">
                                        <img src="${item.webformatURL}" alt="" loading="lazy" width="250px" heigth="250px"/></a>
                                    <div class="info">
                                        <p class="info-item"><b>Likes</b><br>${item.likes}</p>
                                        <p class="info-item"><b>Views</b><br>${item.views}</p>
                                        <p class="info-item"><b>Comments</b><br>${item.comments}</p>
                                        <p class="info-item"><b>Downloads</b><br>${item.downloads}</p>
                                    </div>
                                </div> `
                gallery.innerHTML += htmlCars;
            }
        })
        .catch(error => {
            Notiflix.Notify.failure('Error. Please try again.');
        })
    
    // let lightbox = new SimpleLightbox('.gallery a');
    // gallery.on('show.simplelightbox');

}

