const express = require("express");
const rootRouter = require("./routes");

function createAndSetupServer(environment, port) {
  const server = express();
  setServerUses(server, environment);
  setRequestResponse(server, environment);
  const serverAndListenInstance = startListening(server, port);
  return serverAndListenInstance;
}

function setServerUses(server, environment) {
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use("/api", rootRouter);
  if (environment !== "development") {
    server.use(express.static("build"));
  }
}

function setRequestResponse(server, environment) {
  if (environment !== "development") {
    server.get((getRequest, response) => {
      const fileToSend = chooseFileToSendBasedOn(getRequest);
      response.sendFile(path.join(fileToSend));
    });
  } else {
    console.log(`Running in development mode. Disabling get from build`);
  }
}

function buildGetResponseBasedOn(getRequest) {
  console.log(getRequest);
  const fileToSend = path.join(__dirname, "/build/index.html");
  return fileToSend;
}

function startListening(server, port) {
  const listenInstance = server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
  return {
    server: server,
    listenInstance: listenInstance,
  };
}

module.exports = createAndSetupServer;
