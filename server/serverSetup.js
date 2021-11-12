const express = require("express");
const path = require("path");

function createAndSetupServer(port) {
  const server = express();
  setServerUses(server);
  setRequestResponse(server);
  const serverAndListenObjects = startListening(server, port);
  return serverAndListenObjects;
}

function setServerUses(server) {
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(express.static("build"));
}

function setRequestResponse(server) {
    server.get("*", (request, response) => {
      const fileToSend = path.join(__dirname, "..", "build","index.html");
      response.sendFile(fileToSend);
    });
}

//care: side effects
function startListening(server, port) {
  const listenObject = server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
  return { 
    "serverObject":server, 
    "listenObject":listenObject 
  };
}

module.exports = createAndSetupServer;
