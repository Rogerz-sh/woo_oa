const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');
const Group = require('./group')

class User extends Model { }
User.init({
    // attributes
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: true
});

// Group.hasMany(User);
User.belongsTo(Group);

module.exports = User;