let id = 200;
let stat = true;
const update = () => {
    if (stat) id += 1;
    else id -= 1;

    if (id > 370 || id < 10) stat = !stat;
    let bar = document.getElementsByClassName("progress")[0];
    bar.style.width = id+"px";
    
    setTimeout(update, 15);
}
update();


//!----------------------------------

const modal = document.getElementById('modal1');

const shopSpan = Array.from(document.querySelectorAll('#switch_shop span'));
const shopElem = Array.from(document.querySelectorAll('.shop_elem'));

document.getElementById('shop-button').addEventListener('click', (e) => {
    modal.style.display = 'flex';

    shopSpan.forEach(elem => {
        elem.addEventListener('click', (span) => {
            updateShop(span.target);
            span.target.style.display = "block";
            span.target.toggleAttribute = "selected";
        });
    });

});
// When the user clicks on <span> (x), close the modal
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    closeModal();
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', event => {
    if (event.target == modal) {
        closeModal();
    }
});
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
    }
});

const closeModal = function () {
    modal.style.display = 'none';
    updateShop(shopSpan[0]);
    shopSpan.forEach(elem => {
        elem.removeEventListener('click', (span) => {
            updateShop(span);
        });
    });
};

const updateShop = function (span) {
    let id = shopSpan.indexOf(span);
    shopSpan.forEach(e => {
        e.classList.remove('selected');
    });
    shopElem.forEach(e => {
        e.style.display = 'none';
    });
    shopSpan[id].classList.add('selected');
    shopElem[id].style.display = 'block';
};