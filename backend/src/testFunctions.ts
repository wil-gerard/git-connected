import { IUser } from './interface'

function testSum(a: number, b: number) {
    if (!a) throw Error("a cannot be empty")
    return a + b
}

function testMult(a: number, b: number) {
    return a * b
}

function returnProperties(obj: any, properties: any) {
    return properties.reduce((accumulator : any, property: any) => {
        accumulator[property] = obj[property]
        return accumulator
    }, {});
}

module.exports = {testSum, testMult, returnProperties}