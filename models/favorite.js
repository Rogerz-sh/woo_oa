const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class Favorite extends Model { }
Favorite.init({
    // attributes
    userId: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    parentId: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    sort: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 99
    },
    depth: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'favorite',
    timestamps: false
});

//Favorite.belongsTo(Resume);

module.exports = Favorite;