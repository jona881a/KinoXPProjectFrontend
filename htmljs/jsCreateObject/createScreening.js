showMoviesMap();

console.log("createScreening called");

const movieSelector = document.getElementById("moviedropdown");

moviesMap.forEach(movie => {
    console.log(movie);
    const optionTags = document.createElement("option");
    optionTags.textContent = movie.movieName;
    optionTags.value = movie.movieID;
    movieSelector.appendChild(optionTags)
    console.log(optionTags);

    movieSelector.addEventListener("change",(event) => {
        const optionIndex = movieSelector.selectedIndex;
        const chosenOption = movieSelector.options[optionIndex];
    })
})

