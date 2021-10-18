const movieSelector = document.getElementById("moviedropdownEdit");

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

loadAsyncData();