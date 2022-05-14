import ShopItem from "./shopItem.js";

const rightRubric = document.querySelectorAll('#supplier div');

/**
 * init listeners from id[0] to id[1]
 * @param {object} id 
 */
function initListener(id) {
    closeAllListener(); // delete all listeners
    ShopItem.changeItem(rightRubric[id].classList[0]);
    for (let i = id; i < id + 4; i++) {
        rightRubric[i].addEventListener('click', changeSelection);
    }
}

/**
 * display background of the item selected and display his items
 *   
 * @param {EventTarget} e  if specific "e" became the html id
 * @param {Boolean} specific if  the player wants to open a specific machine
 */
function changeSelection(e, specific = false) {
    rightRubric.forEach(element => {
        if (element.classList.contains("selected")) element.classList.remove("selected");
    });
    if (specific) {
        rightRubric[e].classList.add("selected");
        ShopItem.changeItem(rightRubric[e].classList[0]);

    } else {
        e.target.classList.add("selected");
        ShopItem.changeItem(e.target.classList[0]);
    }
}

/**
 * Display the element clicked with his class
 * @param {Document} classOfTop 
 */
function changeRubric(classOfTop) {
    // hide everything
    rightRubric.forEach(element => {
        if (element.style.display === "flex") {
            element.style.display = "none";
            if (element.classList.contains("selected")) element.classList.remove("selected");
        }
    });

    // select the element to display
    switch (classOfTop) {
        case "top1":
            rightRubric[0].classList.add("selected");
            for (let i = 0; i < 4; i++) {
                rightRubric[i].style.display = "flex";
            }
            initListener(0);
            break;
        case "top2":
            rightRubric[4].classList.add("selected");
                rightRubric[4].style.display = "flex";
            initListener(4);

            break;
        case "top3":
            rightRubric[5].classList.add("selected");
            for (let i = 5; i < 9; i++) {
                rightRubric[i].style.display = "flex";
            }
            initListener(5);

            break;
        case "top4":
            rightRubric[9].classList.add("selected");
            rightRubric[9].style.display = "flex";
            ShopItem.changeItem("occaz");

            break;
        default:
            console.warn("Error while changing the right rubric");
            break;
    }
}

/**
 * remove all listeners
 */
function closeAllListener() {
    ShopItem.closeAllListener();
    for (const current of rightRubric) {
        current.removeEventListener('click', changeSelection)
    }
}

function openSpecificMachine(name, level) {
    const levels = {
        1: 8,
        2: 9,
        3: 10,
        4: 11
    }
    changeSelection(levels[level], true)
}

export default {
    changeRubric,
    closeAllListener,
    openSpecificMachine
}