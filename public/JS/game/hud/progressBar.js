/**
 * set the value of the social bar
 * @param {Number} amount value/100 
 */
function updateSocial(amount) {
    let bar = document.getElementsByClassName("progress-container")[0];
    let gradSocial = amount;
    let color;
    if (gradSocial >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradSocial >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradSocial + 1
    bar.style.borderColor = color;
    bar.style.background = "linear-gradient(90deg, rgba(0, 0, 0, 0.356) 0%," + color + " " + gradSocial + "%, rgba(0,0,0,.356) " + gradFondu + "%, rgba(0,0,0,.326) 100%)";
    let pro = document.getElementsByClassName("progress")[0]
    pro.style.marginLeft = "calc(" + gradSocial + "% - 15px)"
    pro.style.backgroundColor = color;
    let txt = document.getElementsByClassName("textPro")[0]
    txt.innerHTML = "Social (" + gradSocial + "%)"
}

/**
 * set the value of the economic bar
 * @param {Number} amount value/100 
 */
function updateEconomic(amount) {
    let bar = document.getElementsByClassName("progress-container")[1];
    let gradEcono = amount;
    let color;
    if (gradEcono >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcono >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradEcono + 1
    bar.style.borderColor = color;
    bar.style.background = "linear-gradient(90deg, rgba(0, 0, 0, 0.356) 0%," + color + " " + gradEcono + "%, rgba(0,0,0,.356) " + gradFondu + "%, rgba(0,0,0,.326) 100%)";
    let pro = document.getElementsByClassName("progress")[1]
    pro.style.marginLeft = "calc(" + gradEcono + "% - 15px)"
    pro.style.backgroundColor = color;
    let txt = document.getElementsByClassName("textPro")[1]
    txt.innerHTML = "Economique (" + gradEcono + "%)"
}

/**
 * set the value of the ecologic bar
 * @param {Number} amount value/100 
 */
function updateEcologic(amount) {
    let bar = document.getElementsByClassName("progress-container")[2];
    let gradEcolo = amount;
    let color;
    if (gradEcolo >= 66) {
        color = "rgba(0,255,0,1)"
    } else if (gradEcolo >= 33) {
        color = 'rgba(255,165,0,1)';
    } else {
        color = 'rgba(255,0,0,1)'
    }

    let gradFondu = gradEcolo + 1
    bar.style.borderColor = color;
    bar.style.background = "linear-gradient(90deg, rgba(0, 0, 0, 0.356) 0%," + color + " " + gradEcolo + "%, rgba(0,0,0,.356) " + gradFondu + "%, rgba(0,0,0,.326) 100%)";
    let pro = document.getElementsByClassName("progress")[2]
    pro.style.marginLeft = "calc(" + gradEcolo + "% - 15px)"
    pro.style.backgroundColor = color;
    let txt = document.getElementsByClassName("textPro")[2]
    txt.innerHTML = "Ecologique (" + gradEcolo + "%)"
}

export default {
    updateEcologic,
    updateSocial,
    updateEconomic
};