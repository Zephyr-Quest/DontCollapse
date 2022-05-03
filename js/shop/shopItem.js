const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function initListeners(arg1, arg2) {
    for (const current of leftPage) {
        current.addEventListener('click', itemClicked);
    }
    for (const current of rightPage) {
        current.addEventListener('click', itemClicked);
    }
}

function removeListeners(arg1, arg2) {
    for (const current of leftPage) {
        current.removeEventListener('click', itemClicked);
    }
    for (const current of rightPage) {
        current.removeEventListener('click', itemClicked);
    }
}

function itemClicked(e){
    console.log(e.target)
}


export default {
    initListeners,
    removeListeners,
}