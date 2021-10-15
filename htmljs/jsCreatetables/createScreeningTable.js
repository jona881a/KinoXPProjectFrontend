

const table = document.getElementById("screeningsTable");

function addRows(Screening) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = screening.screening;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = screening.screeningID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = screening.movie.movieName;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = screening.room.roomID;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = screening.ageRestriction;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = screening.seatPrice;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = screening.reservedSeats;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = screening.availableSeats;

    let cell8 = row.insertCell(7);
    cell5.innerHTML = screening.percentageReserved;

    let cell9 = row.insertCell(8);
    cell5.innerHTML = screening.isCancelled;



    async function createTableFromMap(btn) {
        await fetchScreeningsFromDB();
        console.log("create table");
        for (const roomKey of roomsMap.keys()) {
            const room1 = roomsMap.get(roomKey);
            addRow(room1);
        }
    }

    const pbCreateTable = document.querySelector(".pbCreateTable");
    pbCreateTable.addEventListener("click", createTableFromMap);




}







