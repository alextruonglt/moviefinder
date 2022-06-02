const apiKey = "c1720c47"
const searchBtnEl = document.getElementById("search-btn")
const inputEl = document.getElementById("searchInput")
const exploreEl = document.getElementById("explore")
const watchlistEl = document.getElementById("watchlist")

const movieContainerEl = document.getElementById("movie-container")
let watchListarr = []



function watchList(id) {
    if (watchListarr.includes(id)) {
        return alert("This is already added!")
    }

    watchListarr.push(id)
    console.log(watchListarr)
    localStorage.setItem("ids", JSON.stringify(watchListarr));
}


searchBtnEl.addEventListener("click", (e) => {
    e.preventDefault()
    const inputValue = inputEl.value

    const iD = []
    let movieHTML = ""

    // To Fetch IMBD ID
    fetch(`//www.omdbapi.com/?s=${inputValue}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            if (data.Response === "False") {
                movieContainerEl.innerHTML = `
                <div class="explore" id="explore">
                    <p>Unable to find what you’re looking for. Please try another search.</p>
                </div>
                `
            }


            for (let i = 0; i < 10; i++) {
                iD.push(data.Search[i].imdbID)
            }
            console.log(iD)
            for (let j = 0; j < iD.length; j++) {
                fetch(`//www.omdbapi.com/?i=${iD[j]}&apikey=${apiKey}`)
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
                            <p id="watchlist" class="watchlist"onclick="watchList('${iD[j]}')">
                              <i class="fa fa-plus-circle" aria-hidden="true"></i> Watchlist
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
        })
})





function pageToSearch() {
    window.location.href = "index.html"
}

function pageToWatchlist() {
    window.location.href = "watchlist.html"

}








