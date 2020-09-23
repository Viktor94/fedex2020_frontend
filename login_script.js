'use strict';

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const pwd = document.getElementById('password').value;
  const login = { username: username, password: pwd };
  fetch(URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  })
  .then((resp) => resp.json())
  .then((data) => {
    window.localStorage.setItem('jwt', data.token)
    console.log(data.token)
  });
  form.reset();
  window.location = URL + 'index.html';
  });