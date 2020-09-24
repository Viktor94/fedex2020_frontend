'use strict';

const makeNode = (name) => document.createElement(name);

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const studentsDIV = document.getElementById('students');

const makePost = (data) => {
  let div = makeNode('div');
  let studentNameP = makeNode('p');
  let programsP = makeNode('p');
  studentNameP.innerText = `Student name: ${data.firstName} ${data.lastName}`;
  if (data.programs.length === 0) {
    programsP.innerText = 'No suspicious apps';
  } else {
    data.programs.forEach(e => {
      programsP.innerText = 'Suspicious apps: ' + e;
    });
  };
  if (data.suspicious) {
    let connectedP = makeNode('p');
    connectedP.innerText = 'Student not connected';
    div.appendChild(connectedP);
  }
  div.appendChild(studentNameP);
  div.appendChild(programsP);
  return div;
};

const refreshStudents = () => {
  fetch(URL + 'student-management/students', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      studentsDIV.innerHTML = '';
      if (data.length === 0) {
        studentsDIV.innerText = 'No students'
      };
      let ul = makeNode('ul');
      studentsDIV.appendChild(ul);
      for (let datas of data) {
        let li = makeNode('li');
        li.appendChild(makePost(datas));
        ul.appendChild(li);
        };
      });
}

const refresh = () => {
  refreshStudents();
  setTimeout(refresh, 10000);
}

refresh();