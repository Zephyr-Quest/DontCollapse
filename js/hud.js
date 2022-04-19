/* ---------------------------------- modal --------------------------------- */
const modal = document.querySelector('.modal');
const openModal = document.querySelector('#shop-button');
const closeModal = document.querySelector('.close');

const shopSpan = Array.from(document.querySelectorAll('#switch_shop span'));
const shopElem = Array.from(document.querySelectorAll('.shop_elem'));

const closeFunction = function () {
    modal.setAttribute('closing', "");
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('closing');
        modal.close();
    }, {
        once: true
    })
    updateShop(shopSpan[0]);
    shopSpan.forEach(elem => {
        elem.removeEventListener('click', (span) => {
            updateShop(span);
        });
    });
}

openModal.addEventListener('click', () => {
    modal.showModal();

    shopSpan.forEach(elem => {
        elem.addEventListener('click', (span) => {
            updateShop(span.target);
            span.target.style.display = "block";
            span.target.toggleAttribute = "selected";
        });
    });
})

closeModal.addEventListener('click', () => {
    closeFunction();
})

// When the user clicks anywhere outside of the modal, close it
modal.addEventListener('click', e => {
    if (e.target.nodeName === "DIALOG") {
        closeFunction();
    }
});



window.addEventListener('keydown', e => {
    if ((e.key === "Escape" || e.key === "Esc") && modal.hasAttribute('open')) {
        closeFunction();
    }
});
