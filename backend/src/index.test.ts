import e from "express";

import { testSum, testMult, returnProperties } from "./testFunctions";

const testUserObj = {
  discordToken: "462397689447841794",
  gitHubToken: "dzfbvagfdag",
  twitterToken: "213r98uaefds",
  twitterTokenSecret: "134fasdlkj321",
  gitHubConnected: true,
  twitterConnected: true,
  customBio: "Hello! I am new to tech Twitter and looking for followers",
  customLocation: "Des Moines, IA",
  customName: "Ricky Rubio",
};

describe("testTestSuite", () => {
  it("returns the sum of two numbers", () => {
    const result = testSum(2, 7);
    expect(result).toEqual(9);
  });
  it("returns the product of two numbers", () => {
    const result = testMult(2, 4);
    expect(result).toEqual(8);
    expect(testMult(10, 10)).toEqual(100);
  });
});

describe("userTests", () => {
  it("only returns the requested properties", () => {
    const properties = [
      "tags",
      "gitHubConnected",
      "twitterConnected",
      "customBio",
      "customLocation",
      "customName",
    ];

    expect(returnProperties(testUserObj, properties)).toEqual({
      gitHubConnected: true,
      twitterConnected: true,
      customBio: "Hello! I am new to tech Twitter and looking for followers",
      customLocation: "Des Moines, IA",
      customName: "Ricky Rubio",
    });
  });

  it("does not include requested properties that do not exist on the object", () => {
    const properties = [
      "customLastName",
      "customBio",
      "customLocation",
      "customName",
    ];

    const result = returnProperties(testUserObj, properties);

    expect(result).toEqual({
      customBio: "Hello! I am new to tech Twitter and looking for followers",
      customLocation: "Des Moines, IA",
      customName: "Ricky Rubio",
    });

    expect(result).not.toHaveProperty("customLastName");
  });

  it("returns an empty object if an empty array of properties is passed", () => {
    const result = returnProperties(testUserObj, []);

    expect(result).toEqual({});

    expect(result).not.toHaveProperty("customLastName");
  });
});
