const money = document.getElementById('money-amount');

let moneyy = 0;

function setMoney(amount) {
    moneyy = amount;
    updateHUD();
}

function getMoney() {
    return moneyy;
}

function updateHUD() {
    money.innerText = moneyy

}
export default {
    setMoney,
    getMoney,
    updateHUD,
}