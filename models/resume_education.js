const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');
const Resume = require('./resume');

class ResumeEducation extends Model { }
ResumeEducation.init({
    // attributes
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
    major: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },    
    isunified: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    endtime: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
}, {
    sequelize,
    modelName: 'resume_education',
    timestamps: false
});

//ResumeEducation.belongsTo(Resume);

module.exports = ResumeEducation;