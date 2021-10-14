out("jeg er i create room tabel");

const table = document.getElementById("room_tabel");

function addRow(room) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = room.room;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = room.roomID;

    //let cell2 = row.insertCell(1);
    //cell2.innerHTML = room.room;
    let cell2 = row.insertCell(1);
    cell2.innerHTML = room.row;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = room.seats;

}

function createTableFromMap(btn) {
    out("create table");
    table.innerHTML = "";
    for (const roomKey of roomMap.keys()) {
        const room1 = roomMap.get(roomKey);
        addRow(room1);
    }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);

