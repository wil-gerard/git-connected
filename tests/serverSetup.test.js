const createAndSetupServer = require("../server/serverSetup.js");
const axios = require("axios");

describe("serverSetup.js -> createAndSetupServer()", () => {
  const chosenPort = Math.ceil(Math.random() * 10000);
  const serverAndListenObjects = createAndSetupServer(chosenPort);

  //to see which port the instance is actually listening to, we have to look at the connection key which is a string
  //but that string has other unneeded data in it. thankfully the port comes at the end of the string and a colon comes before it
  const connectionKeyArray = serverAndListenObjects.listenObject._connectionKey.split(":");
  const usedPort = connectionKeyArray[connectionKeyArray.length - 1];

  test('the server object is truthy', () => {
    expect(serverAndListenObjects.serverObject).toBeTruthy();
  });
  test('the server object is an object', () => {
    expect(serverAndListenObjects.serverObject).toBeInstanceOf(Object);
  });
  test("the port used is the chosen port", () => {
    expect(usedPort).toBe(chosenPort.toString());
  });
  test("plain/homepage GET request returns a valid 200 response", async () => {
    const response = await axios.get("http://localhost:" + usedPort);
    expect(response.status).toBe(200);
  });
  test ("plain/homepage GET request response is doctype html", async() => { 
    const response = await axios.get("http://localhost:" + usedPort);
    expect(response.data.includes(`<!doctype html>`)).toBe(true);
    serverAndListenObjects.listenObject.close();
  });
});


