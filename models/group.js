const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class Group extends Model { }
Group.init({
    // attributes
    groupname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    areaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('./area'),
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        defaultValue: null
    }
}, {
    sequelize,
    modelName: 'group',
    timestamps: true
});

module.exports = Group;