
//URL til controlleren i backenden som henter alle movies i JSON format
const urlMovies = "http://localhost:8080/movies";

//Query for knappen som aktivere vores request til databasen
const moviesMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

//Henter alt i moviestabellen og laver det til et promiseobject
async function fetchMoviesFromDB() {
    const promise = fetch(urlMovies).then(response => response.json());
    await promise.then(data => { //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(movie => { //Vi hiver hver movie ud af promiseobjektet
            moviesMap.set(movie.movieID, movie);
        })
    })
}//fetching movies from database


function showMoviesMap() {
    for (const movieKey of moviesMap.keys()) {
        console.log(moviesMap.get(movieKey));
    }
} //Viser movies i et map i konsolen

function getMovie(movieid) {
    return moviesMap.get(movieid);
} //Henter den enkelte movies pba. deres movieid

//Eventlisteners
pbGetMovies.addEventListener('click',fetchMoviesFromDB);


function updateTableHTML(myArray) {
    var tableBody = document.getElementById("movies"),
        newRow, newCell;

    // Reset the table
    tableBody.innerHTML = "";

    // Build the new table
    for (var i=0; i < myArray.length; i++) {
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);

        if (myArray[i] instanceof Array) {
            for (var j=0; j < myArray[i].length; j++) {
                newCell = document.createElement("td");
                newCell.textContent = update[i][j];
                newRow.appendChild(newCell);
            }
        } else {
            newCell = document.createElement("td");
            newCell.textContent = myArray[i];
            newRow.appendChild(newCell);
        }
    }
}