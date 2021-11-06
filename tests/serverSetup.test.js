const createAndSetupServer = require("../server/serverSetup.js");
const axios = require("axios");

describe("serverSetup.js -> createAndSetupServer()", () => {
  const chosenPort = Math.ceil(Math.random() * 10000);
  const serverAndListenInstance = createAndSetupServer("production",chosenPort);
  const connectionKeyArray = serverAndListenInstance.listenInstance._connectionKey.split(":");
  const usedPort = connectionKeyArray[connectionKeyArray.length - 1];
  test('"server" member of return value is truthy', () => {
    expect(serverAndListenInstance.server).toBeTruthy();
  });
  test('"server" member of return value is an object', () => {
    expect(serverAndListenInstance.server).toBeInstanceOf(Object);
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
    serverAndListenInstance.listenInstance.close();
  })
});


