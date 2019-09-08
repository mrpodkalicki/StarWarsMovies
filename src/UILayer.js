// ******* UI Layer *********
import { getFilms, getFilm, SearchingMovies, getPlanets, getPlanet, getPeople, getCharacter, getVehicles, getVehicle, getStarship } from "./SWAPIService.js";

// DOM nodes
let $moviesList = document.querySelector(".movies-list");
let $movieInput = document.querySelector("#movie-input");
let $searchButton = document.querySelector("#movie-search");

let movies;

$searchButton.addEventListener("click", () => {
    SearchingMovies($movieInput.value).then(resolve => {
        movies = resolve;
        render();
    });

})

// UI functions
async function moviesView() {
    movies = await getFilms();
    render();
}
function render() {
    $moviesList.innerHTML = "";
    movies.forEach(movie => {
        $moviesList.appendChild(createMovieCard(movie));
    })
}

function movieView(movie) {
    $moviesList.innerHTML = "";
    const $movieElem = document.createElement("div");
    $movieElem.classList = ("view");
    $movieElem.innerHTML = `
        <h1 class="title">
            ${movie.title}
        </h1>
        <div class="info">
            <h2>
                Director:
            </h2>
            <h3>
                ${movie.director}
            </h3>
        </div>
        <div class="info">
            <h2>
                Producer:
            </h2>
            <h3>
                ${movie.producer}
            </h3>
        </div>
        <div class="info">
            <h2>
                Realase date:
            </h2>
            <h3>
                ${movie.release_date}
            </h3>
        </div>
    `;
    $moviesList.appendChild($movieElem);
    $moviesList.appendChild(showCharacters(movie));
    $moviesList.appendChild(showPlanets(movie));
    $moviesList.appendChild(showStarships(movie));
    $moviesList.appendChild(showVehicles(movie));
}

function characterView(character){
    $moviesList.innerHTML = "";
    const characterElem = document.createElement("div");
    characterElem.classList = ("view");
    characterElem.innerHTML = `
        <h1 class="title">
            ${character.name}
        </h1>
        <div class="info">
            <h2>
                Height:
            </h2>
            <h3>
                ${character.height}
            </h3>
        </div>
        <div class="info">
            <h2>
                Mass:
            </h2>
            <h3>
                ${character.mass}
            </h3>
        </div>
        <div class="info">
            <h2>
                Hair color:
            </h2>
            <h3>
                ${character.hair_color}
            </h3>
        </div>
        <div class="info">
            <h2>
                Skin color:
            </h2>
            <h3>
                ${character.skin_color}
            </h3>
        </div>
        <div class="info">
            <h2>
                Eye color:
            </h2>
            <h3>
                ${character.eye_color}
            </h3>
        </div>
        <div class="info">
            <h2>
                Birth year:
            </h2>
            <h3>
                ${character.birth_year}
            </h3>
        </div>
        <div class="info">
            <h2>
                Gender:
            </h2>
            <h3>
                ${character.gender}
            </h3>
        </div>
    `;
    $moviesList.appendChild(characterElem);
    $moviesList.appendChild(showPlanets(character));
    $moviesList.appendChild(showFilms(character));
    $moviesList.appendChild(showStarships(character));
    $moviesList.appendChild(showVehicles(character));
}

function planetView(planet){
    $moviesList.innerHTML = "";
    const planetElem = document.createElement("div");
    planetElem.classList = ("view");
    planetElem.innerHTML = `
        <h1 class="title">
            ${planet.name}
        </h1>
        <div class="info">
            <h2>
                Rotation period:
            </h2>
            <h3>
                ${planet.rotation_period}
            </h3>
        </div>
        <div class="info">
            <h2>
                Orbital period:
            </h2>
            <h3>
                ${planet.orbital_period}
            </h3>
        </div>
        <div class="info">
            <h2>
                Diameter:
            </h2>
            <h3>
                ${planet.diameter}
            </h3>
        </div>
        <div class="info">
            <h2>
                Climate:
            </h2>
            <h3>
                ${planet.climate}
            </h3>
        </div>
        <div class="info">
            <h2>
                Gravity:
            </h2>
            <h3>
                ${planet.gravity}
            </h3>
        </div>
        <div class="info">
            <h2>
                Terrain:
            </h2>
            <h3>
                ${planet.terrain}
            </h3>
        </div>
        <div class="info">
            <h2>
                Surface water:
            </h2>
            <h3>
                ${planet.surface_water}
            </h3>
        </div>
        <div class="info">
            <h2>
                Population:
            </h2>
            <h3>
                ${planet.population}
            </h3>
        </div>
    `;
    $moviesList.appendChild(planetElem);
    $moviesList.appendChild(showCharacters(planet));
    $moviesList.appendChild(showFilms(planet));
}
function starshipView(starship){
    $moviesList.innerHTML = "";
    const starshipElem = document.createElement("div");
    starshipElem.classList = ("view");
    starshipElem.innerHTML = `
        <h1 class="title">
            ${starship.name}
        </h1>
        <div class="info">
            <h2>
                Model:
            </h2>
            <h3>
                ${starship.model}
            </h3>
        </div>
        <div class="info">
            <h2>
                Manufacturer:
            </h2>
            <h3>
                ${starship.manufacturer}
            </h3>
        </div>
        <div class="info">
            <h2>
                Cost in credits:
            </h2>
            <h3>
                ${starship.cost_in_credits}
            </h3>
        </div>
        <div class="info">
            <h2>
                Length:
            </h2>
            <h3>
                ${starship.length}
            </h3>
        </div>
        <div class="info">
            <h2>
                Max atmosphering speed:
            </h2>
            <h3>
                ${starship.max_atmosphering_speed}
            </h3>
        </div>
        <div class="info">
            <h2>
                Crew:
            </h2>
            <h3>
                ${starship.crew}
            </h3>
        </div>
        <div class="info">
            <h2>
                Passengers:
            </h2>
            <h3>
                ${starship.passengers}
            </h3>
        </div>
        <div class="info">
            <h2>
                Cargo capacity:
            </h2>
            <h3>
                ${starship.cargo_capacity}
            </h3>
        </div>
        <div class="info">
            <h2>
                Consumables:
            </h2>
            <h3>
                ${starship.consumables}
            </h3>
        </div>
        <div class="info">
            <h2>
                Hyperdrive rating:
            </h2>
            <h3>
                ${starship.hyperdrive_rating}
            </h3>
        </div>
        <div class="info">
            <h2>
                MGLT:
            </h2>
            <h3>
                ${starship.MGLT}
            </h3>
        </div>
        <div class="info">
            <h2>
                Starship class:
            </h2>
            <h3>
                ${starship.starship_class}
            </h3>
        </div>
    `;
    $moviesList.appendChild(starshipElem);
    $moviesList.appendChild(showCharacters(starship));
    $moviesList.appendChild(showFilms(starship));
}

function vehicleView(vehicle){
    $moviesList.innerHTML = "";
    const vehicleElem = document.createElement("div");
    vehicleElem.classList = ("view");
    vehicleElem.innerHTML = `
        <h1 class="title">
            ${vehicle.name}
        </h1>
        <div class="info">
            <h2>
                Model:
            </h2>
            <h3>
                ${vehicle.model}
            </h3>
        </div>
        <div class="info">
            <h2>
                Manufacturer:
            </h2>
            <h3>
                ${vehicle.manufacturer}
            </h3>
        </div>
        <div class="info">
            <h2>
                Cost in credits:
            </h2>
            <h3>
                ${vehicle.cost_in_credits}
            </h3>
        </div>
        <div class="info">
            <h2>
                Length:
            </h2>
            <h3>
                ${vehicle.length}
            </h3>
        </div>
        <div class="info">
            <h2>
                Max atmosphering speed:
            </h2>
            <h3>
                ${vehicle.max_atmosphering_speed}
            </h3>
        </div>
        <div class="info">
            <h2>
                Crew:
            </h2>
            <h3>
                ${vehicle.crew}
            </h3>
        </div>
        <div class="info">
            <h2>
                Passengers:
            </h2>
            <h3>
                ${vehicle.passengers}
            </h3>
        </div>
        <div class="info">
            <h2>
                Cargo capacity:
            </h2>
            <h3>
                ${vehicle.cargo_capacity}
            </h3>
        </div>
        <div class="info">
            <h2>
                Consumables:
            </h2>
            <h3>
                ${vehicle.consumables}
            </h3>
        </div>
        <div class="info">
            <h2>
                Vehicle class:
            </h2>
            <h3>
                ${vehicle.vehicle_class}
            </h3>
        </div>
    `;
    $moviesList.appendChild(vehicleElem);
    $moviesList.appendChild(showCharacters(vehicle));
    $moviesList.appendChild(showFilms(vehicle));
}

function createMovieCard(movie) {
    const $movieCard = document.createElement("div");
    $movieCard.classList = "col-xs-12 col-md-6 col-xl-4 movieElem";
    $movieCard.innerHTML = `
        <h3 class="title">
            ${movie.title}
        </h3>
        <div class="info director">
            <h4>
                Director:
            </h4>
            <h5>
                ${movie.director}
            </h5>
        </div>
        <div class="info producer">
            <h4>
                Producer:
            </h4>
            <h5>
                ${movie.producer}
            </h5>
        </div>
        <div class="info rdate">
            <h4>
                Realase date:
            </h4>
            <h5>
                ${movie.release_date}
            </h5>
        </div>
    `
    $movieCard.addEventListener("click", () => movieView(movie));
    return $movieCard;
}


function showCharacters(element) {
    const characters = document.createElement("div");
    characters.classList = "info";
    characters.innerHTML = `
        <h2>Characters/residents/pilots:</h2>
    `
    const list = element.characters || element.residents || element.pilots;
    list.forEach(path => {
        const character = document.createElement("h3");
        character.innerHTML = path;
        character.addEventListener("click", async () => {
            const c = await getCharacter(path);
            characterView(c)
        })
        characters.appendChild(character);
    })
    return characters;
}

function showPlanets(element) {
    const planets = document.createElement("div");
    planets.classList = "info";
    planets.innerHTML = `
        <h2>Planets/Homeworld:</h2>
    `
    const list = element.planets || new Array(element.homeworld);
    list.forEach(path => {
        const planet = document.createElement("h3");
        planet.innerHTML = path;
        planet.addEventListener("click", async () => {
            const p = await getPlanet(path);
            planetView(p)
        })
        planets.appendChild(planet);
    })
    return planets;
}

function showStarships(element) {
    const starships = document.createElement("div");
    starships.classList = "info";
    starships.innerHTML = `
        <h2>Starships:</h2>
    `
    element.starships.forEach(path => {
        const starship = document.createElement("h3");
        starship.innerHTML = path;
        starship.addEventListener("click", async () => {
            const s = await getStarship(path);
            starshipView(s)
        })
        starships.appendChild(starship);
    })
    return starships;
}

function showVehicles(element) {
    const vehicles = document.createElement("div");
    vehicles.classList = "info";
    vehicles.innerHTML = `
        <h2>Vehicles:</h2>
    `
    element.vehicles.forEach(path => {
        const vehicle = document.createElement("h3");
        vehicle.innerHTML = path;
        vehicle.addEventListener("click", async () => {
            const v = await getVehicle(path);
            vehicleView(v)
        })
        vehicles.appendChild(vehicle);
    })
    return vehicles;
}

function showFilms(element) {
    const films = document.createElement("div");
    films.classList = "info";
    films.innerHTML = `
        <h2>Films:</h2>
    `
    element.films.forEach(path => {
        const film = document.createElement("h3");
        film.innerHTML = path;
        film.addEventListener("click", async () => {
            const f = await getFilm(path);
            movieView(f)
        })
        films.appendChild(film);
    })
    return films;
}




moviesView();

