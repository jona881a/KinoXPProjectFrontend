const roomUrl = "http://localhost:8080/kommuneregid/1081";

function fetchAllRooms() {
    return fetch(roomUrl).then(response => response.json());
}

function callFetchAllKommuner(btn) {
    const prom = fetchAllRooms();
    prom.then(createRoomMap);
}

let roomMap = new Map();
function createKommuneMap(data) {
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

pbGetKommuner.addEventListener("click", callFetchAllKommuner);
pbShowMap.addEventListener("click", showKommuneMap);