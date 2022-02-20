//api = equire('mindService.js');
import { loginUser } from './mindService.js';

let loginForm = document.getElementById("login-form");
let register = document.getElementById("register");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    
    loginUser({ username, password })
    .then((data) => {
        if (data !== null) {
            let result = data.json();
            result.then((d) => {
                console.log(d, "dd");
                if (Array.isArray(d)) {
                    sessionStorage.setItem("tasks", d);
                    sessionStorage.setItem("user", username);

                    window.location.replace('../index.html');
                }
            })
        }
    })
})

register.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.replace('./register.html')
})
