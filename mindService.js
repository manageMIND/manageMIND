//import axios from './node_modules/axios/dist/axios';


export async function loginUser(credentials) {
    /*
    return axios.post("http://localhost:5000/users", credentials)
    .then(data => {return data})
    .catch(err => console.log(err));
    */

   let response = await fetch("http://localhost:5000/users", { 
        method: 'GET', 
        mode: 'cors',
        headers: {
        "Content-Type": "text/plain",
        'Authorization': credentials.username + " " + credentials.password,
        } 
    })
   
    return response;
}

export async function createUser(details) {
    let response = await fetch("http://localhost:5000/users", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
    
    return response;
}

export async function getRecommendations(tasks) {
    let response = await fetch("http://localhost:5000/predict", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks)
    })

    return response;
}

