// ******* UI Layer *********

// DOM nodes
let $moviesList = document.querySelector(".movies-list");
let $movieInput = document.querySelector("#movie-input");
let $searchButton = document.querySelector("#movie-search");

// UI functions
let movies = [];

function render() {
    $moviesList.innerHTML = "";
    movies.forEach(movie => {
        $moviesList.appendChild(createMovieCard(movie));
    })
}

$searchButton.addEventListener("click", () => {
    SearchingMovies($movieInput.value).then(resolve => {
        movies = resolve;
        render();
    });
    
})
