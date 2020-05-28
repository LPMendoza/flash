const Product = require("../models/Product")
Product.sync({
    force: true
})