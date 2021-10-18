let selectedScreening;
let selectedMovie;

const screeningSelector = document.getElementById("screeningdropdown");

loadDatabaseData();

async function loadDatabaseData() {
    await fetchMoviesFromDB(); //Henter film fra database
    await fetchScreeningsFromDB(); //Henter screenings fra dataase
    createMovieDropDown(); //laver dropdown af movies
}


function createMovieDropDown() {
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
            createScreeningDropdown();
        })
    })
}

function createScreeningDropdown() {
    screeningsMap.forEach(screening => {
        console.log(screening);
        const optionTag = document.createElement("option");
        //hvis movienavnet på den valgte film er lig det som på screeningen fylder vi det ind i dropdown
        // så vi kun vælger datoer og tider med denne film
        if(screening.movieName === selectedMovie.movieName) {
            optionTag.textContent = screening.startTime;
            optionTag.value = screening.screeningID;
        }
        selectedScreening.addEventListener("change", (event) => {
            const optionIndex = screeningSelector.selectedIndex;
            selectedScreening = screeningsMap.get(optionIndex);
        })

    })
}

