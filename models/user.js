const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
});


module.exports = User