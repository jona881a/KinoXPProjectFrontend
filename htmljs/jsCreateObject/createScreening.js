
console.log("createScreening called");

const movieSelector = document.getElementById("moviedropdown");
let movieObject;

async function loadAsyncData() {
    console.log("Start");
    await fetchMoviesFromDB();
    console.log("slut");
    showMoviesMap();
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
            const chosenOption = movieSelector.options[optionIndex];
            movieObject = chosenOption;
            console.log(chosenOption);
            console.log(chosenOption.value);
            console.log(chosenOption.textContent);
        })
    })
}

function createScreeningsData() {

}


loadAsyncData();