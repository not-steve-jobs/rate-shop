const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    worth: {
        type: DataTypes.INTEGER
    },
});


module.exports = Product