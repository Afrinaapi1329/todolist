const sequelize = require('../config/database');
const Todo = require('./Todo');

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  Todo
};

module.exports = db;
