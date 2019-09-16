import { insideMenu, render, nothing, markSelected } from "./UILayer";
import { generateElementsList } from "./elementsList";
import { getPeople, getStarships, getVehicles, getPlanets, getFilm, getFilms } from "./SWAPIService";
import { generatePlanetDetailsView } from "./PlanetDetailsView";
import { generateCharacterDetailsView } from "./CharacterDetailsView";
import { generateStarshipDetailsView } from "./StarshipDetailsView";
import { generateVehicleDetailsView } from "./VehicleDetailsView";
import { backFunction } from "./BackFunction";


export { generateFilmDetailsView };

async function generateFilmDetailsView(film) {
    if (!(film instanceof Object)) {
        film = await getFilm(film);
    }
    let view = document.querySelector(".view");
    const body = document.querySelector("body");
    if (view) {
        body.removeChild(view);
    }

    insideMenu(["Characters", "Starships", "Vehicles", "Planets"]);
    const back = document.querySelector(".backButton");
    const main = document.querySelector(".mainButton");
    const char = document.querySelector(".CharactersButton");
    const star = document.querySelector(".StarshipsButton");
    const veh = document.querySelector(".VehiclesButton");
    const plan = document.querySelector(".PlanetsButton");

    back.addEventListener("click", backFunction);
    main.addEventListener("click", render);
    char.addEventListener("click", () => showCharacters(film));
    star.addEventListener("click", () => showStarships(film));
    veh.addEventListener("click", () => showVehicles(film));
    plan.addEventListener("click", () => showPlanets(film));

    view = document.querySelector(".view");

    const title = document.createElement("header");
    title.classList = "title";
    title.innerHTML = film.title;
    view.appendChild(title);

    const filmInfo = document.createElement("div");
    filmInfo.classList = "row";
    view.appendChild(filmInfo);

    const director = document.createElement("div");
    director.classList = "col-12 col-md-4 info";
    director.innerHTML = `<header>Director:</header><span>${film.director}</span>`
    filmInfo.appendChild(director);

    const producer = document.createElement("div");
    producer.classList = "col-12 col-md-4 info";
    producer.innerHTML = `<header>Producer:</header><span>${film.producer}</span>`
    filmInfo.appendChild(producer);

    const relaseDate = document.createElement("div");
    relaseDate.classList = "col-12 col-md-4 info";
    relaseDate.innerHTML = `<header>Relase date:</header><span>${film.release_date}</span>`
    filmInfo.appendChild(relaseDate);

    const chosenCategory = document.createElement("div");
    chosenCategory.classList = "categoryName";
    view.appendChild(chosenCategory);

    const loading = document.createElement("loading");
    loading.classList = "loading";
    loading.innerHTML = "Loading..."
    loading.style.display = "none";
    view.appendChild(loading);

    const links = document.createElement("div");
    links.classList = "row links";
    view.appendChild(links);

    const charactersCategory = document.createElement("div");
    charactersCategory.classList = "col-12 col-sm-6 col-lg-3 charactersCategory category";
    charactersCategory.innerHTML = "<span class='outline'><span class='black'>characters</span>characters</span>";
    links.appendChild(charactersCategory);
    charactersCategory.addEventListener("click", () => showCharacters(film));

    const starshipsCategory = document.createElement("div");
    starshipsCategory.classList = "col-12 col-sm-6 col-lg-3 starshipsCategory category";
    starshipsCategory.innerHTML = "<span class='outline'><span class='black'>starships</span>starships</span>";
    links.appendChild(starshipsCategory);
    starshipsCategory.addEventListener("click", () => showStarships(film));

    const vehiclesCategory = document.createElement("div");
    vehiclesCategory.classList = "col-12 col-sm-6 col-lg-3 vehiclesCategory category";
    vehiclesCategory.innerHTML = "<span class='outline'><span class='black'>vehicles</span>vehicles</span>";
    links.appendChild(vehiclesCategory);
    vehiclesCategory.addEventListener("click", () => showVehicles(film));

    const planetsCategory = document.createElement("div");
    planetsCategory.classList = "col-12 col-sm-6 col-lg-3 planetsCategory category";
    planetsCategory.innerHTML = "<span class='outline'><span class='black'>planets</span>planets</span>";
    links.appendChild(planetsCategory);
    planetsCategory.addEventListener("click", () => showPlanets(film));
}

async function showCharacters(film) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".CharactersButton"));

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Characters:") {
        return;
    }

    chosenCategory.innerHTML = "Characters:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const characters = await generateElementsList(film.characters, getPeople, generateCharacterDetailsView);
    characters.forEach(character => {
        links.appendChild(character);
    });
    nothing(links);
}

async function showStarships(film) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".StarshipsButton"));

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Starships:") {
        return;
    }
  
    chosenCategory.innerHTML = "Starships:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const starships = await generateElementsList(film.starships, getStarships, generateStarshipDetailsView);
    starships.forEach(starship => {
        links.appendChild(starship);
    });
    nothing(links);
}

async function showVehicles(film) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".VehiclesButton"));

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Vehicles:") {
        return;
    }
    chosenCategory.innerHTML = "Vehicles:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const vehicles = await generateElementsList(film.vehicles, getVehicles, generateVehicleDetailsView);
    vehicles.forEach(vehicle => {
        links.appendChild(vehicle);
    });
    nothing(links);
}

async function showPlanets(film) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".PlanetsButton"));

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Planets:") {
        return;
    }

    chosenCategory.innerHTML = "Planets:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const planets = await generateElementsList(film.planets, getPlanets, generatePlanetDetailsView);
    planets.forEach(planet => {
        links.appendChild(planet);
    });
    nothing(links);
}
