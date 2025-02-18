'use strict';

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const pwd = document.getElementById('password').value;
    const login = { username: username, password: pwd };
    fetch(URL + '/user-management/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then((resp) => {
        if (resp.status === 200) {
            window.location = 'login.html';
            form.reset();
        }else {
            throw Error(resp.statusText)
        }
    })
    .catch(function(error) {
        console.log(error);
    });
})