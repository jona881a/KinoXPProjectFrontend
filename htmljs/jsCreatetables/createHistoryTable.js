const table = document.getElementById("history_table");

function addRow(history){
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = history.history;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = history.screeningID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = history.movieName;

    let start = history.startTime.substr(0,10);
    start += " "+history.startTime.substr(11,8);

    console.log(start);


    let cell3 = row.insertCell(2);
    cell3.innerHTML = start;

    let end = history.endTime.substr(0,10);
    end +=" "+history.endTime.substr(11,8);

    let cell4 = row.insertCell(3);
    cell4.innerHTML = end;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = history.ageRestriction;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = history.availableSeats;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = history.reservedSeats;

    let cell8 = row.insertCell(7);
    cell8.innerHTML = history.seatPrice;


}

async function createTableFromMap(btn){
    await fetchHistoryFromDB();
    console.log("createtable For History");
    for(const key of historyMap.keys()){
        const history = historyMap.get(key);
        addRow(history);
    }
}

const pbShowHistory = document.querySelector(".pbCreateTable");
pbShowHistory.addEventListener("click",createTableFromMap);