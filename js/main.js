let id = 200;
let stat = true;
const update = () => {
    if (stat) id += 1;
    else id -= 1;

    if (id > 370 || id < 10) stat = !stat;
    $('.progress').width(id);

    setTimeout(update, 15);
}
update();





// Get the modal
var modal = $('#modal1');

// When the user clicks on the button, open the modal
$('#shop').on('click', function () {
    modal.css('display', 'flex');
});

// When the user clicks on <span> (x), close the modal
$('.close').on('click', function () {
    modal.css('display', 'none');
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == document.getElementById("modal1")) {
        modal.css('display', 'none');
    }
}