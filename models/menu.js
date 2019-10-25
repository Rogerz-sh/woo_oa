const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class Menu extends Model { }
Menu.init({
    // attributes
    menuName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    menuType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'nav' //nav主菜单，side侧边菜单，user用户自定义
    },
    parent: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
    },
    hasChild: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'menu',
    timestamps: true
});

module.exports = Menu;