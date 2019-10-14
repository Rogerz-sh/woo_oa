const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('./db');

class Area extends Model { }
Area.init({
    // attributes
    areaname: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'area',
    timestamps: true
});

module.exports = Area;