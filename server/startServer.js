require('dotenv').config();
const createAndSetupServer = require('./serverSetup');

createAndSetupServer(process.env.PORT);