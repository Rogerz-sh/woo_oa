const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class JobType extends Model { }
JobType.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parentid: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'job_type',
    timestamps: false
});

module.exports = JobType;