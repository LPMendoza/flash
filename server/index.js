const express = require("express");
const app = express();
const cors = require("cors");

const ProductController = require("./Controllers/ProductController")
const OrderController = require("./Controllers/OrderController")
const productCtrl = new ProductController()
const orderCtrl = new OrderController()

app.use(cors());
app.use(express.static("../public_html"));
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get("/", function (req, res) {});

app.get("/products/", (req, res) => {
    productCtrl.getProducts(req, res)
})

app.post("/products/create/", (req, res) => {
    productCtrl.addProduct((req.body), res)
})

app.post("/products/delete/:id", (req, res) => {
    productCtrl.deleteProduct(req, res)
})

app.post("/products/update/", (req, res) => {
    productCtrl.updateProduct(req.body, res)
})

app.get("/order/", (req, res) => {
    orderCtrl.getOrders(req, res)
})

app.post("/order/create/", (req, res) => {
    orderCtrl.addOrder(req.body, res)
})

app.listen(app.get('port'), () => console.log("Server is run on "));
