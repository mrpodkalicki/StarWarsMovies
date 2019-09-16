import { insideMenu, render, nothing } from "./UILayer";
import { generateElementsList } from "./elementsList";
import { getPeople, getPlanet, getFilms } from "./SWAPIService";
import { generateFilmDetailsView } from "./FilmDetailsView";
import { generateCharacterDetailsView } from "./CharacterDetailsView";
import { backFunction } from "./BackFunction";

export { generatePlanetDetailsView };

async function generatePlanetDetailsView(planet) {
    if (!(planet instanceof Object)) {
        planet = await getPlanet(planet);
    }
    let view = document.querySelector(".view");
    const body = document.querySelector("body");
    body.removeChild(view);

    insideMenu(["Residents", "Films"]);
    const back = document.querySelector(".backButton");
    const main = document.querySelector(".mainButton");
    const res = document.querySelector(".ResidentsButton");
    const films = document.querySelector(".FilmsButton");

    back.addEventListener("click", backFunction);
    main.addEventListener("click", render);
    res.addEventListener("click", () => showResidents(planet));
    films.addEventListener("click", () => showFilms(planet));

    view = document.querySelector(".view");

    const title = document.createElement("header");
    title.classList = "title";
    title.innerHTML = planet.name;
    view.appendChild(title);

    const planetInfo = document.createElement("div");
    planetInfo.classList = "row";
    view.appendChild(planetInfo);

    const rotation_period = document.createElement("div");
    rotation_period.classList = "col-12 col-md-6 col-xl-3 info";
    rotation_period.innerHTML = `<header>Rotation period:</header><span>${planet.rotation_period}</span>`
    planetInfo.appendChild(rotation_period);

    const orbital_period = document.createElement("div");
    orbital_period.classList = "col-12 col-md-6 col-xl-3 info";
    orbital_period.innerHTML = `<header>orbital period:</header><span>${planet.orbital_period}</span>`
    planetInfo.appendChild(orbital_period);

    const diameter = document.createElement("div");
    diameter.classList = "col-12 col-md-6 col-xl-3 info";
    diameter.innerHTML = `<header>Diameter:</header><span>${planet.diameter}</span>`
    planetInfo.appendChild(diameter);

    const climate = document.createElement("div");
    climate.classList = "col-12 col-md-6 col-xl-3 info";
    climate.innerHTML = `<header>Climate:</header><span>${planet.climate}</span>`
    planetInfo.appendChild(climate);

    const gravity = document.createElement("div");
    gravity.classList = "col-12 col-md-6 col-xl-3 info";
    gravity.innerHTML = `<header>Gravity:</header><span>${planet.gravity}</span>`
    planetInfo.appendChild(gravity);

    const terrain = document.createElement("div");
    terrain.classList = "col-12 col-md-6 col-xl-3 info";
    terrain.innerHTML = `<header>Terrain:</header><span>${planet.terrain}</span>`
    planetInfo.appendChild(terrain);

    const surface_water = document.createElement("div");
    surface_water.classList = "col-12 col-md-6 col-xl-3 info";
    surface_water.innerHTML = `<header>Surface water:</header><span>${planet.surface_water}</span>`
    planetInfo.appendChild(surface_water);

    const population = document.createElement("div");
    population.classList = "col-12 col-md-6 col-xl-3 info";
    population.innerHTML = `<header>Population:</header><span>${planet.population}</span>`
    planetInfo.appendChild(population);

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

    const residentsCategory = document.createElement("div");
    residentsCategory.classList = "col-12 col-sm-6 residentsCategory category";
    residentsCategory.innerHTML = "<span class='outline'><span class='black'>residents</span>residents</span>";
    links.appendChild(residentsCategory);
    residentsCategory.addEventListener("click", () => showResidents(planet));

    const filmsCategory = document.createElement("div");
    filmsCategory.classList = "col-12 col-sm-6 filmsCategory category";
    filmsCategory.innerHTML = "<span class='outline'><span class='black'>films</span>films</span>";
    links.appendChild(filmsCategory);
    filmsCategory.addEventListener("click", () => showFilms(planet));
}

async function showResidents(planet) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Residents:") {
        return;
    }
    chosenCategory.innerHTML = "Residents:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const residents = await generateElementsList(planet.residents, getPeople, generateCharacterDetailsView);
    residents.forEach(resident => {
        links.appendChild(resident);
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
