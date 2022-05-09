const money = document.getElementById('money-amount');

let moneyy = 0;

/**
 * set the money amount to display
 * @param {Number} amount 
 */
function setMoney(amount) {
    moneyy = amount;
    updateHUD();
}

/**
 * return the money amount
 * @returns {Number} money
 */
function getMoney() {
    return moneyy;
}

/**
 * update the money on screen
 */
function updateHUD() {
    money.innerText = moneyy
}

export default {
    setMoney,
    getMoney,
    updateHUD,
}