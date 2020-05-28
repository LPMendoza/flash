const sequelize = require("../Database/connection")
const Sequelize = require("sequelize")
const Model = Sequelize.Model;

class OrderDetail extends Model {}
OrderDetail.init({
    // attributes
    idOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantityCart: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'orderdetail'
    // options
});

module.exports = OrderDetail;