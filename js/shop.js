let selector = 0;

const toggleBtn = document.getElementById("switch_shop");

const machineSpan = document.getElementById("machine_link");
const ressourceSpan = document.getElementById("ressource_link");
const personnelSpan = document.getElementById("personnel_link")

const machineShop = document.getElementById("machine_shop");
const ressourceShop = document.getElementById("resources_shop");
const personnelShop = document.getElementById("personnel_shop");

toggleBtn.addEventListener('click', () => {
    if (selector == 0) {
        machineSpan.classList.toggle("selected");
        ressourceSpan.classList.toggle("selected");

        machineShop.style.display = machineShop.style.display === 'none' ? 'block' : 'none';
        ressourceShop.style.display = ressourceShop.style.display === 'none' ? 'block' : 'none';
        selector++;
    } else if (selector == 1) {
        ressourceSpan.classList.toggle("selected");
        personnelSpan.classList.toggle("selected");

        ressourceShop.style.display = ressourceShop.style.display === 'none' ? 'block' : 'none';
        personnelShop.style.display = personnelShop.style.display === 'none' ? 'block' : 'none';
        selector++;
    } else {
        personnelSpan.classList.toggle("selected");
        machineSpan.classList.toggle("selected");
        
        personnelShop.style.display = personnelShop.style.display === 'none' ? 'block' : 'none';
        machineShop.style.display = machineShop.style.display === 'none' ? 'block' : 'none';
        selector = 0;
    }
});