'use strict';

const makeNode = (name) => document.createElement(name);

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const studentsDIV = document.getElementById('students');

const makePost = (data) => {
  let div = makeNode('div');
  let studentNameP = makeNode('p');
  let programsP = makeNode('p');
  let cpuUsagesP = makeNode('p');
  let memoryUsagesP = makeNode('p');
  let kppmP = makeNode('p');
  let buttonsPressedP = makeNode('p');
  studentNameP.innerText = `Student name: ${data.firstName} ${data.lastName}`;
  programsP.innerText = 'Suspicious programs: ';
  cpuUsagesP.innerText = 'TOP programs by CPU usage:<br />';
  memoryUsagesP.innerText = 'TOP programs by memory usage:<br />';
  kppmP.innerText = `Keys pressed per minute: ${data.kppm}`;
  buttonsPressedP.innerText = `Buttons pressed per minute: ${data.buttonsPressed}`;
  if (data.programs.length === 0) {
    programsP.innerText = 'No suspicious apps';
  } else {
    data.programs.forEach(e => {
      programsP.innerText += ` ${e.programName},`;
    });
  };
  if (data.suspicious) {
    let connectedP = makeNode('p');
    connectedP.innerText = 'Student not connected!';
    div.appendChild(connectedP);
  };
  data.programCpuUsages.forEach(e => {
    cpuUsagesP.innerText += ` ${e.name} - ${e.cpuUsage}%<br />`;
  });
  data.programMemoryUsages.forEach(e => {
    memoryUsagesP.innerText += ` ${e.name} - ${e.memory}MB<br />`;
  });
  div.appendChild(studentNameP);
  div.appendChild(programsP);
  div.appendChild(cpuUsagesP);
  div.appendChild(memoryUsagesP);
  div.appendChild(kppmP);
  div.appendChild(buttonsPressedP);
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
};

const refresh = () => {
  refreshStudents();
  setTimeout(refresh, 120000);
};

refresh();