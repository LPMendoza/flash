const sequelize = require("../Database/connection")
const Sequelize = require("sequelize")
const Model = Sequelize.Model;

class Product extends Model {}
Product.init({
    // attributes
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productDesc: {
        type: Sequelize.STRING,
        allowNull: false

    },
    categorie: {
        type: Sequelize.STRING,
        allowNull: false

    },
    buyPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    salePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    stock: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'product'
    // options
});

module.exports = Product