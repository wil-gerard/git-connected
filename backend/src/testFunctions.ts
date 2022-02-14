import { IUser } from './interface'

function testSum(a:any, b:any) {
    if (!a) throw Error("a cannot be empty")
    return a + b
}

function testMult(a:any, b:any) {
    return a * b
}

function testNoUserTokens(){

}

module.exports = {testSum, testMult, testNoUserTokens}