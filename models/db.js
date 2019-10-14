/* eslint-disable no-console */
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('woo_oa_system', 'oa_admin', 'Giewoo2015', {
    host: '118.31.41.210',
    dialect: 'mysql'
});

module.exports = sequelize;