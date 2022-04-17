const searchInput = document.getElementById('search-input')
const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const movieList = document.querySelector('.movie-list')
let movieWatchList;
const defaultIcon = document.querySelector('.default')
const defaultPrompt = document.querySelector('.prompt')
const defaultFilmIcon = document.querySelector('.film')
let searchValue = ''
let data;
let count = 0;

searchBtn.addEventListener('click', submitSearch)

function submitSearch(event) {
    event.preventDefault()
    searchValue = searchInput.value
    searchInput.value=''
    if (searchValue) {
        getDataFromAPI()
    } else {
        displayErrorMessage()
    }
}

function displayErrorMessage() {
    defaultFilmIcon.remove()
    if (defaultIcon.children.length < 2) {
        defaultIcon.insertAdjacentHTML('afterbegin', '<i class="fa-solid fa-xmark film"></i>')
        defaultPrompt.textContent = 'Unable to find what you\'re looking for. Please try another search.'
    } 
}

const saveToLocalStorage = (item) => {
    const list = Object.keys(localStorage)
    const maxNumber = Math.max(...list) > 0 ? Math.max(...list) : 0
    console.log(maxNumber)
    const storageKey = `${maxNumber+1}`
    localStorage.setItem(storageKey, movieList.children.namedItem(item).innerHTML)
    const data = localStorage.getItem(storageKey)
}

const getDisplayedData = () => {
    // get data that is already displayed to the user
    // so that data can be saved to local storage
    movieWatchList = document.querySelector('.movie-watchlist')
    movieWatchList.addEventListener('click', (event) => {
        const movies = Object.keys(localStorage)
        if (checkIfItemInLocalStorage(movies)) {
            // when user clicks the "Watchlist" button  the .closest method travels up the DOM tree
            // to find the closest div element with a "name" attribute
            let parentNode = event.target.closest('div[name]').getAttribute('name')
            saveToLocalStorage(parentNode)
        } else {
            alert(`${data.Title} is already on your watch list`)
        }
    })
}

const checkIfItemInLocalStorage = (movies) => {
    let count = 1;
    const maxNumber = Math.max(...movies)
    for (let i = 0; i <= maxNumber; i++) {
        const movie = localStorage.getItem(count)
        if (movie !== null) {
            if (movie.includes(data.Title)) {
                return false;
            } 
        }
        count++;
    }
    return true;
}

const getDataFromAPI = async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=9489d9c4&t=${searchValue}`)
    data = await response.json()
    if (data.Response === 'True' && data.Poster !== 'N/A') {
        defaultIcon.remove();
        displayData()
        getDisplayedData()
    } else {
        displayErrorMessage()
    }
}

const displayData = () => {
    count++
    let html = `
        <div name="div${count}">
            <div class="movie-card">
                <img src=${data.Poster} class="movie-image" />
                <section class="movie-info">
                    <div class="movie-title-rating">
                        <h3 class="movie-title">${data.Title}</h3>
                        <i class="fa-solid fa-star star"></i>
                        <p class="movie-rating">${data.imdbRating}</p>
                    </div>
                    <div class="movie-length-type-watchlist">
                        <p class="movie-length">${data.Runtime}</p>
                        <hr class="divider">
                        <p class="movie-type">${data.Genre}</p>
                        <hr class="divider">
                        <p class="movie-watchlist"><i class="fa-solid fa-circle-plus"></i> Watchlist</p>
                    </div>
                    <div class="movie-description">
                        <p>
                            ${data.Plot}
                        </p>
                    </div>
                </section>
            </div>
            <hr>
        </div>
    `
    movieList.insertAdjacentHTML('afterbegin', html)
    // console.log(movieList.children[0].innerHTML)
}  
