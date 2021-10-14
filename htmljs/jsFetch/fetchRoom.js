

//URL til controlleren i backenden som henter alle rooms i JSON format
const urlRooms = "http://localhost:8080/rooms";

//Query for knappen som aktivere vores request til databasen
const pbGetRooms = document.querySelector(".pbGetRooms");
const roomsMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

function fetchRoomsFromDB() {
    //Henter alt i moviestabellen og laver det til et promiseobject
    const promise = fetch(urlRooms).then(response => response.json());
    promise.then(data =>{ //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(room => { //Vi hiver hver movie ud af promiseobjektet
            roomsMap.set(room.roomID, room);
            console.log(getRoom(2));
        })
    })
} //fetching room from database




function showRoomMap() {
    for (const roomKey of roomsMap.keys()) {
        console.log(roomsMap.get(roomKey));
    }
}

function getRoom(roomid) {
    return roomsMap.get(roomid);
}

//Eventlisteners
pbGetRooms.addEventListener('click',fetchRoomsFromDB);

function updateTableHTMLRoom(myArray) {
    var tableBody = document.getElementById("rooms"),
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
