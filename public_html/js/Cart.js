class Cart {
    constructor() {
        this.products = [];
    }

    getProductsLS() {
        var cartLS = JSON.parse(lsCtrl.getItem("cart"));
        if(cartLS != undefined) {
            for(var i = 0; i < cartLS.length; i++) {
                this.addProduct(cartLS[i], cartLS[i].quantityCart);
            }
        }
    }

    addProduct(product, quantity) {
        var productModified = this.products.filter(function (el) {
            return el.idProduct == product.idProduct
        });
        if (productModified[0] != undefined) {

            productModified[0].quantityCart += quantity;

            for (var i = 0; i < this.products.length; i++) {
                if (this.products[i].idProduct == product.idProduct) {
                    this.products.splice(i, 1, productModified[0]);
                    break;
                }
            }
        } else {
            product.quantityCart += 1
            this.products.push(product);
        }
        lsCtrl.setItem("cart", JSON.stringify(this.products));
    }

    getTotalProducts() {
        let totalPrd = 0;
        totalPrd = this.products.reduce(function (acum, current) {
            return acum + current.quantityCart;
        }, 0);
        return totalPrd;
    }

    getProducts() {
        return this.products;
    }

    modifyQuantity(idProductPrd, indicePrd, quantity) {
        if(quantity >= 0) {
            this.products[indicePrd].quantityCart = quantity;
            return this.products[indicePrd].quantityCart;
        }
        else {
            return 0;
        }
    }

    getTotalPay() {
        var totalPay = this.products.reduce(function (acum, current) {
            return acum + (current.salePrice * current.quantityCart);
        }, 0);

        return totalPay;
    }

    removeProduct(indicePrd) {
        this.products[indicePrd].quantityCart = 0;
        this.products.splice(indicePrd, 1);
        if(this.products.length == 0) {
            window.location.hash = "#page-products";
        }
    }

}