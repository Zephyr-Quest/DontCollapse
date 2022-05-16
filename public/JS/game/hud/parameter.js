import Modal from './modalManager.js'

const oui = document.getElementById('oui-disconnect');
const non = document.getElementById('non-disconnect');
const modal = new Modal('confirm-disconnect', undefined, 'non-disconnect');


const divParam = document.querySelector('#parameters')
const paramContent = document.querySelectorAll('.param-content');
const openParameter = document.querySelector('.fa-gears');

const musicUp = document.querySelector('.fa-volume-high');
const musicOff = document.querySelector('.fa-volume-off');
const effectUp = document.querySelector('.fa-bell');
const effectOff = document.querySelector('.fa-bell-slash');
const signOut = document.querySelector('.fa-right-from-bracket');
const cloud = document.querySelector('.fa-cloud');
const sun = document.querySelector('.fa-sun');

let sound = true;
let effect = true;
let shadow = true;

/**
 * display parameters
 */
function showParameter() {
    divParam.addEventListener('mouseleave', closeParam, {
        once: true
    });
    paramContent.forEach(elem => {
        elem.addEventListener('click', fctParam)
        elem.setAttribute('open', "");
    })
    openParameter.style.color = "#f5dba6"

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

    if (shadow) {
        cloud.style.display = "block";
    } else {
        sun.style.display = "block";
    }
}

/**
 * select the function to trigger with the item clicked
 * @param {EventTarget} e 
 */
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
        case 'fa-cloud':
            removeShadow();
            break;
        case 'fa-sun':
            putShadow();
            break;
        default:
            break;
    }
}

/**
 * hide parameters
 */
function closeParam() {
    openParameter.style.color = "white";
    paramContent.forEach(element => {
        element.removeAttribute('open');
        if (element.style.display !== "none") {
            element.setAttribute('closing', "");
            element.removeEventListener('click', fctParam);

            element.addEventListener('animationend', () => {
                element.removeAttribute('closing');
                element.style.display = "none";
            }, {
                once: true
            });
        }
    });
}

/**
 * init the listener for the mouse over
 */
function initListener() {
    openParameter.addEventListener('mouseover', showParameter);
}

/**
 * disconnection button clicked
 */
function ilveutsedeco() {
    modal.openModal();

    oui.addEventListener('click', () => {
        modal.closeFunction();
        window.location.href = "/lobby";
    }, {
        once: true
    });

    non.addEventListener('click', () => {
        modal.closeFunction();
    }, {
        once: true
    });
}

/**
 * cut the music sound
 */
function cutMusic() {
    console.log('coupe musique');
    sound = false;
    changeMusic();
}

/**
 * put the music sound
 */
function putMusic() {
    console.log('met musique');
    sound = true;
    changeMusic();
}

/**
 * change the music logo
 */
function changeMusic() {
    if (sound) {
        musicUp.style.display = "block";
        musicOff.style.display = "none";
    } else {
        musicUp.style.display = "none";
        musicOff.style.display = "block";
    }
    if (musicCB) musicCB(sound);
}

/**
 * cut the sound effect
 */
function cutEffect() {
    console.log('coupe effet');
    effect = false;
    changeEffect();
}

/**
 * put the sound effect
 */
function putEffect() {
    console.log('met effet');
    effect = true;
    changeEffect();
}

/**
 * change the effect logo
 */
function changeEffect() {
    if (effect) {
        effectUp.style.display = "block";
        effectOff.style.display = "none";
    } else {
        effectUp.style.display = "none";
        effectOff.style.display = "block";
    }
}

/**
 * remove shadow model 3D
 */
function removeShadow() {
    console.log('enleve ombre');
    shadow = false;
    changeShadow();
}

/**
 * put shadow model 3D
 */
function putShadow() {
    console.log('met ombre');
    shadow = true;
    changeShadow();
}

/**
 * change shadow model 3D
 */
function changeShadow() {
    if (shadow) {
        cloud.style.display = "block";
        sun.style.display = "none";
    } else {
        cloud.style.display = "none";
        sun.style.display = "block";
    }
    if (shadowCB) shadowCB(shadow);
}


let musicCB = null;

/**
 * set the callback to trigger when the player wants to cut music
 * @param {Function} cb 
 */
function setMusicCallBack(cb) {
    musicCB = cb;
}

/**
 * return the state of music
 * @returns {Bool} sound
 */
function isMusicON() {
    return sound;
}

/**
 * return the state of effect
 * @returns {Bool} effect
 */
function isEffectOn() {
    return effect
}

let shadowCB = null;

/**
 * set the callback to trigger when the player wants to cut shadow
 * @param {Function} cb 
 */
function setShadowCallBack(cb) {
    shadowCB = cb;
}

/**
 * return the state of shadow
 * @returns {Bool} shadow
 */
function isShadowOn() {
    return shadow;
}

export default {
    initListener,
    setMusicCallBack,
    isMusicON,
    isEffectOn,
    setShadowCallBack,
    isShadowOn
}