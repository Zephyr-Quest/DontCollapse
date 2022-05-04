const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');

function initListener(id) {
    closeAllListener();
    for (let i = id[0]; i <= id[1]; i++) {
        leftPage[i].addEventListener('click', buyItem);
        rightPage[i].addEventListener('click', buyItem);
    }
}

function buyItem(e) {
    console.log(e.target.textContent, "acheté");
}

function changeItem(classOfRight) {
    leftPage.forEach(element => {
        if (element.style.display === "block") {
            element.style.display = "none";
        }
    });
    rightPage.forEach(element => {
        if (element.style.display === "block") {
            element.style.display = "none";
        }
    });

    const items = {
        "elec": [0, 1],
        "eau": [2, 3],
        "carton": [4, 5],
        "etain": [6, 7],

        "inge": [8, 9],
        "super": [10, 11],
        "maint": [12, 13],
        "menage": [14, 15],

        "manix": [16, 17],
        "droit": [18, 19],
        "braz": [20, 21],
        "tesla": [22, 23],

        "own": [24, 25],
        "j1": [26, 27],
        "j2": [28, 29],
        "j3": [30, 31]
    };

    let toDisplay = items[classOfRight];

    for (let i = toDisplay[0]; i <= toDisplay[1]; i++) {
        leftPage[i].style.display = "block";
        rightPage[i].style.display = "block";
    }
    initListener(toDisplay);
}

function closeAllListener() {
    for (let i = 0; i < leftPage.length; i++) {
        leftPage[i].removeEventListener('click', buyItem);
        rightPage[i].removeEventListener('click', buyItem);
    }
}
export default {
    changeItem,
    closeAllListener
}