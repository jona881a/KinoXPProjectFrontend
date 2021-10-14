


createMovieSelector();

function createMovieSelector(){
   const movieSelector = document.querySelector(".moviedropdown");
   moviesMap.forEach(movie => {
       const optionTags = document.createElement("option");
       optionTags.textContent = movie.movieName;
       optionTags.value = movie.movieID;
       movieSelector.appendChild(optionTags)

       movieSelector.addEventListener("change",(event) => {
           const optionIndex = movieSelector.selectedIndex;
           const chosenOption = movieSelector.options[optionIndex];


       })
       })
}

