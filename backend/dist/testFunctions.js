"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnProperties = exports.testMult = exports.testSum = void 0;
function testSum(a, b) {
    if (!a)
        throw Error('a cannot be empty');
    return a + b;
}
exports.testSum = testSum;
function testMult(a, b) {
    return a * b;
}
exports.testMult = testMult;
function returnProperties(obj, properties) {
    var result = {};
    properties.map(function (property) {
        if (obj.hasOwnProperty(property)) {
            result[property] = obj[property];
        }
    });
    return result;
}
exports.returnProperties = returnProperties;
//# sourceMappingURL=testFunctions.js.map