const money = document.getElementById('money-amount');

/**
 * set the money amount to display
 * @param {Number} amount 
 */
function setMoney(amount) {
    money.innerText = amount
}

export default {
    setMoney,
}