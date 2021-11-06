const path = require("path");
const { NODE_ENV, PORT } = process.env;
require('dotenv').config({ path: path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`) });
const createAndSetupServer = require('./serverSetup');

const server = createAndSetupServer(NODE_ENV,PORT);