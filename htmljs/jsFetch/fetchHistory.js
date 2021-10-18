const urlHistory = "http://localhost:8080/histories";

const historyMap = new Map();

async function fetchHistoryFromDB(){
    const promise = fetch(urlHistory).then(response => response.json());
    await promise.then(data => {
        data.forEach(history => {
            historyMap.set(history.screeningID, history);
        })
    })
}

function showHistoryMap(){
    for(const historyKey of historyMap.keys()){
        console.log(historyMap.get(historyKey));
    }
}

function getHistory(screeningID){
    return historyMap.get(screeningID);
}

