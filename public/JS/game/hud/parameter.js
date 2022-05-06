const openParameter = document.querySelector('.fa-cogs');
const paramContent = document.querySelectorAll('.param-content');
const divParam = document.querySelector('#parameters')

const volumeUp = document.querySelector('.fa-volume-up');
const volumeOff = document.querySelector('.fa-volume-off');
const signOut = document.querySelector('.fa-sign-out');


function showParameter(e){
    divParam.addEventListener('mouseleave', closeParam,{once:true});


    paramContent.forEach(element => {
        if (element.style.display === "none") {
            element.style.display = "block";
          } else {
            element.style.display = "none";
          }
    });
}

function closeParam(){
    paramContent.forEach(element => {
        if (element.style.display === "none") {
            element.style.display = "block";
          } else {
            element.style.display = "none";
          }
    });}

function initListener(){
    openParameter.addEventListener('mouseover', showParameter);
}

export default{
    initListener,
}