const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class ResumeWork extends Model { }
ResumeWork.init({
    // attributes
    resumeId: {
        type: Sequelize.NUMBER,
        allowNull: false,
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
    department: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },    
    salary: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    starttime: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    endtime: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
}, {
    sequelize,
    modelName: 'resume_work',
    timestamps: false
});

//ResumeWork.belongsTo(Resume);

module.exports = ResumeWork;