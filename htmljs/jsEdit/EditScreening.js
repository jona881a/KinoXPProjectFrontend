const movieSelector = document.getElementById("moviedropdownEdit");

let selectedMovie;
let screeningObj = null;

async function loadAsyncData() {
    console.log("Start");
    await fetchMoviesFromDB();
    await  fetchScreeningsFromDB();
    console.log("slut");
    //showMoviesMap();
    createDropDown();

    console.log("DETTE ER VIGTIGT");
    console.log(localStorage.getItem("screeningID"));

    console.log(screeningsMap);
    screeningObj = screeningsMap.get(parseInt(localStorage.getItem("screeningID")));
    console.log(screeningObj);


}

function createDropDown() {
    moviesMap.forEach(movie => {
        console.log(movie);
        const optionTags = document.createElement("option");
        optionTags.textContent = movie.movieName;
        optionTags.value = movie.movieID;
        movieSelector.appendChild(optionTags)
        console.log(optionTags);

        movieSelector.addEventListener("change", (event) => {
            const optionIndex = movieSelector.selectedIndex;
            selectedMovie = moviesMap.get(optionIndex);
        })
    })
}

loadAsyncData();

const editStart = document.getElementById("editDateStart");
const editEnd = document.getElementById("editDateEnd");
const movieEdit = document.getElementById("moviedropdownEdit");
const roomEdit = document.getElementById("editRoomNumber")
const priceEdit = document.getElementById("editPrice")

const pbUpdate = document.getElementById("updateScreening")
pbUpdate.onclick = function() {

    screeningObj.startTime = editStart.value;
    screeningObj.endTime = editEnd.value;
    screeningObj.movieName = movieEdit.value;
    screeningObj.room.roomNumber = roomEdit.value;
    screeningObj.seatPrice = priceEdit.value;

    updateScreening(screening);

    const url = "/KinoXPProjectFrontend/htmljs/Screenings.html";
    window.location.href = url;
}

async function updateScreening(screening){
    try {
        const response = await restUpdateScreening(screening);
    } catch(error) {
        alert(error.message);
    }
}

async function restUpdateScreening(screening){
    const url = "http://localhost:8080/screening/"+ screening.screeningID;
    const jsonString = JSON.stringify(screening);
    out(jsonString);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonString
    }
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
       console.log("nope");
    }
    return response.json();
}