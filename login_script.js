'use strict';

const URL = 'http://localhost:8080/';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const pwd = document.getElementById('password').value;
  const login = { username: username, pwd: pwd };
  fetch(URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login)
  });
  form.reset();
  // window.location = URL + 'index.html';
  });
