const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Rate = sequelize.define("rate", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    iso: {
        type: DataTypes.STRING
    },
    rateVal: {
        type: DataTypes.STRING
    }
});
module.exports = Rate