import { insideMenu, render, nothing, markSelected } from "./UILayer";
import { generateElementsList } from "./elementsList";
import { getPeople, getFilms, getVehicle } from "./SWAPIService";
import { generateFilmDetailsViewHeader } from "./FilmDetailsView";
import { generateCharacterDetailsView } from "./CharacterDetailsView";
import { backToLastView,addWebBtnBAck,addDetailsURL } from "./BackFunction";
export {generateVehicleDetailsView};

async function generateVehicleDetailsView(vehicle,film){
    addDetailsURL(vehicle);
    if (!(vehicle instanceof Object)) {
        vehicle = await getVehicle(vehicle);
    }
    let view = document.querySelector(".view");
    const body = document.querySelector("body");
    body.removeChild(view);

    insideMenu(["Pilots", "Films"]);
    const back = document.querySelector(".backButton");
    const main = document.querySelector(".mainButton");
    const pil = document.querySelector(".PilotsButton");
    const films = document.querySelector(".FilmsButton");

    back.addEventListener("click", () => {
    let backWeb = addWebBtnBAck();
    if (backWeb) {
        backToLastView(backWeb, film);
    }
    });
    main.addEventListener("click", render);
    pil.addEventListener("click", () => showPilots(vehicle));
    films.addEventListener("click", () => showFilms(vehicle));

    view = document.querySelector(".view");

    const title = document.createElement("header");
    title.classList = "title";
    title.innerHTML = vehicle.name;
    view.appendChild(title);

    const starshipInfo = document.createElement("div");
    starshipInfo.classList = "row";
    view.appendChild(starshipInfo);

    const model = document.createElement("div");
    model.classList = "col-12 col-md-6 col-xl-4 info";
    model.innerHTML = `<header>Model:</header><span>${vehicle.model}</span>`
    starshipInfo.appendChild(model);

    const manufacturer = document.createElement("div");
    manufacturer.classList = "col-12 col-md-6 col-xl-4 info";
    manufacturer.innerHTML = `<header>Manufacturer:</header><span>${vehicle.manufacturer}</span>`
    starshipInfo.appendChild(manufacturer);

    const cost_in_credits = document.createElement("div");
    cost_in_credits.classList = "col-12 col-md-6 col-xl-4 info";
    cost_in_credits.innerHTML = `<header>Cost in credits:</header><span>${vehicle.cost_in_credits}</span>`
    starshipInfo.appendChild(cost_in_credits);

    const length = document.createElement("div");
    length.classList = "col-12 col-md-6 col-xl-4 info";
    length.innerHTML = `<header>Length:</header><span>${vehicle.length}</span>`
    starshipInfo.appendChild(length);

    const max_atmosphering_speed = document.createElement("div");
    max_atmosphering_speed.classList = "col-12 col-md-6 col-xl-4 info";
    max_atmosphering_speed.innerHTML = `<header>Max atmosphering speed:</header><span>${vehicle.max_atmosphering_speed}</span>`
    starshipInfo.appendChild(max_atmosphering_speed);

    const crew = document.createElement("div");
    crew.classList = "col-12 col-md-6 col-xl-4 info";
    crew.innerHTML = `<header>Crew:</header><span>${vehicle.crew}</span>`
    starshipInfo.appendChild(crew);

    const passengers = document.createElement("div");
    passengers.classList = "col-12 col-md-6 col-xl-4 info";
    passengers.innerHTML = `<header>Passengers:</header><span>${vehicle.passengers}</span>`
    starshipInfo.appendChild(passengers);

    const cargo_capacity = document.createElement("div");
    cargo_capacity.classList = "col-12 col-md-6 col-xl-4 info";
    cargo_capacity.innerHTML = `<header>Cargo capacity:</header><span>${vehicle.cargo_capacity}</span>`
    starshipInfo.appendChild(cargo_capacity);

    const consumables = document.createElement("div");
    consumables.classList = "col-12 col-md-6 col-xl-4 info";
    consumables.innerHTML = `<header>Consumables:</header><span>${vehicle.consumables}</span>`
    starshipInfo.appendChild(consumables);

    const vehicle_class = document.createElement("div");
    vehicle_class.classList = "col-12 col-md-6 col-xl-12 info";
    vehicle_class.innerHTML = `<header>Vehicle class:</header><span>${vehicle.vehicle_class}</span>`
    starshipInfo.appendChild(vehicle_class);

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
    pilotsCategory.addEventListener("click", () => showPilots(vehicle));

    const filmsCategory = document.createElement("div");
    filmsCategory.classList = "col-12 col-sm-6 filmsCategory category";
    filmsCategory.innerHTML = "<span class='outline'><span class='black'>films</span>films</span>";
    links.appendChild(filmsCategory);
    filmsCategory.addEventListener("click", () => showFilms(vehicle));
}

async function showPilots(vehicle) {
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
    const pilots = await generateElementsList(vehicle.pilots, getPeople, generateCharacterDetailsView, vehicle, "VehicleDetails:");
    pilots.forEach(pilot => {
        links.appendChild(pilot);
    });
    nothing(links);
}

async function showFilms(vehicle) {
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
    const films = await generateElementsList(vehicle.films, getFilms, generateFilmDetailsViewHeader, vehicle, "VehicleDetails:");
    films.forEach(film => {
        links.appendChild(film);
    });
    nothing(links);
}
