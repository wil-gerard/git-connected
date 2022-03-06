"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testFunctions_1 = require("./testFunctions");
var testUserObj = {
    discordToken: '462397689447841794',
    gitHubToken: 'dzfbvagfdag',
    twitterToken: '213r98uaefds',
    twitterTokenSecret: '134fasdlkj321',
    gitHubConnected: true,
    twitterConnected: true,
    customBio: 'Hello! I am new to tech Twitter and looking for followers',
    customLocation: 'Des Moines, IA',
    customName: 'Ricky Rubio',
};
describe('testTestSuite', function () {
    it('returns the sum of two numbers', function () {
        var result = (0, testFunctions_1.testSum)(2, 7);
        expect(result).toEqual(9);
    });
    it('returns the product of two numbers', function () {
        var result = (0, testFunctions_1.testMult)(2, 4);
        expect(result).toEqual(8);
        expect((0, testFunctions_1.testMult)(10, 10)).toEqual(100);
    });
});
describe('userTests', function () {
    it('only returns the requested properties', function () {
        var properties = [
            'tags',
            'gitHubConnected',
            'twitterConnected',
            'customBio',
            'customLocation',
            'customName',
        ];
        expect((0, testFunctions_1.returnProperties)(testUserObj, properties)).toEqual({
            gitHubConnected: true,
            twitterConnected: true,
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
        });
    });
    it('does not include requested properties that do not exist on the object', function () {
        var properties = [
            'customLastName',
            'customBio',
            'customLocation',
            'customName',
        ];
        var result = (0, testFunctions_1.returnProperties)(testUserObj, properties);
        expect(result).toEqual({
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
        });
        expect(result).not.toHaveProperty('customLastName');
    });
    it('returns an empty object if an empty array of properties is passed', function () {
        var result = (0, testFunctions_1.returnProperties)(testUserObj, []);
        expect(result).toEqual({});
        expect(result).not.toHaveProperty('customLastName');
    });
});
//# sourceMappingURL=index.test.js.map