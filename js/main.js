import ProgressBar from './progressBar.js';
import Modal from './modal.js';
import Shop from './shop.js';







/* ------------------------------ progress bar ------------------------------ */
let id = 1;
let stat = true;

const update = () => {
    if (stat) id += 1;
    else id -= 1;

    if (id > 100 || id < 0) stat = !stat;
    ProgressBar.updateSocial(stat)
    ProgressBar.updateEconomic(!stat)
    ProgressBar.updateEcologic(stat)
    setTimeout(update, 1000);
}
update();

Modal.initModals();
