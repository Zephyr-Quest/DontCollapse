let maxSize = 100;
let sizeSocial = 100;
let sizeEcono = 200;
let sizeEcolo = 200;

let gradSocials = 1
let gradEcono = 99
let gradEcolo = 1
//import config from "./config.js";

function updateSocial(add) {
    let bar = document.getElementsByClassName("progress-container")[0];
    let color;
    if (gradSocials >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradSocials >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    if (add == true) {
        gradSocials += 1
        let gradFondu = gradSocials + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradSocials + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    } else {
        gradSocials -= 1
        let gradFondu = gradSocials + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradSocials + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    }
    let text = bar.innerText;
    bar.innerText= "Social     " + gradSocials + "%";
}



function updateEconomic(add) {
    let bar = document.getElementsByClassName("progress-container")[1];

    let color;
    if (gradEcono >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcono >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    if (add == true) {
        gradEcono += 1
        let gradFondu = gradEcono + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradEcono + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    } else {
        gradEcono -= 1
        let gradFondu = gradEcono + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradEcono + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    }
    let text = bar.innerText;
    bar.innerText= "Economic     " + gradEcono + "%";

}

function updateEcologic(add) {
    let bar = document.getElementsByClassName("progress-container")[2];

    let color;
    if (gradEcolo >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcolo >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    if (add == true) {
        gradEcolo += 1
        let gradFondu = gradEcolo + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradEcolo + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    } else {
        gradEcolo -= 1
        let gradFondu = gradEcolo + 6
        bar.style.background = "linear-gradient(90deg," + color + " " + gradEcolo + "%, rgba(0,0,0,1) " + gradFondu + "%, rgba(0,0,0,1) 100%)";
    }
    let text = bar.innerText;
    bar.innerText= "Ecologic     " + gradEcolo + "%";

}

export default {
    updateEcologic,
    updateSocial,
    updateEconomic
};