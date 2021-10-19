const out = (str) => console.log(str);
const table = document.getElementById("screeningsTable");

function addRow(screening) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = screening.screening;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = screening.screeningID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = screening.startTime;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = screening.movie.movieName;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = screening.room.roomID;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = screening.ageRestriction;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = screening.seatPrice;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = screening.reservedSeats;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = screening.availableSeats;

    let cell9 = row.insertCell(8);
    cell9.innerHTML = screening.percentageReserved;

    let cell10 = row.insertCell(9);
    cell10.innerHTML = screening.employee.emloyeeName;

    //button til at slette movie
    let cell11 = row.insertCell(10);
    let pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Delete screening");
    pbDelete.onclick = function () {
        document.getElementById(screening.screening).remove();

        deleteSreening(screening);
    }
    cell11.appendChild(pbDelete);

    let cell12 = row.insertCell(11)
    let pbCancel = document.createElement("input");
    pbCancel.type = "button";
    pbCancel.setAttribute("value", "Cancel Screening");
    pbCancel.onclick = function () {
        // document.getElementById(screening.screening).

        const historyObject = {
            screeningID: document.getElementById(screening.screeningID),
            movieName: document.getElementById(screening.movieName),
            startTime: document.getElementById(screening.startTime),
            endTime: document.getElementById(screening.endTime),
            seatPrice: document.getElementById(screening.ageRestriction),
            reservedSeats: document.getElementById(screening.reservedSeats),
            availableSeats: document.getElementById(screening.availableSeats),
            percentageReserved: document.getElementById(screening.percentageReserved)
        }
    }
    let cell13 = row.insertCell(12)
    let pbEdit = document.createElement("input");
    pbEdit.type = "button";
    pbEdit.setAttribute("value", "Edit screening");


    pbEdit.onclick = function(){
        localStorage.setItem("screeningID",screening.screeningID);

        const url = "/KinoXPProjectFrontend/htmljs/EditScreening.html";
        window.location.href = url;
    }

    cell13.appendChild(pbEdit);


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



function searchDropDown() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("screeningsTable");

    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}








