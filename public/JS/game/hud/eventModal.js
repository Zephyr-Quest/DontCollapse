function displayEvent(event){
    console.log(event.event);
    let div = document.querySelector('#events-modal .param-content');
    let elem = document.createElement('p');
    elem.innerText = event.event;
    div.append(elem);
}

export default{
    displayEvent
}