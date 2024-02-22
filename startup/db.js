const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  // const db = config.get('db');
  mongoose.connect('mongodb+srv://test:test@cluster0.uzvafwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => winston.info(`Connected to ...`));
}
