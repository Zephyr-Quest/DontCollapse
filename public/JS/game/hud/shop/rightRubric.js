import ShopItem from "./shopItem.js";

const rightRubric = document.querySelectorAll('#supplier div');

function initListener(id) {
    closeAllListener();
    ShopItem.changeItem(rightRubric[id].classList[0]);
    for (let i = id; i < id + 4; i++) {
            rightRubric[i].addEventListener('click', changeSelection);
        
    }
}

function changeSelection(e) {
    rightRubric.forEach(element => {
        if (element.classList.contains("selected")) element.classList.remove("selected");
    });
    e.target.classList.add("selected");
    ShopItem.changeItem(e.target.classList[0]);
}

function changeRubric(classOfTop) {
    rightRubric.forEach(element => {
        if (element.style.display === "block") {
            element.style.display = "none";
            if (element.classList.contains("selected")) element.classList.remove("selected");
        }
    });

    switch (classOfTop) {
        case "top1":
            rightRubric[0].classList.add("selected");
            for (let i = 0; i < 4; i++) {
                rightRubric[i].style.display = "block";
            }
            initListener(0);
            break;
        case "top2":
            rightRubric[4].classList.add("selected");
            for (let i = 4; i < 8; i++) {
                rightRubric[i].style.display = "block";
            }
            initListener(4);

            break;
        case "top3":
            rightRubric[8].classList.add("selected");
            for (let i = 8; i < 12; i++) {
                rightRubric[i].style.display = "block";
            }
            initListener(8);

            break;
        case "top4":
            rightRubric[12].classList.add("selected");
            rightRubric[12].style.display = "block";
            ShopItem.changeItem("occaz");

            // for (let i = 12; i < 16; i++) {
            //     rightRubric[i].style.display = "block";
            // }
            //initListener(12);

            break;
        default:
            console.warn("Error while changing the right rubric");
            break;
    }
}

function closeAllListener() {
    ShopItem.closeAllListener();
    for (const current of rightRubric) {
        current.removeEventListener('click', changeSelection)
    }
}

export default {
    changeRubric,
    closeAllListener
}