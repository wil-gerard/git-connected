const express = require("express");
const rootRouter = require("./routes");

function createAndSetupServer(port) {
  const server = express();
  setServerUses(server);
  setRequestResponse(server);
  const serverAndListenInstance = startListening(server, port);
  return serverAndListenInstance;
}

function setServerUses(server) {
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use("/api", rootRouter);
  server.use(express.static("build"));
}

function setRequestResponse(server) {
    server.get("/", (request, response) => {
      const fileToSend = path.join(__dirname, "/build/index.html");
      response.sendFile(path.join(fileToSend));
    });
}

function startListening(server, port) {
  const listenInstance = server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
  return { server,listenInstance };
}

module.exports = createAndSetupServer;
