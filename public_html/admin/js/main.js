var API = "http://192.168.1.70:3000";
var ctrlProduct = new ProductControler();
ctrlProduct.getProducts();

var ctrlOrder = new OrderController();

var validacion = new Validador();

var mode = 0;
var txtProductName = document.getElementById("productName");
txtProductName.oninput = function(e) {
    validacion.validarTexto(this);
}
var txtCategorie = document.getElementById("categorie");
txtCategorie.oninput = function (e) {
    validacion.validarTexto(this);
}
var txtProductDesc = document.getElementById("productDesc");
txtProductDesc.oninput = function (e) {
    validacion.validarTexto(this);
}
var txtBuyPrice = document.getElementById("buyPrice");
txtBuyPrice.oninput = function (e) {
    validacion.validarNumeros(this);
}
var txtSalePrice = document.getElementById("salePrice");
txtSalePrice.oninput = function (e) {
    validacion.validarNumeros(this);
}
var txtStock = document.getElementById("stock");
txtStock.oninput = function (e) {
    validacion.validarNumeros(this);
}
var txtImageUrl = document.getElementById("imageUrl");
txtImageUrl.oninput = function (e) {
    validacion.validarTexto(this);
}


$("#btnGuardar").on("click", function(e) {

    if(validacion.validarTexto(txtProductName) && 
    validacion.validarTexto(txtCategorie) && validacion.validarTexto(txtProductDesc) &&
    validacion.validarNumeros(txtBuyPrice) && 
    validacion.validarNumeros(txtSalePrice) && validacion.validarNumeros(txtStock) 
    && validacion.validarTexto(txtImageUrl)) {

        var jsonProduct = {
            idProduct: $("#idProduct").val(),
            productName: $("#productName").val(),
            categorie: $("#categorie").val(),
            productDesc: $("#productDesc").val(),
            buyPrice: $("#buyPrice").val(),
            salePrice: $("#salePrice").val(),
            stock: $("#stock").val(),
            imageUrl: $("#imageUrl").val(),
        }

        ctrlProduct.addProduct(jsonProduct, mode);

    }

    e.stopImmediatePropagation();
});

document.getElementById("btnClean").onclick = function() {
    clearFormProduct();
    mode = 0;
}

document.getElementById("btnReloadOrders").onclick = function () {
    ctrlOrder.getOrders();
}

function clearFormProduct() {
    $("#idProduct").val("");
    $("#productName").val("");
    $("#categorie").val("");
    $("#productDesc").val("");
    $("#buyPrice").val("");
    $("#salePrice").val("");
    $("#stock").val("");
    $("#imageUrl").val("");
}

function toast(message) {
    var toast = Toastify({
        text: message,
        duration: 2500,
        gravity: 'bottom',
        avatar: "../img/correct.png"

    })
    toast.showToast();
}

window.onload = function () {
    var spa = new SPA();
    spa.init();
}

/*var socket = io.connect("http://192.168.1.70:8080", {
    'forceNew': true
});

socket.on("post-orders", function(data) {
    console.log(data);
});

socket.emit("get-message", {});*/
