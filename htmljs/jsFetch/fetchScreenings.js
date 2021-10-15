//URL til controlleren i backenden som henter alle movies i JSON format
const urlScreenings = "http://localhost:8080/screnings";

//Query for knappen som aktivere vores request til databasen
const screeningsMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

//Henter alt i moviestabellen og laver det til et promiseobject
async function fetchScreeningsFromDB() {
    const promise = fetch(urlScreenings).then(response => response.json());
    await promise.then(data => { //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(movie => { //Vi hiver hver movie ud af promiseobjektet
            screeningsMap.set(screening.screeningID, screening);
        })
    })
}//fetching movies from database


function showScreeningsMap() {
    for (const screeningKey of screeningsMap.keys()) {
        console.log(screeningsMap.get(screeningKey));
    }
} //Viser movies i et map i konsolen

function getScreening(screeningid) {
    return screeningsMap.get(screeningid);
} //Henter den enkelte movies pba. deres movieid

function updateTableHTML(myArray) {
    var tableBody = document.getElementById("screenings"),
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