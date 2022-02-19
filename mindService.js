const axios = require('axios');

const userInfo = loginUser({ username: "foobar", password: "12345" })
.then((res) => {
    console.log(res);
})

export function loginUser(credentials) {
    return axios.post("http://localhost:4321/users/login", credentials)
    .then(data => {return data})
    .catch(err => console.log(err));
}



