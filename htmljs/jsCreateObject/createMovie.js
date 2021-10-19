
document.addEventListener("DOMContentLoaded",createFormEvent);

function createFormEvent(){
    const formObject = document.getElementById("assign");
    formObject.addEventListener("submit",handleMovieSubmit);
}

async function handleMovieSubmit(event){
    console.log("start handleMovieSubmit");
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;


    try{
        const formData = new FormData(form);
        await insertMovieInBackend(url,formData);
        console.log("insertMovieInBackend running");

    }catch(error){
        alert(error.message);
        console.log("Error in function handleMovieSubmit "+error.message)
    }
}

async function insertMovieInBackend(url,formData){

    const plainFormData = Object.fromEntries(formData.entries());


    let movieJSON = {

        movieName : plainFormData.movieName,
        duration :plainFormData.duration,
        description : plainFormData.description,
        ageRestriction : plainFormData.ageRestriction,
        actors : plainFormData.actors
    }

    const JSONObjectToJSONString = JSON.stringify(movieJSON);

    console.log(JSONObjectToJSONString);
    console.log("url: "+url);

    const POSTOptions = {
        method: "POST",
        header: {
            "Content-type": "application/json"
        },
        body: JSONObjectToJSONString
    }
    const response = await fetch(url,POSTOptions);
    return response.json();
}





















