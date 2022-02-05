const machData = require('./data/machine.json');
const ressData = require('./data/ressources.json');
const stafData = require('./data/personnel.json');

let machTab = document.querySelector('#mach_tab');
let ressTab = document.querySelector('#ress_tab');
let stafTab = document.querySelector('#pers_tab');


//! show machines

for (let i = 0; i < machData.length; i++) {
    let tr = document.createElement(
        'tr');  // création d'une nouvelle ligne de tableau
    let td1 = document.createElement('td');  // création d'une colonne
    let td2 = document.createElement('td');  // idem
    tr.appendChild(td1);                     // Ajout de la colonne à la ligne
    tr.appendChild(td2);                     // idem

    machTab.appendChild(tr);  // ajout de la ligne au tableau, dans le tbody
    tr.style.textAlign = 'center';
}

for (let i = 0; i < machData.length; i++) {
    let td = document.querySelectorAll('tbody tr')[i].children[0];
    td.innerHTML = machData[i].type;
    td = document.querySelectorAll('tbody tr')[i].children[1];
    td.innerHTML = machData[i].price;
}

//!  show ressources

for (let i = 0; i < ressData.length; i++) {
    let tr = document.createElement(
        'tr');  // création d'une nouvelle ligne de tableau
    let td1 = document.createElement('td');  // création d'une colonne
    let td2 = document.createElement('td');  // idem
    tr.appendChild(td1);                     // Ajout de la colonne à la ligne
    tr.appendChild(td2);                     // idem

    ressTab.appendChild(tr);  // ajout de la ligne au tableau, dans le tbody
    tr.style.textAlign = 'center';
}

for (let i = 0; i < ressData.length; i++) {
    let td = document.querySelectorAll('tbody tr')[i].children[0];
    td.innerHTML = ressData[i].type;
    td = document.querySelectorAll('tbody tr')[i].children[1];
    td.innerHTML = ressData[i].price;
}

//! show staff

for (let i = 0; i < pers.length; i++) {
    let tr = document.createElement(
        'tr');  // création d'une nouvelle ligne de tableau
    let td1 = document.createElement('td');  // création d'une colonne
    let td2 = document.createElement('td');  // idem
    let td3 = document.createElement('td');  // idem
    tr.appendChild(td1);                     // Ajout de la colonne à la ligne
    tr.appendChild(td2);                     // idem
    tr.appendChild(td3);                     // idem

    stafTab.appendChild(tr);  // ajout de la ligne au tableau, dans le tbody
    tr.style.textAlign = 'center';
}

for (let i = 0; i < pers.length; i++) {
    let td = document.querySelectorAll('tbody tr')[i].children[0];
    td.innerHTML = stafData[i].name;
    td = document.querySelectorAll('tbody tr')[i].children[1];
    td.innerHTML = stafData[i].age;
    td = document.querySelectorAll('tbody tr')[i].children[2];
    td.innerHTML = stafData[i].rendement
}