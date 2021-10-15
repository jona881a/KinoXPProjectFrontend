const out = (str) => console.log(str);
const table = document.getElementById("screeningsTable");

function addRow(screening) {
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
    cell8.innerHTML = screening.percentageReserved;

    let cell9 = row.insertCell(8);
    cell9.innerHTML = screening.isCancelled;

    //button til at slette movie
    let cell10 = row.insertCell(9);
    let pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Delete screening");
    pbDelete.onclick = function () {
        document.getElementById(screening.screening).remove();

        deleteSreening(screening);
    }
    cell10.appendChild(pbDelete);
}


async function deleteSreening(screening) {
    try {
        const response = await restDeleteScreening(screening);
        out("Vi har slettet");
        out(response);

    } catch(error) {
        alert(error.message);
        out(error);
    }
}

async function restDeleteScreening(screening) {
    const url = "http://localhost:8080/screening/" + screening.screeningID;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        out("det gik ikke godt");
    }

    return response;
}
    async function createTableFromMap(btn) {
        await fetchScreeningsFromDB();
        console.log("create table");
        for (const screeningKey of screeningsMap.keys()) {
            const screening1 = screeningsMap.get(screeningKey);
            addRow(screening1);
        }
    }

    const pbCreateTable = document.querySelector(".pbCreateTable");
    pbCreateTable.addEventListener("click", createTableFromMap);












