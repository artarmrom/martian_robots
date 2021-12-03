const fs = require('fs');
const checkInput = require('./utils/checkInput')
const store = require('./utils/storeData')
const steps_functions = require('./utils/steps')

function main(){
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' [FILENAME]');
        process.exit(1);
    }
    let filename = process.argv[2];
    fs.readFile(filename, 'utf8', async function(err, input) {
        if (err) throw err;
        let arrayInput = input.split('\n');
        let maximumCoordinatesArray = (arrayInput.shift().split(' ')).map(Number);
        let maximumCoordinates=checkInput.checkPosition(maximumCoordinatesArray);
        if(maximumCoordinates.length!==2 || maximumCoordinatesArray.length!==maximumCoordinates.length) {
            console.log('Usage: bad maximum coordinates format: [X-COORDINATE] [Y-COORDINATE]');
            process.exit(1);
        }
        let copyArrayInput = [...arrayInput];
        if(arrayInput.length%2!==0){
            console.log('Usage: bad orders format: \n[X-COORDINATE] [Y-COORDINATE] [ORIENTATION]\n[RLF][RLF]');
            process.exit(1);
        }
        let lostSteps = await store.getLostSteps();
        let initialLostSteps = [...lostSteps];
        for(let i=0; i<arrayInput.length/2;i++) {
            let positionInput = copyArrayInput.shift().split(' ');
            let orientationInput = positionInput.pop();
            positionInput = positionInput.map(Number);
            let instructionsInput = copyArrayInput.shift().split("");
            checkInput.checkInitialInput(positionInput,orientationInput,instructionsInput);
            let steps = steps_functions.calculateInitialStep(positionInput,orientationInput,maximumCoordinates);
            if(steps)
                steps_functions.makeSteps(steps,instructionsInput,lostSteps,maximumCoordinates);
        }
        await store.saveLostSteps(lostSteps, initialLostSteps)
    });
}

main();