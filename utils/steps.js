const isEqual = (a, b) => a.map((v, i) => v === b[i]);
const isHigher = (a, b) => a.map((v, i) => v > b[i]);
const isLower = (a, b) => a.map((v, i) => v < b[i]);
const sumPosition = (a, b) => a.map((v, i) => v + b[i]);
const mulPosition = (a, b) => a.map((v, i) => v * b);

const orientation = {
    N: [0,1],
    S: [0,-1],
    E: [1,0],
    W: [-1,0]
}
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

const minimumCoordinates = [0,0]

function calculateInitialStep(positionInput,orientationInput,maximumCoordinates){
    if(isHigher(positionInput, maximumCoordinates).includes(true) || isLower(positionInput, minimumCoordinates).includes(true)){
        console.log('The initial position is LOST');
    }else{
        return {
            actualStep: {
                position: positionInput,
                orientation: orientationInput
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
    }
}

function makeSteps(steps,instructionsInput,lostSteps,maximumCoordinates){
    let lost=false;
    for(let i=0;i<instructionsInput.length && !lost;i++){
        calculateNextPosition(steps, instructionsInput[i]);
        lost = setActualPosition(steps,lostSteps,maximumCoordinates);
    }
    if(!lost)
        console.log(steps.actualStep.position[0]+' '+steps.actualStep.position[1]+' '+steps.actualStep.orientation);
}

function calculateNextPosition(steps, instruction){
    let actualOrientationIndex = orientationOrder.findIndex((e)=> e===steps.actualStep.orientation);
    let orientationIndex = actualOrientationIndex+movement[instruction].orientation;
    if(orientationIndex>orientationOrder.length-1)
        orientationIndex=0;
    else if(orientationIndex<0)
        orientationIndex=orientationOrder.length-1;
    let nextOrientation = orientationOrder[orientationIndex];
    let nextMove = mulPosition(orientation[nextOrientation],movement[instruction].position);
    steps.nextStep.position = sumPosition(nextMove,steps.actualStep.position);
    steps.nextStep.orientation = nextOrientation;
    return steps;
}

function setActualPosition(steps,lostSteps,maximumCoordinates){
    let nextStep = steps.nextStep;
    let isLost = lostSteps.some(function(element) {
        return !isEqual(element.position,nextStep.position).includes(false) && !isEqual(element.maximumCoordinates,maximumCoordinates).includes(false) && element.orientation === nextStep.orientation;
    })
    if(isLost){
        return false;
    }else if(isHigher(nextStep.position, maximumCoordinates).includes(true) || isLower(nextStep.position, minimumCoordinates).includes(true)){
        console.log(steps.actualStep.position[0]+' '+steps.actualStep.position[1]+' '+steps.actualStep.orientation+' LOST');
        lostSteps.push({...steps.nextStep, maximumCoordinates:maximumCoordinates});
        return true;
    }else{
        steps.actualStep={...steps.nextStep};
        return false;
    }
}


module.exports = {
    calculateInitialStep,
    makeSteps,
    calculateNextPosition
};