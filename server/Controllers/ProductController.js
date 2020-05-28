
const Product = require("../models/Product")
let errorMessages = require("../conf");


class ProductController {
    constructor() {
    }

    getProducts(req, res) {
        Product.findAll().then(products => {
            res.json(JSON.parse(JSON.stringify(products)))
        })
        .catch(function(err) {
            res.json(JSON.parse(JSON.stringify({
                error: true,
                message: errorMessages.errPrd
            })))
        })

    }

    addProduct(product, res) {
        Product.create(product).then(product => {
            res.json(JSON.parse(JSON.stringify({error: false, message: "Producto creado"})))
        }).catch(function (err) {
            res.json(JSON.parse(JSON.stringify({
                error: true,
                message: errorMessages.errCrtPrd
            })))
        })

    }

    deleteProduct(req, res) {
        Product.destroy({
            where: {
                idProduct: req.params.id
            }
        }).then(() => {
            res.json(JSON.parse(JSON.stringify({
                error: false,
                message: "Producto Eliminado"
            })))
        }).catch(function (err) {
            res.json(JSON.parse(JSON.stringify({
                error: true,
                message: errorMessages.errDltPRd
            })))
        })
    }

    updateProduct(product, res) {
        let idProduct = product.idProduct

        Product.update(
            {
                "productName": product.productName,
                "productDesc": product.productDesc,
                "categorie": product.categorie,
                "buyPrice": product.buyPrice,
                "salePrice": product.salePrice,
                "stock": product.stock,
                "imageUrl": product.imageUrl
            }, 
            {
            where: {
                idProduct: idProduct
            }
        }).then(() => {
            res.json(JSON.parse(JSON.stringify({
                error: false,
                message: "Producto Actualizado"
            })))
        }).catch(function (err) {
            res.json(JSON.parse(JSON.stringify({
                error: true,
                message: errorMessages.errUpdtPrd
            })))
        })
    }
}

module.exports = ProductController

