let modal = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)

}

const closeModal = function (e) {
    if (modal == null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation)

    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal);
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape"|| e.key ==="Esc"){
        closeModal(e);
    }
})