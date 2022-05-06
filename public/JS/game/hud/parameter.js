const modal = document.getElementById('confirm-disconnect');
const oui = document.getElementsByClassName('oui-button')[1];
const non = document.getElementsByClassName('non-button')[1];


const openParameter = document.querySelector('.fa-gears');
const paramContent = document.querySelectorAll('.param-content');
const divParam = document.querySelector('#parameters')

const musicUp = document.querySelector('.fa-music');
const musicOff = document.querySelector('.fa-music-slash');
const effectUp = document.querySelector('.fa-volume-high');
const effectOff = document.querySelector('.fa-volume-xmark');
const signOut = document.querySelector('.fa-right-from-bracket');

let sound = true;
let effect = true;

function showParameter() {
    //divParam.addEventListener('mouseleave', closeParam, { once: true });

    paramContent.forEach(elem => {
        elem.addEventListener('click', fctParam)
    })

    signOut.style.display = "block";

    if (sound) musicUp.style.display = "block";
    else musicOff.style.display = "block";

    if (effect) effectUp.style.display = "block";
    else effectOff.style.display = "block";
}

function fctParam(e) {
    switch (e.target.classList[2]) {
        case 'fa-music-note':
            putMusic();
            break;
        case 'fa-music-note-slash':
            cutMusic();
            break;
        case 'fa-volume-up':
            putEffect();
            break;
        case 'fa-volume-off':
            cutEffect();
            break;
        case 'fa-sign-out':
            ilveutsedeco();
            break;
        default:
            break;
    }
}

function closeParam() {
    paramContent.forEach(element => {
        element.style.display = "none";
        element.removeEventListener('click', fctParam);
    });
}

function initListener() {
    openParameter.addEventListener('mouseover', showParameter);
}

function ilveutsedeco() {
    console.log('deconnexion');
    modal.showModal();

    oui.addEventListener('click', () => {
        modal.close();
        window.location.href = "/lobby";
    }, {
        once: true
    });

    non.addEventListener('click', () => {
        modal.close();
    }, {
        once: true
    });
}

function cutMusic() {
    console.log('coupe volume');
    sound = false;
    changeMusic();
}

function putMusic() {
    console.log('met volume');
    sound = true;
    changeMusic();
}

function changeMusic() {
    if (sound) {
        musicUp.style.display = "block";
        musicOff.style.display = "none";
    }
    else {
        musicUp.style.display = "none";
        musicOff.style.display = "block";
    }
}

function cutEffect() {
    console.log('coupe volume');
    effect = false;
    changeEffect();
}

function putEffect() {
    console.log('met volume');
    effect = true;
    changeEffect();
}

function changeEffect() {
    if (effect) {
        musicUp.style.display = "block";
        musicOff.style.display = "none";
    }
    else {
        musicUp.style.display = "none";
        musicOff.style.display = "block";
    }
}


export default {
    initListener,
}