const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');
const Resume = require('./resume')
const User = require('./user')

class ResumeRecord extends Model { }
ResumeRecord.init({
    // attributes
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // createdBy: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
}, {
    sequelize,
    modelName: 'resume_record',
    timestamps: true
});

// Group.hasMany(ResumeRecord);
ResumeRecord.belongsTo(Resume);
ResumeRecord.belongsTo(User, {
    // as: 'createdBy',
    foreignKey: 'createdBy'
});

module.exports = ResumeRecord;