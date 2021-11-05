const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`) });

const express = require('express');
const rootRouter = require('./routes');
// Initialize the MongoDB Connection
require('./db');

const { NODE_ENV, PORT } = process.env;

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use('/api', rootRouter);

if (NODE_ENV !== 'development') {
  server.get((req,res) =>{
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

  server.use(express.static('build'));
} else {
  console.log(`Running in development mode. Disabling get from build`);
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
