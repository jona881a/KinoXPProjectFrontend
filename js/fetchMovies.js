//URL til controlleren i backenden som henter alle movies i JSON format
const urlMovies = "http://localhost:8080/movies";

//Query for knappen som aktivere vores request til databasen
const pbGetMovies = document.querySelector(".pbGetMovies");
const moviesMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

function fetchMoviesFromDB() {
    //Henter alt i moviestabellen og laver det til et promiseobject
    const promise = fetch(urlMovies).then(response => response.json());
    promise.then(data =>{ //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(movie => { //Vi hiver hver movie ud af promiseobjektet
            console.log(movie);
        })
    })
} //fetching movies from database

//Eventlisteners
pbGetMovies.addEventListener('click',fetchMoviesFromDB);


/*
function fetchAllRegioner() {
    return fetch(regionUrl).then(response => response.json());
}

function actionFetchAllRegioner(btn) {
    const prom = fetchAllRegioner();
    prom.then(createRegionMap);
}

let regionMap = new Map();
function createRegionMap(data) {
    out("start create region")
    data.forEach(region => {
        out(region);
        regionMap.set(region.regionKode, region);
    })
}

function showRegionMap() {
    for (const regionKey of regionMap.keys()) {
        out(regionMap.get(regionKey));
    }
}

actionFetchAllRegioner("ehj");

const pbShowRegionMap = document.querySelector(".pbShowRegionMap");
pbShowRegionMap.addEventListener("click", showRegionMap);

*/