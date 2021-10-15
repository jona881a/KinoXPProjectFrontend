console.log("jeg er i create room tabel");

const table = document.getElementById("room_tabel");

function addRow(room) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = room.room;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = room.roomID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = room.seatRow;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = room.seat;

}

function createTableFromMap(btn) {
    console.log("create table");
    for (const roomKey of roomsMap.keys()) {
        const room1 = roomsMap.get(roomKey);
        addRow(room1);
    }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);

