
//URL til controlleren i backenden som henter alle movies i JSON format
const urlEmployees = "http://localhost:8080/employees";

//Query for knappen som aktivere vores request til databasen
const employeesMap = new Map(); //map der holder alle movies så de kan findes frem på deres keys

//Henter alt i movies tabellen og laver det til et promiseobject
async function fetchEmployeesFromDB() {
    const promise = fetch(urlEmployees).then(response => response.json());
    await promise.then(data => { //Vi reagere på dataen der kommer fra vores RESTapi
        data.forEach(employee => { //Vi hiver hver movie ud af promiseobjektet
            employeesMap.set(employee.employeeID, employee);
        })
    })
}//fetching movies from database


function showEmployeesMap() {
    for (const employeeKey of employeesMap.keys()) {
        console.log(employeesMap.get(employeeKey));
    }
} //Viser movies i et map i konsolen

function getEmployee(employeeID) {
    return employeesMap.get(employeeID);
} //Henter den enkelte movies pba. deres movieid

function updateTableHTML(myArray) {
    var tableBody = document.getElementById("employees"),
        newRow, newCell;

    // Reset the table
    tableBody.innerHTML = "";

    // Build the new table
    for (var i=0; i < myArray.length; i++) {
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);

        if (myArray[i] instanceof Array) {
            for (var j=0; j < myArray[i].length; j++) {
                newCell = document.createElement("td");
                newCell.textContent = update[i][j];
                newRow.appendChild(newCell);
            }
        } else {
            newCell = document.createElement("td");
            newCell.textContent = myArray[i];
            newRow.appendChild(newCell);
        }
    }
}
