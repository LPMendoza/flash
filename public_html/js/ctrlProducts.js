class ControladorProductos {

    constructor(contProducts) {
        this.contProducts = contProducts;
        this.domProducts = [];
        this.products = [];
        this.cart = new Cart();
        this.sendPrice = 20;
    }

    getProducts() {
        var context = this;
        $.get({
                url: API + "/products/",
                cache: false
            })
            .done((responseText) => {
                context.products = responseText;
                context.showProducts(context.products);
                context.orderProductsASC(filter);

            })
            .fail(function(res) {
                swal({
                    title: "No se pudo conectar con el servidor, intente más tarde",
                    icon: "error",
                    buttons: "Aceptar"
                });
                context.contProducts.innerHTML = context.showNotProducts("No se encontraron productos <i class=\"far fa-frown-open\"></i>");
            });

    }

    showProducts(products) {
        var context = this;
        this.contProducts.innerHTML = "";
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
                products[i]["quantityCart"] = 0;
                var cardProduct = this.createCardProducto(products[i], i);
                this.contProducts.innerHTML += cardProduct;
                this.domProducts.push(cardProduct);

            }

            $(".btnDetails").on("click", function (e) {
                var indexProduct = this.id.split("-")[1];
                document.getElementById("detailImage").src = context.products[indexProduct].imageUrl;
                document.getElementById("detailName").textContent = context.products[indexProduct].productName;
                document.getElementById("detailDesc").textContent = context.products[indexProduct].productDesc;
                document.getElementById("detailPrice").textContent = "$" + context.products[indexProduct].salePrice;

                $("#page-productDetail").addClass("slideUp");

                $(".btnDetailCart").attr("id", "btnDetailCart-" + indexProduct);

                $(".btnDetailCart").on("click", function (e) {
                    context.cart.addProduct(products[this.id.split("-")[1]], 1);
                    $("#countCart").text(context.cart.getTotalProducts());
                    $("#countCart").removeClass("hideCountCart");

                    var toast = Toastify({
                        text: "Producto agregado al carrito",
                        duration: 2500,
                        gravity: 'bottom',
                        avatar: "./img/correct.png"

                    })
                    toast.showToast();

                    e.stopImmediatePropagation();
                });

                e.stopImmediatePropagation();
            });
            $(".contImage").on("click", function (e) {
                var indexProduct = this.id.split("-")[1];
                document.getElementById("detailImage").src = context.products[indexProduct].imageUrl;
                document.getElementById("detailName").textContent = context.products[indexProduct].productName;
                document.getElementById("detailDesc").textContent = context.products[indexProduct].productDesc;
                document.getElementById("detailPrice").textContent = "$" + context.products[indexProduct].salePrice;

                $("#page-productDetail").addClass("slideUp");

                $(".btnDetailCart").attr("id", "btnDetailCart-" + indexProduct);

                $(".btnDetailCart").on("click", function (e) {
                    context.cart.addProduct(products[this.id.split("-")[1]], 1);
                    $("#countCart").text(context.cart.getTotalProducts());
                    $("#countCart").removeClass("hideCountCart");

                    var toast = Toastify({
                        text: "Producto agregado al carrito",
                        duration: 2500,
                        gravity: 'bottom',
                        avatar: "./img/correct.png"

                    })
                    toast.showToast();

                    e.stopImmediatePropagation();
                });

                e.stopImmediatePropagation();
            });
            $(".btnAddCart").on("click", function (e) {
                context.cart.addProduct(products[parseInt($(this).attr('id').split('-')[1])], 1);
                $("#countCart").text(context.cart.getTotalProducts());
                $("#countCart").removeClass("hideCountCart");

                var toast = Toastify({
                    text: "Producto agregado al carrito",
                    duration: 2500,
                    gravity: 'bottom',
                    avatar: "./img/correct.png"

                })
                toast.showToast();

                e.stopImmediatePropagation();
            });
            AOS.init();
        } else {
            this.contProducts.innerHTML = this.showNotProducts("No se encontraron productos <i class=\"far fa-frown-open\"></i>");
        }


    }

    createCardProducto(product, count) {

        var cardProduct = '\
            <div class="cardProduct col-12 mt-3 mb-3 mt-lg-auto col-lg-auto d-inline-block shadow-sm px-0 rounded" data-aos="fade-up">\
                <div class="col-12 py-5 text-center contImage" id="contImage-' + count + '">\
                    <img class="img-thumbnail" src="' + product.imageUrl + '"\
                        width="200" height="200" >\
                </div>\
                <p class="col-12 text-left nameProduct mb-1" id="nameProduct">' + product.productName + '</p>\
                <p class="col-12 text-right mt-1 mb-3 mb-0 font-weight-bold tagProduct">$' + (product.salePrice) + '</p>\
                <div class="col-12 px-0 mx-0 row contBtnCard">\
                    <button class="btn btn-light col-6 btnDetails" id="btnDetails-' + count + '"> <span class="fas fa-eye mr-2"></span>\
                         Detalles</button>\
                    <button class="btn btn-danger text-white col-6 btnAddCart" id="btnAddCart-' + count + '"><span\
                            class="fas fa-cart-plus mr-2"></span> Carrito</button>\
                </div>\
            </div>\
        ';
        return cardProduct;

    }

    showNotProducts(mensaje) {

        var messageNotProducts = '\
            <div class="messageNotProducts col-12 mt-3 mt-lg-0 d-inline-block px-0 rounded">\
                <h1>' + mensaje + '</h1>\
            </div>\
        ';
        return messageNotProducts;

    }

    showCartProducts(contCartPrd) {
        contCartPrd.innerHTML = "";
        var context = this;
        var cartProducts = this.cart.getProducts();

        for (var i = 0; i < cartProducts.length; i++) {
            var cardProductCart = this.createCardProductoCart(cartProducts[i], i);
            contCartPrd.innerHTML += cardProductCart;
        }
        var subtotal = context.cart.getTotalPay();
        $("#lblSubTotal").text("$" + subtotal);
        $("#lblTotal").text("$" + (subtotal + context.sendPrice));
        $("#lblSubTotalInfo").text("$" + subtotal);
        $("#lblTotalInfo").text("$" + (subtotal + context.sendPrice));

        $("#countCart").text(context.cart.getTotalProducts());
        $("#countCart").removeClass("hideCountCart");

        $(".btnLess").on("click", function (e) {
            var idPrd = $(this).attr("id").split("-")[1];
            var indicePrd = $(this).attr("id").split("-")[2];

            var quantityCartTotal = cartProducts[indicePrd].quantityCart - 1;
            if(quantityCartTotal == 0) {
                if(context.confirmDelete(indicePrd) == false) {
                    quantityCartTotal = 1;
                }
            }
            else {
                var newQuantity = context.cart.modifyQuantity(idPrd, indicePrd, quantityCartTotal);
                $("#lblQuantity-" + idPrd).text("" + newQuantity);
                $("#lblSubtotal-" + idPrd + "-" + indicePrd).text("$" + (newQuantity * cartProducts[indicePrd].salePrice));

                var subtotal = context.cart.getTotalPay();
                $("#lblSubTotal").text("$" + subtotal);
                $("#lblTotal").text("$" + (subtotal + context.sendPrice));
                $("#lblSubTotalInfo").text("$" + subtotal);
                $("#lblTotalInfo").text("$" + (subtotal + context.sendPrice));

                $("#countCart").text(context.cart.getTotalProducts());
                $("#countCart").removeClass("hideCountCart");
            }

            e.stopImmediatePropagation();
        });

        $(".btnPlus").on("click", function (e) {
            var idPrd = $(this).attr("id").split("-")[1];
            var indicePrd = $(this).attr("id").split("-")[2];

            var quantityCartTotal = cartProducts[indicePrd].quantityCart + 1;
            var newQuantity = context.cart.modifyQuantity(idPrd, indicePrd, quantityCartTotal);
            $("#lblQuantity-" + idPrd).text("" + newQuantity);
            $("#lblSubtotal-" + idPrd + "-" + indicePrd).text("$" + (newQuantity * cartProducts[indicePrd].salePrice));

            var subtotal = context.cart.getTotalPay();
            $("#lblSubTotal").text("$" + subtotal);
            $("#lblTotal").text("$" + (subtotal + context.sendPrice));
            $("#lblSubTotalInfo").text("$" + subtotal);
            $("#lblTotalInfo").text("$" + (subtotal + context.sendPrice));

            $("#countCart").text(context.cart.getTotalProducts());
            $("#countCart").removeClass("hideCountCart");

            e.stopImmediatePropagation();
        });

        $(".btnDeletePrd").on("click", function (e) {
            var idPrd = $(this).attr("id").split("-")[1];
            var indicePrd = $(this).attr("id").split("-")[2];

            context.confirmDelete(indicePrd);
            
            e.stopImmediatePropagation();
        });

        $(".contImage").on("click", function (e) {
            var indexProduct = this.id.split("-")[1];
            document.getElementById("detailImage").src = cartProducts[indexProduct].imageUrl;
            document.getElementById("detailName").textContent = cartProducts[indexProduct].productName;
            document.getElementById("detailDesc").textContent = cartProducts[indexProduct].productDesc;
            document.getElementById("detailPrice").textContent = "$" + cartProducts[indexProduct].salePrice;

            $("#page-productDetail").addClass("slideUp");

            e.stopImmediatePropagation();
        });
    }

    confirmDelete(indicePrd) {
        var context = this;
        swal({
                title: "¿Está seguro de eliminar el producto del carrito?",
                icon: "warning",
                buttons: ["Cancelar", "Aceptar"]
            })
            .then(function (accept) {
                if (accept) {
                    context.cart.removeProduct(indicePrd);
                    context.showCartProducts(contCartPrd);
                    return true;
                } 
            });
        return false;
    }
    createCardProductoCart(cartProduct, index) {
        var cardPrdCart = '\
            <div class="cardPrdCart shadow-sm mt-3 col-12 d-inline-block mx-0 pb-4 pt-4 px-0 rounded" id="contCardPrdCart-' + cartProduct.idProduct + '" data-aos="fade-up">\
                <div class="text-center contImage" id="contImage-' + index + '">\
                    <img class="img-thumbnail mx-lg-5" src="' + cartProduct.imageUrl + '" width="200" height="120">\
                </div>\
                <div class="col-lg-3 col-12 my-3 d-lg-inline-block d-block">\
                    <p class="col-auto text-left nameProduct mb-1" id="nameProductCart">' + cartProduct.productName + '</p>\
                    <p class="col-auto d-inline-block text-lg-right font-weight-bold text-left mt-0 mb-0 tagProduct">TOTAL <label class="ml-3 text-danger" id="lblSubtotal-' + cartProduct.idProduct + '-' + index + '"> $' + (cartProduct.salePrice * cartProduct.quantityCart) + '</label></p>\
                </div>\
                <div class="col-lg-3 col-12 d-lg-inline-block d-block">\
                    <div class="contCtrlQuantity col-12 p-0 shadow-sm rounded-pill ">\
                        <button class="btn d-inline-block btnLess" id="btnLess-' + cartProduct.idProduct + '-' + index + '"><span class="fas fa-minus"></span></button>\
                        <label class="txtQuantityPrd m-0 p-0 d-inline-block" id="lblQuantity-' + cartProduct.idProduct + '">' + cartProduct.quantityCart + '</label>\
                        <button class="btn d-inline-block btnPlus" id="btnPlus-' + cartProduct.idProduct + '-' + index + '"><span class="fas fa-plus"></span></button>\
                    </div>\
                </div>\
                <div class="col-lg-1 col-12 mt-lg-0 mt-3">\
                    <button class="btn btnDeletePrd shadow-sm  rounded-pill col-lg-auto col-12" id="btnDelete-' + cartProduct.idProduct + '-' + index + '"><span class="fas fa-times"></span></button>\
                </div>\
            </div>\
        ';
        return cardPrdCart;
    }

    searchProduct(text, filter) {
        var text = text.toLowerCase().trim();
        var productsFound = [];
        if (text != "") {
            if (filter != "") {
                for (var i = 0; i < this.products.length; i++) {
                    if (((this.products[i].productName).toLowerCase().includes(text) == true ||
                            (this.products[i].shortDescription).toLowerCase().includes(text) == true) &&
                        this.products[i].categorie == filter) {
                        productsFound.push(this.products[i]);
                    }
                }
            } else {
                for (var i = 0; i < this.products.length; i++) {
                    if ((this.products[i].productName).toLowerCase().includes(text) == true ||
                        (this.products[i].shortDescription).toLowerCase().includes(text) == true) {
                        productsFound.push(this.products[i]);
                    }
                }

            }

            if (productsFound.length > 0) {
                this.showProducts(productsFound);
            } else {
                this.contProducts.innerHTML = this.showNotProducts("No se encontraron resultados <i class=\"far fa-frown-open\"></i>");
            }
        } else {
            this.showProducts(this.products);
        }
    }

    orderProductsASC(filter) {
        this.products.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice));
        this.filterProducts(filter);
    }

    orderProductsDESC(filter) {
        this.products.sort((a, b) => parseFloat(b.salePrice) - parseFloat(a.salePrice));
        this.filterProducts(filter);
    }

    filterProducts(filter) {
        var productsFound = [];
        if (filter != "") {
            productsFound = this.products.filter((el) => {
                return el.categorie == filter;
            })
            this.showProducts(productsFound);
        } else {
            this.showProducts(this.products);
        }
    }

    createOrder(name, neighborhood, street, number, phone) {
        let context = this;
        if(this.cart.getProducts().length > 0) {
            var totalOrder = this.cart.getTotalPay();
            var jsonOrder = {
                infoOrder: {
                    name: name.value.trim(),
                    neighborhood: neighborhood.value.trim(),
                    street: street.value.trim(),
                    number: number.value.trim(),
                    phone: phone.value.trim(),
                    total: this.cart.getTotalPay() + this.sendPrice,
                },
                products: this.cart.getProducts()
            }

            fetch(API + '/order/create/', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonOrder),
                }).then(async function (res) {
                    let json = await res.json()
                    swal({
                            title: json.message,
                            icon: "success",
                            buttons: "Accept"
                        })
                        .then(function (accept) {
                            window.location.hash = "#page-products";
                        });
                        txtNameSend.value = "";
                        txtSuburbSend.value = "";
                        txtStreetSend.value = "";
                        txtNumberSend.value = "";
                        txtPhoneSend.value = "";
                        context.cart.products = [];
                })
                .catch(function (res) {
                    swal({
                        title: "No se pudo conectar con el servidor, intente más tarde",
                        icon: "error",
                        buttons: "Aceptar"
                    });
                });
        }
        else {
            swal({
                title: "No hay productos en el carrito",
                icon: "error",
                buttons: "Aceptar"
            });
        }
        
    }

}