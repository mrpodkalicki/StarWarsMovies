// ******* UI Layer ********

// DOM nodes
let $moviesList = document.querySelector(".movies-list");

// UI functions
function render() {
    $moviesList.innerHTML = "";
    movies.forEach(movie => {
        $moviesList.appendChild(createMovieCard(movie));
    })
}

