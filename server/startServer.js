require('dotenv').config();
const createAndSetupServer = require('./serverSetup');

createAndSetupServer(process.env.NODE_ENV,process.env.PORT);