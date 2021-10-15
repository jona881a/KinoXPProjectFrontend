
console.log("createScreening called");

const movieSelector = document.getElementById("moviedropdown");

let selectedMovie;

async function loadAsyncData() {
    console.log("Start");
    await fetchMoviesFromDB();
    console.log("slut");
    //showMoviesMap();
    createDropDown();
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

document.addEventListener("DOMContentLoaded",createFormEventListener);

function createFormEventListener() { //Laver eventet der lytter til hvornår vi henter formen
    const formObject = document.getElementById("assign");
    formObject.addEventListener("submit",handleScreeningsSubmit);
}

async function handleScreeningsSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget; //Fortæller hvilket event (submittet) som vi skal tage fra
    const url = form.action; //Tager det url som står i action i formheaderen

    try {
        const formData = new FormData(form);
        await insertScreeningInBackend(url,formData);
    } catch(error) {
        alert(error.message);
    }
}

async function insertScreeningInBackend(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());

    console.log(plainFormData);
    //console.log(toJSONString);
    console.log(selectedMovie);

    const screeningJSON = {
        movieName : selectedMovie.movieName,
        startTime : plainFormData.movieStartDateAndTime,
        endTime : plainFormData.movieEndDateAndTime,
        seatPrice : plainFormData.pricePrSeat,
        ageRestriction : selectedMovie.ageRestriction,
        reservedSeats : 0,
        availableSeats : 400,
        percentageReserved : 0,
        isCancelled : 0,
        movieID : selectedMovie.movieID,
        roomID : plainFormData.roomNumber,
        historyID : 0
    }
    /*
     private Date startTime;
    private Date endTime;
    private double seatPrice;
    private int ageRestriction;
    private int reservedSeats;
    private int availableSeats;
    private double percentageReserved;
    private boolean isCancelled;
     */

    const JSONObjectToJSONString = JSON.stringify(screeningJSON);

    console.log(JSONObjectToJSONString);

    const POSTOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSONObjectToJSONString
    }

    const response = await fetch(url, POSTOptions);




    return response.json();

}


loadAsyncData();