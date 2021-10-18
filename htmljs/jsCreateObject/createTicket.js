let selectedScreening;
let selectedMovieForTicket;

const screeningSelector = document.getElementById("screeningdropdown");
const movieSelector = document.getElementById("moviedropdown");

loadDatabaseData();

async function loadDatabaseData() {
    await fetchMoviesFromDB(); //Henter film fra database
    await fetchScreeningsFromDB(); //Henter screenings fra dataase
    createMovieDropDown(); //laver dropdown af movies
}


function createMovieDropDown() {
    moviesMap.forEach(movie => {
        const optionTags = document.createElement("option");
        optionTags.textContent = movie.movieName;
        optionTags.value = movie.movieID;
        movieSelector.appendChild(optionTags)

        })
        movieSelector.addEventListener("change", (event) => {
            const optionIndex = movieSelector.selectedIndex;
            selectedMovieForTicket = moviesMap.get(optionIndex);
            createScreeningDropdown();
    })
}

function createScreeningDropdown() {
    screeningsMap.forEach(screening => {
        const optionTag = document.createElement("option");
        //hvis movienavnet på den valgte film er lig det som på screeningen fylder vi det ind i dropdown
        // så vi kun vælger datoer og tider med denne film
        if(screening.movieName === selectedMovieForTicket.movieName) {
            optionTag.textContent = screening.startTime;
            optionTag.value = screening.screeningID;
            screeningSelector.appendChild(optionTag);
        }
    })
    screeningSelector.addEventListener("change", (event) => {
        const optionIndex = screeningSelector.selectedIndex;
        const selectedOption = screeningSelector.options[optionIndex];
        selectedScreening = screeningsMap.get(parseInt(selectedOption.value));
    })
}

/*
 * Håndtering af formen
 */

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

    const ticketJSON = {
        seatRow: plainFormData.seatRow,
        seatNumber: plainFormData.seatNumber,
        screening: {
            screeningID: selectedScreening.screeningID
        }
    }

    const JSONObjectToJSONString = JSON.stringify(ticketJSON);

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

