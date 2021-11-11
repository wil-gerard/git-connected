const createAndSetupServer = require("../server/serverSetup.js");
const axios = require("axios");

describe("serverSetup.js -> createAndSetupServer()", () => {
  const chosenPort = Math.ceil(Math.random() * 10000);
  const serverAndListenObjects = createAndSetupServer(chosenPort);

  //to see which port is actually being listened to, we have to look at the connection key which is a string
  //but that string has other unneeded data in it. thankfully the port comes at the end of the string and a colon comes before it
  const connectionKeyArray =
    serverAndListenObjects.listenObject._connectionKey.split(":");
  const usedPort = connectionKeyArray[connectionKeyArray.length - 1];

  test("the server object is truthy", () => {
    expect(serverAndListenObjects.serverObject).toBeTruthy();
  });

  test("the server object is an instance of Object", () => {
    expect(serverAndListenObjects.serverObject).toBeInstanceOf(Object);
  });

  test("the listen object is truthy", () => {
    expect(serverAndListenObjects.listenObject).toBeTruthy();
  });

  test("the listen object is typeof object", () => {
    expect(typeof serverAndListenObjects.listenObject).toBe("object");
  });

  test("the port used is the chosen port", () => {
    expect(usedPort).toBe(chosenPort.toString());
  });

  test("plain/homepage GET request returns a valid 200 response", async () => {
    const response = await axios.get("http://localhost:" + usedPort);
    expect(response.status).toBe(200);
  });

  test("random GET request still returns valid 200 response", async () => {
    const response = await axios.get("http://localhost:" + usedPort + "/" + chosenPort.toString() );
    expect(response.status).toBe(200);
  });

  test("random GET request is doctype html", async () => {
    const response = await axios.get("http://localhost:" + usedPort);
    expect(response.data.includes(`<!doctype html>`)).toBe(true);
  });

  test("plain/homepage GET request response is doctype html", async () => {
    const response = await axios.get("http://localhost:" + usedPort);
    expect(response.data.includes(`<!doctype html>`)).toBe(true);
    serverAndListenObjects.listenObject.close();
  });
});
