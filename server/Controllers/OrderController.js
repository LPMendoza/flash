const Order = require("../models/Order")
const OrderDetail = require("../models/OrderDetail")
const Product = require("../models/Product")
Order.hasMany(OrderDetail, {
    foreignKey: 'idOrder'
})
OrderDetail.belongsTo(Order, {
    foreignKey: 'idOrder'
})

class OrderController {
    constructor() {

    }

    async addOrder(order, res) {
        await Order.create(JSON.parse(JSON.stringify(order)).infoOrder).then(orderCreated => {
            
            let idOrder = orderCreated.idOrder;

            let products = order.products;

            products.map(async function(el) {
                el["idOrder"] = idOrder;
                el["total"] = el.quantityCart * el.salePrice;
                await OrderDetail.create(el).then(product => {
                });
            });
            res.json(JSON.parse(JSON.stringify({
                error: false,
                message: "Tu orden va en camino"
            })));

        });


    }

    async getOrders(req, res) {
        
        Order.findAll({
            include: [{
                model: OrderDetail,
                required: true
            }]
        }).then(await function (orders) {

            res.json(JSON.parse(JSON.stringify(orders)));

        })  
        
    }
}

module.exports = OrderController