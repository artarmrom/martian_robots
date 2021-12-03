const {calculateInitialStep,makeSteps,calculateNextPosition} = require('./steps');

describe('Initial value', () => {

    it('It should be given the object initialize', () => {
        const mockPosition = [0, 0];
        const mockOrientation = 'N'
        const mockMaximumCoordinates = [5, 3]
        const mockResult = {
            actualStep: {
                position: [0, 0],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };

        const orientationResult = calculateInitialStep(mockPosition, mockOrientation, mockMaximumCoordinates);
        expect(orientationResult).toEqual(mockResult);
    });

    it('It should be given inside when starts', () => {
        const mockPosition = [2, 0];
        const mockOrientation = 'N'
        const mockMaximumCoordinates = [1, 1]
        const mockResult = 'The initial position is LOST';
        const consoleSpy = jest.spyOn(console, 'log');

        calculateInitialStep(mockPosition, mockOrientation, mockMaximumCoordinates);
        expect(consoleSpy).toHaveBeenCalledWith(mockResult);
    });
});

describe('Robot actions', () => {

    it('It should turn left', () => {
        const mockSteps = {
            actualStep: {
                position: [0, 0],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockOrientation = 'L'
        const mockResult = {
            actualStep: {
                position: [0,0],
                orientation: 'N'
            },
            nextStep: {
                position: [0, 0],
                orientation: 'W'
            }
        };

        const orientationResult = calculateNextPosition(mockSteps, mockOrientation);
        expect(orientationResult).toEqual(mockResult);
    });

    it('It should turn right', () => {
        const mockSteps = {
            actualStep: {
                position: [0, 0],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockOrientation = 'R'
        const mockResult = {
            actualStep: {
                position: [0,0],
                orientation: 'N'
            },
            nextStep: {
                position: [0, 0],
                orientation: 'E'
            }
        };

        const orientationResult = calculateNextPosition(mockSteps, mockOrientation);
        expect(orientationResult).toEqual(mockResult);
    });

    it('It should go forward', () => {
        const mockSteps = {
            actualStep: {
                position: [0, 0],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockOrientation = 'F'
        const mockResult = {
            actualStep: {
                position: [0,0],
                orientation: 'N'
            },
            nextStep: {
                position: [0, 1],
                orientation: 'N'
            }
        };

        const orientationResult = calculateNextPosition(mockSteps, mockOrientation);
        expect(orientationResult).toEqual(mockResult);
    });
});

describe('Robot functionality',() =>{
    it('It should work', () =>{
        const mockSteps = {
            actualStep: {
                position: [1, 3],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockInstructions = 'RFLF'
        const mockResult = '2 4 N';
        const lostSteps = [];
        const maximumCoordinates = [4,4];
        const consoleSpy = jest.spyOn(console, 'log');
        makeSteps(mockSteps,mockInstructions,lostSteps,maximumCoordinates)
        expect(consoleSpy).toHaveBeenCalledWith(mockResult);
    })

    it('It should be lost', () =>{
        const mockSteps = {
            actualStep: {
                position: [1, 3],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockInstructions = 'FF'
        const mockResult = '1 4 N LOST';
        const lostSteps = [];
        const maximumCoordinates = [4,4];
        const consoleSpy = jest.spyOn(console, 'log');
        makeSteps(mockSteps,mockInstructions,lostSteps,maximumCoordinates)
        expect(consoleSpy).toHaveBeenCalledWith(mockResult);
    })

    it('It should not be lost', () =>{
        const mockSteps = {
            actualStep: {
                position: [1, 3],
                orientation: 'N'
            },
            nextStep: {
                position: [],
                orientation: ''
            }
        };
        const mockInstructions = 'FF'
        const mockResult = '1 4 N';
        const lostSteps = [{
            position: [1,5],
            orientation: 'N'
        }];
        const maximumCoordinates = [4,4];
        const consoleSpy = jest.spyOn(console, 'log');
        makeSteps(mockSteps,mockInstructions,lostSteps,maximumCoordinates)
        expect(consoleSpy).toHaveBeenCalledWith(mockResult);
    })
})
