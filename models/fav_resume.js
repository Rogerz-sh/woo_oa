const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class FavResume extends Model { }
FavResume.init({
    // attributes
    userId: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    resumeId: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: ''
    },
}, {
    sequelize,
    modelName: 'fav_resume',
    timestamps: false
});

//FavResume.belongsTo(Resume);

module.exports = FavResume;