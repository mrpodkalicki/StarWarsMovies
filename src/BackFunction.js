export {
    backFunction,
    addWebBtnBAck,
    remWebBtnAck,
    backToLastView,
    addToarray,
    addDetailsURL
};
import { generateFilmDetailsViewHeader,generateFilmDetailsViewCategory,showPlanets,showVehicles,showStarships,showCharacters } from "./FilmDetailsView";
import {
    generateStarshipDetailsView
} from "./StarshipDetailsView";
import {
    generateCharacterDetailsView
} from "./CharacterDetailsView";
import {
    generateVehicleDetailsView
} from "./VehicleDetailsView";
import {
    generatePlanetDetailsView
} from "./PlanetDetailsView"
import {render} from "./UILayer";

let allView=[];

let URL=[];

const refresh=()=>{
    allView=[]
}
const remWebBtnAck=()=>{
    allView.shift();
}
const addWebBtnBAck=()=>{
    return allView[0];

}

const addToarray=(categName)=>{
    allView.unshift(categName);
    console.log(allView);

};
const addDetailsURL=(url)=>{
     URL = url;
}

function backFunction(content){
    if (content=="render"){
        refresh();
    }else{
        const div=document.createElement('div');
        div.innerHTML=content;
        const view=div.querySelector(".view");
        if (!view){
            allView.unshift("main");
        }else{
            const div=document.createElement('div');
            div.innerHTML=content;
            const view=div.querySelector(".view");
            const categName=view.querySelector(".categoryName").innerText;
            const viewNow=document.querySelector(".categoryName").innerText;
            if(viewNow!=categName){
                const categName=view.querySelector(".categoryName").innerText;
                if (categName){
                    addToarray(categName);
                }else{
                     addToarray("detailsFilm");
                };
            };
        };
    };
    return 1;
}
const  backToLastView=(view,film)=>{
    console.log(view,"toview")
    
    remWebBtnAck();
    switch (view) {
        case "main":
            render();
            break;
        case "detailsFilm":
            delAllView()
            generateFilmDetailsViewHeader(film);
            generateFilmDetailsViewCategory(film);
             break;
        case "Characters:":
            showCharacters(film);
            remWebBtnAck();
            break;
        case "Starships:":
            showStarships(film);
            remWebBtnAck();
            break;
        case "Vehicles:":
            showVehicles(film);
            remWebBtnAck();
            break;
        case "Planets:": 
            showPlanets(film);
            remWebBtnAck();
            break;
        case "CharactersDetails:":
            generateCharacterDetailsView(URL, film);
            break;
        case "PlanetDetails:":
            generatePlanetDetailsView(URL, film);
            break;
        case "VehicleDetails:":
            generateVehicleDetailsView(URL, film);
            break;
        case "StarshipDetails:":
            generateStarshipDetailsView(URL, film);
            break 
        default:
            break;
    }
}
async function delAllView(){
    let DOM=document.querySelector(".b-body")
    const view=DOM.querySelector(".view");
    DOM.removeChild(view);
}