import Description from './description.js'

function getRessources(id) {
    let obj = {};
    switch (id) {
        case 0:
            obj[0] = "Électricité";
            obj[1] = "Eau";
            obj[2] = "Cartons";
            obj[3] = "Étain - Quincaillerie";
            break;
        case 1:
            obj.content = Description.ressources["Électricité"];
            break;
        case 2:
            obj.content = Description.ressources["Eau"];
            break;
        case 3:
            obj.content = Description.ressources["Cartons"];
            break;
        case 4:
            obj.content = Description.ressources["Étain - Quincaillerie"];
            break;
        default:
            console.warn("Error while getting the ressources");
            break;
    }
    return obj
}

function getPersonnel(id) {
    let obj = {};
    switch (id) {
        case 0:
            obj[0] = "Ingénieur";
            obj[1] = "Superviseur";
            obj[2] = "Maintenance";
            obj[3] = "Ménage";
            break;
        case 1:
            obj.content = Description.personnel["Ingénieur"];
            break;
        case 2:
            obj.content = Description.personnel["Superviseur"];
            break;
        case 3:
            obj.content = Description.personnel["Maintenance"];
            break;
        case 4:
            obj.content = Description.personnel["Ménage"];
            break;
        default:
            console.warn("Error while getting the personnel");
            break;
    }
    return obj
}

function getNeuf(id) {
    let obj = {};
    switch (id) {
        case 0:
            obj[0] = "Manix 2"
            obj[1] = "Droit Ô But"
            obj[2] = "Braz'Air'Eau"
            obj[3] = "Teslassemblage"
            break;
        case 1:
            obj.content = Description.neuf["Manix 2"]
            break;
        case 2:
            obj.content = Description.neuf["Droit Ô But"]
            break;
        case 3:
            obj.content = Description.neuf["Braz'Air'Eau"]
            break;
        case 4:
            obj.content = Description.neuf["Teslassemblage"]
            break;
        default:
            console.warn("Error while getting the neuf");
            break;
    }
    return obj;

}

export default {
    getRessources,
    getPersonnel,
    getNeuf
}