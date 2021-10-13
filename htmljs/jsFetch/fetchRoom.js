

//URL til controlleren i backenden som henter alle rooms i JSON format
const urlRooms = "http://localhost:8080/rooms";

//Query for knappen som aktivere vores request til databasen
const pbGetRooms = document.querySelector(".pbGetRooms");
const RoomsMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

function fetchRoomsFromDB() {
    //Henter alt i moviestabellen og laver det til et promiseobject
    const promise = fetch(urlRooms).then(response => response.json());
    promise.then(data =>{ //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(Room => { //Vi hiver hver movie ud af promiseobjektet
            console.log(Room);
        })
    })
} //fetching movies from database

//Eventlisteners
pbGetRooms.addEventListener('click',fetchRoomsFromDB);

