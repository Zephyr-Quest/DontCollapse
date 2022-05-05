import ProgressBar from './progressBar.js';
import Modal from './shopModal.js';
import Chat from './chatModal.js'



/* ------------------------------ progress bar ------------------------------ */
let id = 1;
let stat = true;

const update = () => {
    if (stat) id += 5;
    else id -= 5;
    if (id > 100 || id < 0) stat = !stat;

    ProgressBar.updateSocial(id)
    ProgressBar.updateEconomic(id)
    ProgressBar.updateEcologic(id)
    setTimeout(update, 400);
}
//update();


/* --------------------------------- Modals --------------------------------- */

Modal.initListener();
Chat.initListener();

