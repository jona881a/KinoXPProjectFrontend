console.log("jeg er i create employee tabel");

const table = document.getElementById("employees_table");

function addRow(employee) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = employee.employee;
    console.log("row id = employee" + row.id);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = employee.employeeID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = employee.employeeName;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = employee.screening.screeningID;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = employee.screening.startTime;

}

async function createTableFromMap(btn) {
    await  fetchEmployeesFromDB();
    console.log("create table");
    for (const employeeKey of employeesMap.keys()) {
        const employee1 = employeesMap.get(employeeKey);
        console.log(employee1);
        addRow(employee1);
    }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);

