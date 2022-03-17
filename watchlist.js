const movieList = document.querySelector('.movie-list')
const defaultPage = document.querySelector('.default')
let movieWatchList;

document.addEventListener('DOMContentLoaded', () => {
    displayCards()
})

const displayCards = () => {
    const movies = Object.keys(localStorage)
    console.log(movies)
    if (movies.length) {
        defaultPage.remove()
        getDataFromLocalStorage(movies)
    } else {
        defaultPage.remove()
        const html = `
            <div class="default">
                <p class="prompt">Your watchlist is looking a little empty...</p>
                <a href="index.html" class="add-movies"><p class="search-link"><i class="fa-solid fa-circle-plus"></i> Let's add some movies and shows!</p></a>
            </div>
        `
        movieList.insertAdjacentHTML('afterbegin', html)
    }
}

const getDataFromLocalStorage = (movies) => {
    let count = 1;
    const maxNumber = Math.max(...movies)
    for (let i = 0; i <= maxNumber; i++) {
        const movie = localStorage.getItem(count)
        if (movie !== null) {
            console.log(movie)
            movieList.insertAdjacentHTML('afterbegin', movie)
            // add new class to ".movie-watchlist" element
            const removedItem = document.querySelector('.movie-watchlist')
            removedItem.innerHTML = '<i class="fa-solid fa-circle-minus"></i> Remove'
            removedItem.classList.add(`${count}`)
            removeCard(removedItem)
        } 
        count++;
    }
}

const removeCard = (removedItem) => {
    removedItem.addEventListener('click', () => {
        const item = removedItem.classList[1]
        localStorage.removeItem(item)
        window.location.reload()
    })
}
