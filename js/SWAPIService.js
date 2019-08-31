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
