// Clase de la spa
var SPA = function () {
    var evt = document.createEvent("Event");

    evt.initEvent("show", true, false);

    // Función que inicializa los eventos y el history
    SPA.prototype.init = function (gestorCtrl) {
        pages = document.getElementsByClassName('page');
        var navs = document.getElementsByClassName('nav-link');


        var context = this;
        history.replaceState({}, 'page-products', '#page-products');

        /* Al cambiar el hash si el hash empieza con page
        entonces se ejecuta la función poppin */
        window.onhashchange = function (e) {
            if (location.hash.split('-')[0] == "#page") {
                /* si el hash es #page-gestor entonces
                se obtienen nuevamente las encuestas */
                context.poppin(evt);
                if(this.location.hash != "#page-cart") {
                    $("#linkCart").removeClass("activeLink");
                }
                else {
                    $("#linkCart").addClass("activeLink");
                }
                if (this.location.hash != "#page-products") {
                    $("#linkProducts").removeClass("activeLink");
                } else {
                    $("#linkProducts").addClass("activeLink");
                    if (isInPhone == false) {
                        $("#topMenu").removeClass("bg-dark");
                        $("#topMenu").removeClass("shadow");
                        $("#topMenu").removeClass("sticky-top");
                        $("#topMenu").addClass("fixed-top");
                        $("#topMenu").addClass("bg-transparent");
                    }
                }
                if (this.location.hash == "#page-send" || this.location.hash == "#page-cart") {
                    if(this.ctrlProducts.cart.getProducts().length == 0) {
                        window.location.hash = "#page-products";
                    }
                }
            }
        };
    }

    SPA.prototype.pageShown = function (ev) {
        document.body.scrollTop = 0;
    }

    /* muesta el div con el id igual al hash que se cambio
    y oculta el que estaba activo */
    SPA.prototype.poppin = function (ev) {
        var hash = location.hash.replace('#', '');
        document.querySelector('.activated').classList.remove('d-block');
        document.querySelector('.activated').classList.add('d-none');
        document.querySelector('.activated').classList.remove('fadeIn');
        document.querySelector('.activated').classList.remove('activated');

        document.getElementById(hash).classList.remove('d-none');
        document.getElementById(hash).classList.add('d-block');
        document.getElementById(hash).classList.add('fadeIn');
        document.getElementById(hash).classList.add('activated');

        $('html, body').animate({
            scrollTop: 0
        }, 300);

        //document.getElementById(hash).dispatchEvent(ev);
    }

}