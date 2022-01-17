const {testSum, testMult} = require('./testFunctions.js')

describe('testSuite', () => {
    test('testAddingTwoNum', () => {
        const result = testSum(2,7)
        expect(result).toEqual(9)
    })
    test('testMult', () => {
        const result = testMult(2,4)
        expect(result).toEqual(8)
        expect(testMult(10,10)).toEqual(100)
    })
})