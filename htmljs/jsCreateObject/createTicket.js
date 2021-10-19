let selectedScreening;
let selectedMovieForTicket;

const screeningSelector = document.getElementById("screeningdropdown");
const movieSelector = document.getElementById("moviedropdown");

loadDatabaseData();

async function loadDatabaseData() {
    await fetchMoviesFromDB(); //Henter film fra database
    await fetchScreeningsFromDB(); //Henter screenings fra dataase
    createMovieDropDown(); //laver dropdown af movies
    setBoundariesInForm();
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

function setBoundariesInForm() {
    const minSeatVal = document.getElementById("seatNumber");
    const maxSeatVal = document.getElementById("seatRow");

    minSeatVal.setAttribute("min","1");
    maxSeatVal.setAttribute("max","20");
}

function addMoreTickets() {
    const seatNumberInput = document.createElement("input");
    const seatRowInput = document.createElement("input");
    const breakTag = document.createElement("br");
    const newInputDiv = document.getElementById("newInputFields");

    seatNumberInput.type = "number";
    seatRowInput.type = "text";
    
    seatNumberInput.id = "seatNumber";
    
    seatNumberInput.placeholder = "Seatnumber";
    seatRowInput.placeholder = "Seatrow";

    newInputDiv.appendChild(breakTag);
    newInputDiv.appendChild(seatNumberInput);
    newInputDiv.appendChild(seatRowInput);
    newInputDiv.appendChild(breakTag);
    /*
}
    function createATags() {
        out("create atags");
        for (const komKey of kommuneMap.keys()) {
            const kom1 = kommuneMap.get(komKey);
            const atag = document.createElement("a");
            atag.setAttribute("href", kom1.kommuneHref);
            atag.innerText = kom1.kommuneNavn;
            komtag.appendChild(atag);
            const brtag = document.createElement("br");
            komtag.appendChild(brtag);
        }

     */
}
const pbCreateMoreTicketInputs = document.getElementById("pbCreateMoreTicketInputs");
pbCreateMoreTicketInputs.addEventListener("click",addMoreTickets);

/*
 * Håndtering af formen
 */

function validateForm() {
    if (confirm("Please make sure you're ticket is correct before making the reservation")) {
        alert("The ticket was purchased");
        document.addEventListener("DOMContentLoaded",createFormEventListener);
        return true;
    } else {
        alert("The ticket was not purchased");
        window.history.back();
        return false;
    }
}

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

