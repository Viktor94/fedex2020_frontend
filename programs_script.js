'use strict';

const makeNode = (name) => document.createElement(name);

const URL = 'https://cors-anywhere.herokuapp.com/https://fedex-backend.herokuapp.com/';
const programsDIV = document.getElementById('programs');

const makePost = (data) => {
  let div = makeNode('div');
  let programNameP = makeNode('p');
  let allowButton = makeNode('button');
  programNameP.innerText = `Program name: ${data.programName}`;
  if (data.isAllowed) {
    allowButton.innerText = 'Allowed'
  } else {
    allowButton.innerText = 'Suspicious'
  }
  div.appendChild(programNameP);
  div.appendChild(allowButton);
  allowButton.addEventListener('click', () => {
    fetch(URL + `/program-management/programs/${data.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    })
    .then(() => refreshPrograms());
  });
  return div;
};

const refreshPrograms = () => {
  fetch(URL + 'program-management/programs', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      programsDIV.innerHTML = '';
      if (data.length === 0) {
        programsDIV.innerText = 'No programs'
      };
      let ul = makeNode('ul');
      programsDIV.appendChild(ul);
      for (let datas of data) {
        let li = makeNode('li');
        li.appendChild(makePost(datas));
        ul.appendChild(li);
        };
      });
}

const refresh = () => {
  refreshPrograms();
  setTimeout(refresh, 60000);
}

refresh();