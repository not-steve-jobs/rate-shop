const Product = require('./product');
const User = require('./user');
const Rate = require('./rate');

//User to Product connect
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

// Product to Rate connect
// Product.hasMany(Rate,{
//     foreignKey: {
//         name: 'rate_id',
//         allowNull: false
//     },
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
//
// Rate.belongsTo(Product,{
//     foreignKey: {
//         name: 'rate_id',
//         allowNull: false
//     },
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

const DB = {
    User,
    Product,
    Rate
}

module.exports = DB
