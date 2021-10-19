
console.log("createScreening called");

const movieSelector = document.getElementById("moviedropdown");

let selectedMovie;

async function loadAsyncData() {
    await fetchMoviesFromDB();
    createDropDown();
}

function createDropDown() {
        moviesMap.forEach(movie => {
            const optionTags = document.createElement("option");
            optionTags.textContent = movie.movieName;
            optionTags.value = movie.movieID;
            movieSelector.appendChild(optionTags);
        })

        movieSelector.addEventListener("change", (event) => {
            const optionIndex = movieSelector.value;

            moviesMap.forEach(movie => {
                if(parseInt(optionIndex) === parseInt(movie.movieID)){
                    selectedMovie = movie;
                }
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

    window.location.href = "/KinoXPProjectFrontend/htmljs/Screenings.html";
}

async function insertScreeningInBackend(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    let roomCapacity;
    console.log("Chosen roomNumber" + plainFormData.roomNumber);

    if(plainFormData.roomNumber === 1) {
        roomCapacity = 400;
    } else {
        roomCapacity = 240;
    }

    console.log("RoomCapacity" + roomCapacity);
    //console.log(toJSONString);
    console.log(selectedMovie);

    const screeningJSON = {
        movieName : selectedMovie.movieName,
        startTime : plainFormData.movieStartDateAndTime,
        endTime : plainFormData.movieEndDateAndTime,
        seatPrice : plainFormData.pricePrSeat,
        ageRestriction : selectedMovie.ageRestriction,
        reservedSeats : 0,
        availableSeats : roomCapacity,
        percentageReserved : 0,

        movie: {
            movieID: selectedMovie.movieID
        },
        room: {
            roomID: plainFormData.roomNumber
        }
    }

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