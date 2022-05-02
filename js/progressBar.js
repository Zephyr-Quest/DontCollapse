/* const sizeSocial = 100;
const sizeEcono = 200;
const sizeEcolo = 200; */

//import config from "./config.js";

function updateSocial(amount) {
    let bar = document.getElementsByClassName("progress-container")[0];
    let gradSocial = amount;
    let color;
    if (gradSocial >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradSocial >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradSocial + 6
    bar.style.background = "linear-gradient(90deg," + color + " " + gradSocial + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    bar.innerText = "Social " + gradSocial + "%";
}



function updateEconomic(amount) {
    let bar = document.getElementsByClassName("progress-container")[1];
    let gradEcono = amount;
    let color;
    if (gradEcono >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcono >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradEcono + 6
    bar.style.background = "linear-gradient(90deg," + color + " " + gradEcono + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    bar.innerText = "Economic     " + gradEcono + "%";
}

function updateEcologic(amount) {
    let bar = document.getElementsByClassName("progress-container")[2];
    let gradEcolo = amount;
    let color;
    if (gradEcolo >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcolo >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradEcolo + 6
    bar.style.background = "linear-gradient(90deg," + color + " " + gradEcolo + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    bar.innerText = "Ecologic     " + gradEcolo + "%";
}

export default {
    updateEcologic,
    updateSocial,
    updateEconomic
};