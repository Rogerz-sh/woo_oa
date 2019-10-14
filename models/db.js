/* eslint-disable no-console */
const Sequelize = require('sequelize');
const { db } = require('../oa.config');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql'
});

module.exports = sequelize;