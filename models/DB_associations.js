const Product= require('./product');
const User=require('./user');
User.hasMany(Product,{
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Product.belongsTo(User,{
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

const DB = {
    User,
    Product,
}

module.exports = DB
