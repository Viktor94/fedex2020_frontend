'use strict';

const makeNode = (name) => document.createElement(name);

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const studentsDIV = document.getElementById('students');

const makePost = (data) => {
  let div = makeNode('div');
  let studentP = makeNode('p');
  let programsP = makeNode('p');
  studentP.innerText = 'Student name: ' + data.studentName;
  programsP.innerText = 'Suspicious apps: ' + data.appList;
  div.appendChild(studentP);
  div.appendChild(programsP);
  return div;
};

const refreshStudents = () => {
  fetch(URL + 'programs', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      studentsDIV.innerHTML = '';
      if (data.length === 0) {
        studentsDIV.innerText = 'No students with suspicious apps'
      };
      let ul = makeNode('ul');
      studentsDIV.appendChild(ul);
      data.forEach(e => {
        let li = makeNode('li');
        li.innerText = e.id;
        // li.appendChild(makePost(post));
        ul.appendChild(li);
        });
      });
}

const refresh = () => {
  refreshStudents();
  setTimeout(refresh, 5000);
}

refresh();