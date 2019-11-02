const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class Resume extends Model { }
Resume.init({
    // attributes
    realname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    birthyear: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    province: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    city: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    industry: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    jobclass: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    job: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    experience: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    school: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    degree: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    filepath: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    filename: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    createdBy: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'resume',
    timestamps: true
});

module.exports = Resume;