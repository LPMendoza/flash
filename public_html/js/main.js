var isInPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var scrollTop;
if (isInPhone == true) {
    $("#topMenu").addClass("bg-dark");
    $("#topMenu").addClass("shadow");
    $("#topMenu").removeClass("fixed-top");
    $("#topMenu").addClass("sticky-top");
}
else {
    $("#topMenu").removeClass("bg-dark");
    $("#topMenu").removeClass("shadow");
    $("#topMenu").removeClass("sticky-top");
    $("#topMenu").addClass("fixed-top");
    $("#topMenu").addClass("bg-transparent");
}
window.onscroll = function() {
    if(isInPhone == false && this.location.hash == "#page-products") {

        if ($("#topMenu").offset().top > 56) {
            $("#topMenu").addClass("bg-dark");
            $("#topMenu").addClass("shadow");
        } else {
            $("#topMenu").removeClass("bg-dark");
            $("#topMenu").removeClass("shadow");
            $("#topMenu").removeClass("sticky-top");
            $("#topMenu").addClass("fixed-top");
            $("#topMenu").addClass("bg-transparent");
        }
    }
    
    $("#page-productDetail").css({
        top: $("html, body").scrollTop()
    });
}

var API = "http://192.168.1.70:3000";

var filter = "";

var contProducts = document.getElementById("contProducts");

var ctrlProducts = new ControladorProductos(contProducts);
ctrlProducts.getProducts();

var validador = new Validador();
var lsCtrl = new LSControler();

document.getElementById("txtSearchProducts").oninput = function() {
    ctrlProducts.searchProduct(this.value, filter);
}

document.getElementById("rdAll").onclick = function() {
    if(this.checked) {
        filter = "";
        ctrlProducts.filterProducts(filter);
    }
}

document.getElementById("rdCircuits").onclick = function () {
    if (this.checked) {
        filter = "circuitos";
        ctrlProducts.filterProducts(filter);
    }
}

document.getElementById("rdCables").onclick = function () {
    if (this.checked) {
        filter = "cables";
        ctrlProducts.filterProducts(filter);
    }
}

document.getElementById("slcOrden").onchange = function() {
    if(this.value == 1) {
        ctrlProducts.orderProductsDESC(filter);
    }
    else if (this.value == 0) {
        ctrlProducts.orderProductsASC(filter);
    }
    else {
        swal({
            title: "Tipo de ordenación inválido",
            icon: "error",
            buttons: "Aceptar"
        })
    }
}

document.getElementById("linkCart").onclick = function() {
    $("#topMenu").addClass("bg-dark");
    $("#topMenu").addClass("shadow");
    $("#topMenu").removeClass("fixed-top");
    $("#topMenu").addClass("sticky-top");
    $(".activeLink").removeClass("activeLink");
    $("#linkCart").addClass("activeLink");
    ctrlProducts.showCartProducts(document.getElementById("contCartPrd"));
}
document.getElementById("countCart").onclick = function () {
    $("#topMenu").addClass("bg-dark");
    $("#topMenu").addClass("shadow");
    $("#topMenu").removeClass("fixed-top");
    $("#topMenu").addClass("sticky-top");
    $(".activeLink").removeClass("activeLink");
    $("#linkCart").addClass("activeLink");
    ctrlProducts.showCartProducts(document.getElementById("contCartPrd"));
}

document.getElementById("btnSendInfo").onclick = function() {
    window.location.hash = "#page-send";
}

document.getElementById("btnCloseInfo").onclick = function() {
    $("#page-productDetail").removeClass("slideUp");
}

window.onload = function() {
    var spa = new SPA();
    spa.init();
}

var txtNameSend = document.getElementById("nameSend");
document.getElementById("nameSend").oninput = function() {
    validador.validarTexto(this);
}


var txtSuburbSend = document.getElementById("suburbSend");
document.getElementById("suburbSend").oninput = function () {
    validador.validarTexto(this);
}

var txtStreetSend = document.getElementById("streetSend");
document.getElementById("streetSend").oninput = function (e) {
    validador.validarTexto(this);
}

var txtNumberSend = document.getElementById("numberSend");
document.getElementById("numberSend").oninput = function (e) {
    validador.validarNumeros(this);
}

var txtPhoneSend = document.getElementById("phoneSend");
document.getElementById("phoneSend").oninput = function (e) {
    validador.validarTelefono(this);
}

document.getElementById("btnSendOrder").onclick = function (e) {
    if (validador.validarTexto(txtNameSend) &&
        validador.validarTexto(txtSuburbSend) && validador.validarTexto(txtStreetSend) &&
        validador.validarNumeros(txtNumberSend) &&
        validador.validarTelefono(txtPhoneSend)) {
        ctrlProducts.createOrder(txtNameSend, txtSuburbSend, txtStreetSend, txtNumberSend, txtPhoneSend);
        
    }
}


