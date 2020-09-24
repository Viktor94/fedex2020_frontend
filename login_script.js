'use strict';

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const pwd = document.getElementById('password').value;
  const login = { username: username, password: pwd };
  fetch(URL + 'user-management/login', {
    method: 'POST',
    headers: {
      'X-Requested-With': '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  })
  .then((resp) => {
    if (!resp.ok) {
      throw Error(resp.statusText)
    }
    return resp.json();
  })
  .then((data) => {
    localStorage.clear();
    window.localStorage.setItem('jwt', data.token)
    console.log(localStorage.getItem('jwt'))
    window.location = 'main.html';
  })
  .catch(function(error) {
    console.log(error);
  });
  form.reset();
});