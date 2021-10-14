
console.log("createScreening called");
let pbGetMovies = document.querySelector(".pbGetMovies");

showMoviesMap();

const movieSelector = document.getElementById("moviedropdown");

async function kurt() {
    console.log("Start");
    await fetchMoviesFromDB();
    console.log("slut");
    showMoviesMap();
    createDropDown();
}

kurt();
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
            console.log(chosenOption.value);
            console.log(chosenOption.textContent);
        })
    })
}