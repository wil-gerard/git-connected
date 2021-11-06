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
    server.get((req, res) => {
      console.log("Received request, sending", fileToSend);
      const fileToSend = path.join(__dirname, "/build/index.html");
      res.sendFile(path.join(fileToSend));
    });
  } else {
    console.log(`Running in development mode. Disabling get from build`);
  }
}

function startListening(server, port) {
  const listenInstance = server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
  return {
    "server": server,
    "listenInstance": listenInstance,
  };
}

module.exports = createAndSetupServer;
