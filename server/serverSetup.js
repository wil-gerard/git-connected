const express = require("express");
const rootRouter = require("./routes");

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
  const listenObject = server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
  return { server, listenObject };
}

module.exports = createAndSetupServer;
