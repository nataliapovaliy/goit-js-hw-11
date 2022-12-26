import axios from "axios";
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener("submit", onSearch);