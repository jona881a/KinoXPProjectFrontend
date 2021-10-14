const table = document.getElementById("movie_tabel");

function addRow(movie) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = movie.movie;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = movie.movieID;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = movie.movieName;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = movie.duration;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = movie.description;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = movie.ageRestriction;

    let cell6 = row.insertCell(5);
    cell6.innerHTML = movie.actors;

    let cell7 = row.insertCell(6);
    cell7.innerHTML = movie.isAvailable;


    //button til at slette movie
    let cell8 = row.insertCell(7);
    let pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Delete movie");
    pbDelete.onclick = function () {
        document.getElementById(movie.movie).remove();
        //table.deleteRow(0);
        deleteMovie(movie);
    }
    cell8.appendChild(pbDelete);

}

 //add row

async function deleteMovie(movie) {
    try {
        const response = await restDeleteMovie(movie);

    } catch(error) {
        alert(error.message);
    }
}

async function restDeleteMovie(movie) {
    const url = "http://localhost:8080/movie/" + movie.movieID;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
    }

    return response;
}


function createTableFromMap(btn) {
    table.innerHTML = "";
    for (const movieKey of movieMap.keys()) {
        const movie1 = movieMap.get(movieKey);
        addRow(movie1);
    }
}

const pbCreateTable = document.querySelector(".pbCreateTable");
pbCreateTable.addEventListener("click", createTableFromMap);

