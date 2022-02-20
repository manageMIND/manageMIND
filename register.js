import { createUser } from './mindService.js';

let registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let username = e.target[1].value;
    let password = e.target[2].value;
    
    createUser({ name, username, password })
    .then((data) => {
        let result = data.text();

        result.then((r) => {
            console.log(r);
            if (r === "success") {
                window.location.replace('../views/login.html');
            }
        })
        console.log("here");
        console.log(result);

    })
})