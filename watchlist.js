const apiKey = "c1720c47"
const idsFromLocalStorage = JSON.parse(localStorage.getItem("ids"))
const movieContainerEl = document.getElementById("movie-container")

console.log(idsFromLocalStorage)

renderWatchlist()

function renderWatchlist() {
    let movieHTML = ""
    if (idsFromLocalStorage.length === 0) {
        movieContainerEl.innerHTML = `
                <div class="explore" id="explore"> 
                <h3 class="watchlist-empty">
                Your watchlist is looking a little empty...
                </h3>
                <p id="watch-add" onclick="pageToSearch()">
                <i class="fa fa-plus-circle" aria-hidden="true"></i> Let's add some
                movies
                </p>
            </div>
            `

    }

    for (let i = 0; i < idsFromLocalStorage.length; i++) {

        fetch(`//www.omdbapi.com/?i=${idsFromLocalStorage[i]}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                movieHTML += `
                <div class="movie">
                <div class="img-holder">
                  <img
                    src="${data.Poster}"
                    alt="movie"
                  />
                </div>
                <div class="movie-info">
                  <div class="movie-title">
                    <h2>${data.Title}</h2>
                    <p><i class="fas fa-star"></i> ${data.imdbRating}</p>
                  </div>
                  <div class="movie-details">
                    <p>${data.Runtime} </p>
                    <p>${data.Genre}</p>
                    <p id="watchlist" class="watchlist" onclick="removeMovie('${idsFromLocalStorage[i]}')">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i> Watchlist
                    </p>
                  </div>
                  <div class="movie-summary">
                    <p>
                      ${data.Plot}
                    </p>
                  </div>
                </div>
              </div>
                `
                movieContainerEl.innerHTML = movieHTML

            })
    }

}

function removeMovie(id) {
    console.log(id)
    let removeidx = idsFromLocalStorage.indexOf(id)
    idsFromLocalStorage.splice(removeidx, 1)
    console.log(idsFromLocalStorage)
    localStorage.setItem("ids", JSON.stringify(idsFromLocalStorage));
    renderWatchlist()





}


function pageToSearch() {
    window.location.href = "index.html"
}

function pageToWatchlist() {
    window.location.href = "watchlist.html"

}
