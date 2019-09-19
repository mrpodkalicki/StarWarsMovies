import { insideMenu, render, nothing, markSelected } from "./UILayer";
import { generateElementsList } from "./elementsList";
import { getPeople, getFilms, getStarship } from "./SWAPIService";
import { generateFilmDetailsViewHeader,generateFilmDetailsViewCategory } from "./FilmDetailsView";
import { generateCharacterDetailsView } from "./CharacterDetailsView";
import { backToLastView,addWebBtnBAck,addDetailsURL } from "./BackFunction";

export { generateStarshipDetailsView };

async function generateStarshipDetailsView(starship,film) {
     addDetailsURL(starship);
    if (!(starship instanceof Object)) {
        starship = await getStarship(starship);
    }
    let view = document.querySelector(".view");
    const body = document.querySelector("body");
    body.removeChild(view);

    insideMenu(["Pilots", "Films"]);
    const back = document.querySelector(".backButton");
    const main = document.querySelector(".mainButton");
    const pil = document.querySelector(".PilotsButton");
    const films = document.querySelector(".FilmsButton");

    back.addEventListener("click",()=>{
        let backWeb = addWebBtnBAck();
        if (backWeb) {
            backToLastView(backWeb, film);
        }
        });
   
    main.addEventListener("click", render);
    pil.addEventListener("click", () => showPilots(starship));
    films.addEventListener("click", () => showFilms(starship));

    view = document.querySelector(".view");

    const title = document.createElement("header");
    title.classList = "title";
    title.innerHTML = starship.name;
    view.appendChild(title);

    const starshipInfo = document.createElement("div");
    starshipInfo.classList = "row";
    view.appendChild(starshipInfo);

    const model = document.createElement("div");
    model.classList = "col-12 col-md-6 col-xl-3 info";
    model.innerHTML = `<header>Model:</header><span>${starship.model}</span>`
    starshipInfo.appendChild(model);

    const manufacturer = document.createElement("div");
    manufacturer.classList = "col-12 col-md-6 col-xl-3 info";
    manufacturer.innerHTML = `<header>Manufacturer:</header><span>${starship.manufacturer}</span>`
    starshipInfo.appendChild(manufacturer);

    const cost_in_credits = document.createElement("div");
    cost_in_credits.classList = "col-12 col-md-6 col-xl-3 info";
    cost_in_credits.innerHTML = `<header>Cost in credits:</header><span>${starship.cost_in_credits}</span>`
    starshipInfo.appendChild(cost_in_credits);

    const length = document.createElement("div");
    length.classList = "col-12 col-md-6 col-xl-3 info";
    length.innerHTML = `<header>Length:</header><span>${starship.length}</span>`
    starshipInfo.appendChild(length);

    const max_atmosphering_speed = document.createElement("div");
    max_atmosphering_speed.classList = "col-12 col-md-6 col-xl-3 info";
    max_atmosphering_speed.innerHTML = `<header>Max atmosphering speed:</header><span>${starship.max_atmosphering_speed}</span>`
    starshipInfo.appendChild(max_atmosphering_speed);

    const crew = document.createElement("div");
    crew.classList = "col-12 col-md-6 col-xl-3 info";
    crew.innerHTML = `<header>Crew:</header><span>${starship.crew}</span>`
    starshipInfo.appendChild(crew);

    const passengers = document.createElement("div");
    passengers.classList = "col-12 col-md-6 col-xl-3 info";
    passengers.innerHTML = `<header>Passengers:</header><span>${starship.passengers}</span>`
    starshipInfo.appendChild(passengers);

    const cargo_capacity = document.createElement("div");
    cargo_capacity.classList = "col-12 col-md-6 col-xl-3 info";
    cargo_capacity.innerHTML = `<header>Cargo capacity:</header><span>${starship.cargo_capacity}</span>`
    starshipInfo.appendChild(cargo_capacity);

    const consumables = document.createElement("div");
    consumables.classList = "col-12 col-md-6 col-xl-3 info";
    consumables.innerHTML = `<header>Consumables:</header><span>${starship.consumables}</span>`
    starshipInfo.appendChild(consumables);

    const hyperdrive_rating = document.createElement("div");
    hyperdrive_rating.classList = "col-12 col-md-6 col-xl-3 info";
    hyperdrive_rating.innerHTML = `<header>Hyperdrive rating:</header><span>${starship.hyperdrive_rating}</span>`
    starshipInfo.appendChild(hyperdrive_rating);

    const MGLT = document.createElement("div");
    MGLT.classList = "col-12 col-md-6 col-xl-3 info";
    MGLT.innerHTML = `<header>MGLT:</header><span>${starship.MGLT}</span>`
    starshipInfo.appendChild(MGLT);

    const starship_class = document.createElement("div");
    starship_class.classList = "col-12 col-md-6 col-xl-3 info";
    starship_class.innerHTML = `<header>Starship class:</header><span>${starship.starship_class}</span>`
    starshipInfo.appendChild(starship_class);

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

    const pilotsCategory = document.createElement("div");
    pilotsCategory.classList = "col-12 col-sm-6 pilotsCategory category";
    pilotsCategory.innerHTML = "<span class='outline'><span class='black'>pilots</span>pilots</span>";
    links.appendChild(pilotsCategory);
    pilotsCategory.addEventListener("click", () => showPilots(starship));

    const filmsCategory = document.createElement("div");
    filmsCategory.classList = "col-12 col-sm-6 filmsCategory category";
    filmsCategory.innerHTML = "<span class='outline'><span class='black'>films</span>films</span>";
    links.appendChild(filmsCategory);
    filmsCategory.addEventListener("click", () => showFilms(starship));
}

async function showPilots(starship) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".PilotsButton"));

    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Pilots:") {
        return;
    }
    chosenCategory.innerHTML = "Pilots:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const pilots = await generateElementsList(starship.pilots, getPeople, generateCharacterDetailsView, starship, "StarshipDetails:");
    pilots.forEach(pilot => {
        links.appendChild(pilot);
    });
    nothing(links);
}

async function showFilms(starship) {
    const loading = document.querySelector(".loading");
    if (loading.style.display != "none") {
        return;
    }
    markSelected(document.querySelector(".FilmsButton"));
    
    const chosenCategory = document.querySelector(".categoryName");
    if (chosenCategory.innerHTML == "Films:") {
        return;
    }
    chosenCategory.innerHTML = "Films:";
    const links = document.querySelector(".links");
    links.innerHTML = "";
    const films = await generateElementsList(starship.films, getFilms, generateFilmDetailsViewHeader, starship, "StarshipDetails:");
    films.forEach(film => {
        links.appendChild(film);
    });
    nothing(links);
}
