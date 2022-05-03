import Description from "./description.js";

const rightRubric = document.querySelectorAll('#supplier div');


function initTitle(){
    
}
function initListener(id){
    for (const current of rightRubric) {
        current.addEventListener('click', printElem(id))
    }
}

function printElem(id){
    console.log(id)
}

export default{
    initTitle,
    initListener
}