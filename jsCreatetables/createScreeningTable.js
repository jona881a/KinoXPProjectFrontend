

const table = document.getElementById("screeningsTable");

function addRows(Screening) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = screening.screening;

    let cellID = row.insertCell(0);
    cellID.innerHTML = screening.let
    cellTimeStart = row.insertCell(1);
    cellTime.innerHTML = screening.startTime;

    let cellTimeEnd = row.insertCell(2);
    cellTimeEnd.innerHTML = screening.endTime;


}







