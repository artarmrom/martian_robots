const orientationOrder = ['N','E','S','W']
const movement = {
    R: {
        orientation: 1,
        position: 0
    },
    L: {
        orientation: -1,
        position: 0
    },
    F: {
        orientation: 0,
        position: 1
    }
}

const isIncluded = (a, b) => a.every((v, i) => b.includes(v));

function checkPosition(position){
    return position.reduce((acc, val) => {
        if(!Number.isNaN(val)){
            acc.push(val);
        }
        return acc;
    }, []);
}

function checkInitialInput(positionInputArray,orientationInput,movementInput){ //Asegurarse que haya dos
    let positionInput = checkPosition(positionInputArray)
    if(positionInput.length!==2 || positionInputArray.length!==positionInput.length || !orientationOrder.includes(orientationInput)) {
        console.log('Usage: bad position format: [X-COORDINATE] [Y-COORDINATE] [ORIENTATION]');
        process.exit(1);
    }else if(!isIncluded(movementInput,Object.keys(movement))){
        console.log('Usage: bad instructions format: [RLF][RLF]');
        process.exit(1);
    }
}

module.exports = {
    checkPosition,
    checkInitialInput
};