const { Schema, model, Types } = require('mongoose');

const exampleSchema = new Schema({});

module.exports = model('example', exampleSchema);