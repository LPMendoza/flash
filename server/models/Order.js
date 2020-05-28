const sequelize = require("../Database/connection")
const Sequelize = require("sequelize")
const Model = Sequelize.Model;

class Order extends Model {}
Order.init({
    // attributes
    idOrder: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false

    },
    street: {
        type: Sequelize.STRING,
        allowNull: false

    },
    number: {
        type: Sequelize.STRING,
        allowNull: false

    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'orders'
    // options
});

module.exports = Order