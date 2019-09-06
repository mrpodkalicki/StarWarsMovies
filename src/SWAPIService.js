//Get movies and push into array
async function getFilms(){
    const movies = [];
    let url = "https://swapi.co/api/films/";
    while(url !== null){
        const response = await getResponse(url);
        movies.push(...response.results);
        url = response.next;
    }
    return movies;
}
// Get single movie
async function getFilm(url){
    let movie = await getResponse(url);
    return movie; 
}


async function  sendingRequest(moviesName){
    const url = "https://swapi.co/api/films/?search=";
    const link = encodeURI(url + moviesName);
        data =  await fetch(link, {
             "method": "GET",
             "headers": {
             }
         })
         .then(response => response.json())
         .then(response => {
              const dataAboutMovies = response["results"][0] != undefined ? response["results"] : "Nothing findedd";
              return dataAboutMovies
         }).catch(err => {
              return err
         });
         return data
};
async function SearchingMovies (moviesName) {
    const response = await sendingRequest(moviesName);
    console.log(response);
    return response
};
const output= SearchingMovies(""); //return promise 

// Get all planets in SWAPI
async function getPlanets() {
    const planets = [];
    let path = "https://swapi.co/api/planets/";
    //Loop for getting planets from all pages
    while (path !== null) {
        const response = await getResponse(path);
        planets.push(...response.results);
        path = response.next;
    }

    return planets;
}

// Get one specific planet 
async function getPlanet(path) {
    let planet = await getResponse(path);
    return planet;
}

//One async function to get responce from api
async function getResponse(path) {
    let response;

    await fetch(path)
        .then(resp => resp.json())
        .then(resp => response = resp)
        .catch(err => console.log(err));

    return response;
}
// Get all characters
async function getPeople(){
    const people = [];
    let URL = 'https://swapi.co/api/people/';
    while(URL !== null){
        const response = await getResponse(URL);
        people.push(...response.results);
        URL = response.next
    }
    return people;
}
// Geet one specific character
async function getCharacter(URL){
    let character = await getResponse(URL);
    return character; 
}


//Get movies and push into array
async function getFilms(){
    const movies = [];
    let url = "https://swapi.co/api/films/";
    while(url !== null){
        const response = await getResponse(url);
        movies.push(...response.results);
        url = response.next;
    }
    return movies;
}
// Get single movie
async function getFilm(url){
    let movie = await getResponse(url);
    return movie; 
}
// Get all vehicles
async function getVehicles(){
    const vehicles = [];
    let URL = 'https://swapi.co/api/vehicles/';
    while(URL !== null){
        const response = await getResponse(URL);
        vehicles.push(...response.results);
        URL = response.next;
    }
    return vehicles;
}
// Get one specific vehicle
async function getVehicle(URL){
    let vehicle = await getResponse(URL);
    return vehicle; 
}
