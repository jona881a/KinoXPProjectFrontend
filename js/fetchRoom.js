const roomUrl = "http://localhost:8080/kommuneregid/1081";

function fetchAllRooms() {
    return fetch(roomUrl).then(response => response.json());
}

/* const prom = fetchAllRooms();
    prom.then(createRoomsMap);
*/

function callFetchAllKommuner(btn) {
    const prom = fetchAllKommuner();
    prom.then(createKommuneMap);
}

let roomMap = new Map();
function createRoomMap(data) {
    out("start create room")
    data.forEach(kom => {
        out(data);
        roomMap.set(kom.roomNavn, kom);
    })
}

function showKommuneMap() {
    for (const komKey of kommuneMap.keys()) {
        out(kommuneMap.get(komKey));
    }
}

const pbGetKommuner = document.querySelector(".pbGet");
const pbShowMap = document.querySelector(".pbShowKomMap");