const createAndSetupServer = require("../server/serverSetup.js");

describe("serverSetup.js -> createAndSetupServer()", () => {
    const chosenPort = Math.ceil(Math.random()*10000);
    const serverAndListenInstance = createAndSetupServer('production',chosenPort);
    const connectionKeyArray = serverAndListenInstance.listenInstance._connectionKey.split(":")
    const usedPort = connectionKeyArray[connectionKeyArray.length-1];
    test('"server" member of return value is truthy', () => { 
        expect(serverAndListenInstance.server).toBeTruthy();
    });
    test('"server" member of return value is an object', () => { 
        expect(serverAndListenInstance.server).toBeInstanceOf(Object);
    })
    test('the port used is the chosen port', () => { 
        expect(usedPort).toBe( chosenPort.toString() );
    })
    serverAndListenInstance.listenInstance.close();
});
