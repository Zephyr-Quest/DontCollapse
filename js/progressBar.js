let maxSize = 400;
let sizeSocial = 200;
let sizeEcono = 200;
let sizeEcolo = 200;

//import config from "./config.js";

function updateSocial(add) {
    let bar = document.getElementsByClassName("progress")[0];

    if (add == true) {
        if (maxSize >= sizeSocial) {
            bar.style.width = (sizeSocial++) + "px"
        }
    } else {
        if (sizeSocial >= 0) {
            bar.style.width = (sizeSocial--) + "px"
        }
    }

    if (sizeSocial >= 2 * (maxSize / 3)) {
        bar.style.backgroundColor = "green"
    } else if (sizeSocial >= maxSize / 3) {
        bar.style.backgroundColor = 'orange';
    } else {
        bar.style.backgroundColor = 'red'
    }
}

function updateEconomic(add) {
    let bar = document.getElementsByClassName("progress")[1];

    if (add == true) {
        if (maxSize >= sizeEcono) {
            bar.style.width = (sizeEcono++) + "px"
        }
    } else {
        if (sizeEcono >= 0) {
            bar.style.width = (sizeEcono--) + "px"
        }
    }

    if (sizeEcono >= 2 * (maxSize / 3)) {
        bar.style.backgroundColor = "green"
    } else if (sizeEcono >= maxSize / 3) {
        bar.style.backgroundColor = 'orange';
    } else {
        bar.style.backgroundColor = 'red'
    }
}

function updateEcologic(add) {
    let bar = document.getElementsByClassName("progress")[2];

    if (add == true) {
        if (maxSize >= sizeEcolo) {
            bar.style.width = (sizeEcolo++) + "px"
        }
    } else {
        if (sizeEcolo >= 0) {
            bar.style.width = (sizeEcolo--) + "px"
        }
    }
    if (sizeEcolo >= 2 * (maxSize / 3)) {
        bar.style.backgroundColor = "green"
    } else if (sizeEcolo >= maxSize / 3) {
        bar.style.backgroundColor = 'orange';
    } else {
        bar.style.backgroundColor = 'red'
    }
}

export default {
    updateEcologic,
    updateSocial,
    updateEconomic
};