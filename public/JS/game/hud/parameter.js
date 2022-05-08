const modal = document.getElementById('confirm-disconnect');
const oui = document.getElementsByClassName('oui-button')[1];
const non = document.getElementsByClassName('non-button')[1];

const openParameter = document.querySelector('.fa-gears');
const paramContent = document.querySelectorAll('.param-content');
const divParam = document.querySelector('#parameters')

const musicUp = document.querySelector('.fa-volume-high');
const musicOff = document.querySelector('.fa-volume-off');
const effectUp = document.querySelector('.fa-bell');
const effectOff = document.querySelector('.fa-bell-slash');
const signOut = document.querySelector('.fa-right-from-bracket');

let sound = true;
let effect = true;

function showParameter() {
    divParam.addEventListener('mouseleave', closeParam, {
        once: true
    });
    paramContent.forEach(elem => {
        elem.addEventListener('click', fctParam)
        elem.setAttribute('open', "");
    })

    signOut.style.display = "block";

    if (sound) {
        musicUp.style.display = "block";
    } else {
        musicOff.style.display = "block";
    }

    if (effect) {
        effectUp.style.display = "block";
    } else {
        effectOff.style.display = "block";
    }
}

function fctParam(e) {
    switch (e.target.classList[2]) {
        case 'fa-bell':
            cutEffect();
            break;
        case 'fa-bell-slash':
            putEffect();
            break;
        case 'fa-volume-high':
            cutMusic();
            break;
        case 'fa-volume-off':
            putMusic();
            break;
        case 'fa-right-from-bracket':
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
        element.removeAttribute('open');

        // element.setAttribute('closing', "");
        // element.addEventListener('animationend', () => {
        //     element.removeAttribute('closing');
        // });
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
    console.log('coupe musique');
    sound = false;
    changeMusic();
}

function putMusic() {
    console.log('met musique');
    sound = true;
    changeMusic();
}

function changeMusic() {
    if (sound) {
        musicUp.style.display = "block";
        musicOff.style.display = "none";
    } else {
        musicUp.style.display = "none";
        musicOff.style.display = "block";
    }
}

function cutEffect() {
    console.log('coupe effet');
    effect = false;
    changeEffect();
}

function putEffect() {
    console.log('met effet');
    effect = true;
    changeEffect();
}

function changeEffect() {
    if (effect) {
        effectUp.style.display = "block";
        effectOff.style.display = "none";
    } else {
        effectUp.style.display = "none";
        effectOff.style.display = "block";
    }
}


export default {
    initListener,
}