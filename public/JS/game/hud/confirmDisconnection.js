
function openConfirm() {
    modal.showModal();

    oui.addEventListener('click', () => {
        modal.close();
        window.location.href = "/lobby";
    }, {
        once: true
    });

    non.addEventListener('click', () => {
        modal.close();
    }, {
        once: true
    });
}
export default {
    openConfirm
}