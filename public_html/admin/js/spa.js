// Clase de la spa
var SPA = function () {
    var evt = document.createEvent("Event");

    evt.initEvent("show", true, false);

    // Función que inicializa los eventos y el history
    SPA.prototype.init = function (gestorCtrl) {
        pages = document.getElementsByClassName('page');
        var navs = document.getElementsByClassName('nav-link');


        var context = this;
        history.replaceState({}, 'page-productos', '#page-productos');

        /* Al cambiar el hash si el hash empieza con page
        entonces se ejecuta la función poppin */
        window.onhashchange = function (e) {
            if (location.hash.split('-')[0] == "#page") {
                /* si el hash es #page-gestor entonces
                se obtienen nuevamente las encuestas */
                context.poppin(evt);
                if (this.location.hash != "#page-productos") {
                    ctrlOrder.getOrders();
                    $("#linkProducts").removeClass("activeLink");
                    $("#linkPedidos").addClass("activeLink");
                } else {
                    ctrlProduct.getProducts();
                    $("#linkPedidos").removeClass("activeLink");
                    $("#linkProducts").addClass("activeLink");
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