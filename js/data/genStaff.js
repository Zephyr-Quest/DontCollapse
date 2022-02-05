function newGeneration() {
    const fs = require('fs')
    const data = require("./staff.json")

    values = [];
    for (let i = 0; i < data.length; i++) {
        let pers = new Object();

        pers.id = i;
        pers.name = data[i].name;
        pers.age = Math.floor(Math.random() * (60 - 18) + 18);
        pers.rendement = Math.floor(Math.random() * 10 + 1);
        pers.hired = 0;

        values.push(pers)
    }
    values = JSON.stringify(values)

    
    fs.writeFile('./staff.json', values, (err) => {
        if (err) {
            throw err;
        }
        console.log('JSON data is saved.');
    })
}
newGeneration()

