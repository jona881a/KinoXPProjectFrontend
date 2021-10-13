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
            moviesMap.set(movie.movieID,movie);
            console.log(getMovie(2));
        })
    })
} //fetching movies from database

function showMoviesMap() {
    for (const movieKey of moviesMap.keys()) {
        console.log(moviesMap.get(movieKey));
    }
}

function getMovie(movieid) {
    return moviesMap.get(movieid);
}

//Eventlisteners
pbGetMovies.addEventListener('click',fetchMoviesFromDB);