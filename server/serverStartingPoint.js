const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`) });
const express = require('express');
const rootRouter = require('./routes');
const { NODE_ENV, PORT } = process.env;

function createAndSetupServer(){ 
  const server = express();
  setServerUses(server);
  setRequestResponse(server);
  startListening(server);
  return server;
}

function setServerUses(server, environment){
  environment = environment || NODE_ENV;
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use('/api', rootRouter);  
  if (environment !== 'development'){
    server.use(express.static('build'));
  }
}

function setRequestResponse(server, environment){
  environment = environment || NODE_ENV;
  if (environment !== 'development') {
    server.get((req,res) =>{
      const fileToSend = path.join(__dirname, '/build/index.html');
      console.log('Received request, sending', fileToSend);
      res.sendFile(path.join(fileToSend));
    });
  } else {
    console.log(`Running in development mode. Disabling get from build`);
  }
}

function startListening(server, port){ 
  port = port || PORT
  server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
}

const server = createAndSetupServer();