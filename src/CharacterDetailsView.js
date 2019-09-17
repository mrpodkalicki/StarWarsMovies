
import { insideMenu, render, nothing } from "./UILayer";
import { generateElementsList } from "./elementsList";
import { getCharacter, getVehicles, getFilms, getStarships, getPlanet } from "./SWAPIService";
import { generateFilmDetailsView } from "./FilmDetailsView";
import { generateVehicleDetailsView } from "./VehicleDetailsView";
import { generateStarshipDetailsView } from "./StarshipDetailsView";
import { backFunction } from "./BackFunction";

export { generateCharacterDetailsView };

async function generateCharacterDetailsView(character) {
    if (!(character instanceof Object)) {
        character = await getCharacter(character);
    }
    let view = document.querySelector(".view");
    const body = document.querySelector("body");
    body.removeChild(view);

    insideMenu(["Films", "Vehicles", "Starships"]);
    const back = document.querySelector(".backButton");
    const main = document.querySelector(".mainButton");
    const films = document.querySelector(".FilmsButton");
    const veh = document.querySelector(".VehiclesButton");
    const ships = document.querySelector(".StarshipsButton");

    back.addEventListener("click", backFunction);
    main.addEventListener("click", render);
    films.addEventListener("click", () => showFilms(character));
    veh.addEventListener("click", () => showVehicles(character));
    ships.addEventListener("click", () => showStarships(character));



    view = document.querySelector(".view");

    const title = document.createElement("header");
    title.classList = "title";
    title.innerHTML = character.name;
    view.appendChild(title);

    const characterInfo = document.createElement("div");
    characterInfo.classList = "row";
    view.appendChild(characterInfo);

    const height = document.createElement("div");
    height.classList = "col-12 col-md-6 col-xl-3 info";
    height.innerHTML = `<header>Height:</header><span>${character.height}</span>`;
    characterInfo.appendChild(height);

    const charMass = document.createElement("div");
    charMass.classList = "col-12 col-md-6 col-xl-3 info";
    charMass.innerHTML = `<header>Mass:</header><span>${character.mass}</span>`;
    characterInfo.appendChild(charMass);

    const birth_year = document.createElement("div");
    birth_year.classList = "col-12 col-md-6 col-xl-3 info";
    birth_year.innerHTML = `<header>Birth year:</header><span>${character.birth_year}</span>`
    characterInfo.appendChild(birth_year);

    const hair_color = document.createElement("div");
    hair_color.classList = "col-12 col-md-6 col-xl-3 info";
    hair_color.innerHTML = `<header>Hair color:</header><span>${character.hair_color}</span>`
    characterInfo.appendChild(hair_color);

    const skin_color = document.createElement("div");
    skin_color.classList = "col-12 col-md-6 col-xl-3 info";
    skin_color.innerHTML = `<header>Skin color:</header><span>${character.skin_color}</span>`
    characterInfo.appendChild(skin_color);

    const eye_color = document.createElement("div");
    eye_color.classList = "col-12 col-md-6 col-xl-3 info";
    eye_color.innerHTML = `<header>Eye color:</header><span>${character.eye_color}</span>`
    characterInfo.appendChild(eye_color);

    const gender = document.createElement("div");
    gender.classList = "col-12 col-md-6 col-xl-3 info";
    gender.innerHTML = `<header>Gender:</header><span>${character.gender}</span>`
    characterInfo.appendChild(gender);

    const homeworld = document.createElement("div");
    homeworld.classList = "col-12 col-md-6 col-xl-3 info";
    homeworld.innerHTML = `<header>Homeworld:</header><span>${character.homeworld}</span>`
    characterInfo.appendChild(homeworld);

    const species = document.createElement("div");
    species.classList = "col-12 col-md-6 col-xl-3 info";
    species.innerHTML = `<header>Specie:</header><span>${character.species}</span>`
    characterInfo.appendChild(species);

    const created = document.createElement("div");
    created.classList = "col-12 col-md-6 col-xl-3 info";
    created.innerHTML = `<header>Created:</header><span>${character.created}</span>`
    characterInfo.appendChild(created);

    const edited = document.createElement("div");
    edited.classList = "col-12 col-md-6 col-xl-3 info";
    edited.innerHTML = `<header>Edited:</header><span>${character.edited}</span>`
    characterInfo.appendChild(edited);


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

    const starshipsCategory = document.createElement("div");
    starshipsCategory.classList = "col-12 col-sm-6 starshipsCategory category";
    starshipsCategory.innerHTML = "<span class='outline'><span class='black'>starships</span>starships</span>";
    links.appendChild(starshipsCategory);
    starshipsCategory.addEventListener("click", () => showStarships(character));

    const vehiclesCategory = document.createElement("div");
    vehiclesCategory.classList = "col-12 col-sm-6 filmsCategory category";
    vehiclesCategory.innerHTML = "<span class='outline'><span class='black'>vehicles</span>vehicles</span>";
    links.appendChild(vehiclesCategory);
    vehiclesCategory.addEventListener("click", () => showVehicles(character));

    const filmsCategory = document.createElement("div");
    filmsCategory.classList = "col-12 col-sm-6 vehiclesCategory category";
    filmsCategory.innerHTML = "<span class='outline'><span class='black'>films</span>films</span>";
    links.appendChild(filmsCategory);
    filmsCategory.addEventListener("click", () => showFilms(character));
}

async function showStarships(character) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Starships:") {
        return;
    }
    chosenCategory.innerHTML = "Starships:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const starships = await generateElementsList(character.starships, getStarships, generateStarshipDetailsView);
    starships.forEach(starship => {
        links.appendChild(starship);
    });

    nothing(links);
}

async function showFilms(planet) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Films:") {
        return;
    }

    chosenCategory.innerHTML = "Films:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const films = await generateElementsList(planet.films, getFilms, generateFilmDetailsView);
    films.forEach(film => {
        links.appendChild(film);
    });
    nothing(links);
}

async function showVehicles(character) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Vehicles:") {
        return;
    }

    chosenCategory.innerHTML = "Vehicles:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const vehicles = await generateElementsList(character.vehicles, getVehicles, generateVehicleDetailsView);
    vehicles.forEach(vehicle => {
        links.appendChild(vehicles);
    });
    nothing(links);
}
