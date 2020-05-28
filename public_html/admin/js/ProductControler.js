class ProductControler {
    constructor() {
        this.products = [];
        this.dataTablePrd = null;
    }

    getProducts() {
        var context = this;
        $.get({url: API + "/products/", cache: false})
            .done((responseText) => {
                context.products = responseText;
                context.showProducts();
            })
            .fail(function(responseText) {
                swal({
                    title: "No se pudo conectar con el servidor, intete más tarde",
                    icon: "error",
                    buttons: "Aceptar"
                });
            })
    }

    showProducts() {
        if(this.dataTablePrd != null) {
            this.clearDataTable(this.dataTablePrd);
        }

        var tbody = document.getElementById("tbProducts");
        this.products.map((el, index) => {
            tbody.innerHTML += `\
            <tr>\
                <td>${el.idProduct}</td>\
                <td>${el.productName}</td>\
                <td>${el.categorie}</td>\
                <td>${el.buyPrice}</td>\
                <td>${el.salePrice}</td>\
                <td>${el.stock}</td>\
                <td><button class="btn shadow-sm bg-warning text-white btn-table btnEdit"id="btnEdit-${el.idProduct}-${index}"><span class="fas fa-pen"></span></button></td>\
                <td><button class="btn shadow-sm bg-danger text-white btn-table btnDelete" id="btnDelete-${el.idProduct}-${index}"><span class="fas fa-times"></span></button></td>\
            </tr>\
            `;

        });

        this.dataTablePrd = $("#tblProducts").DataTable({
            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ productos",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "No hay productos",
                "sInfo": "Mostrando productos del _START_ al _END_ de un total de _TOTAL_",
                "sInfoEmpty": "Mostrando encuestas del 0 al 0 de un total de 0 encuestas",
                "sInfoFiltered": "(filtrado de un total de _MAX_ productos)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            },
            autoWidth: false,
            autoWidth: false,
            columns: 
            [
                {
                    
                },
                {
                    width: "50%"


                }, {


                },
                {


                },
                {


                },
                {


                }, 
                {

                    orderable: false
                }, 
                {

                    orderable: false

                },
            ]
        });
        var filtersDT = document.getElementById("tblProducts_wrapper").firstElementChild;
        var paginationDT = document.getElementById("tblProducts_paginate").parentElement.parentElement;
        document.getElementById("tblProducts_length").classList.add("text-left");
        document.getElementById("tblProducts_length").classList.add("pl-0");

        document.getElementById("tblProducts_filter").classList.add("text-left");
        document.getElementById("tblProducts_filter").classList.add("text-lg-right");
        document.getElementById("tblProducts_filter").classList.add("pl-0");
        document.getElementById("tblProducts_filter").parentElement.classList.add("col-lg-6");
        document.getElementById("contCtrlsDTProducts").appendChild(filtersDT);
        document.getElementById("contPagDTProducts").appendChild(paginationDT);

        this.setFuncionTabla();
    }

    setFuncionTabla(){
        var context = this;
        $(".btnEdit").on("click", function (e) {
            var idProduct = this.id.split("-")[1];
            var index = this.id.split("-")[2];

            var product = context.products[index];

            $("#idProduct").val(product.idProduct);
            $("#productName").val(product.productName);
            $("#categorie").val(product.categorie);
            $("#productDesc").val(product.productDesc);
            $("#buyPrice").val(product.buyPrice);
            $("#salePrice").val(product.salePrice);
            $("#stock").val(product.stock);
            $("#imageUrl").val(product.imageUrl);

            mode = 1;

            $('html, body').animate({
                scrollTop: 0
            }, 300);

            $("#productName").focus();
            
            e.stopImmediatePropagation();
        });
        $(".btnDelete").on("click", function (e) {
            var idProduct = this.id.split("-")[1];
            
            swal({
                title: "¿Está seguro de eliminar el product?",
                body: "Toda la información respecto a el ya no estará disponible",
                icon: "warning",
                buttons: ["Cancelar", "Aceptar"]
            })
            .then(function(acept) {
                if(acept) {
                    context.deleteProduct(idProduct);
                }
            })

            e.stopImmediatePropagation();
        });
    }

    addProduct(product, mode){
        var contexto = this;
        if(mode == 0) {
            $.post(API + "/products/create/", product)
                .done(function (responseText) {
                    contexto.getProducts();
                    clearFormProduct();

                    toast("Producto agregado");
                })
                .fail(function(responseText) {
                    swal({
                        title: "No se pudo conectar con el servidor, intete más tarde",
                        icon: "error",
                        buttons: "Aceptar"
                    });
                })
        }
        else {
            $.post(API + "/products/update/", product)
                .done(function (responseText) {
                    contexto.getProducts();
                    clearFormProduct();
                    mode = 0;
                    toast("Cambios guardados");
                })
                .fail(function (responseText) {
                    swal({
                        title: "No se pudo conectar con el servidor, intete más tarde",
                        icon: "error",
                        buttons: "Aceptar"
                    });
                })
        }

    }

    deleteProduct(idProduct) {
        var context = this;
        $.post(API + "/products/delete/" + idProduct)
            .done(function (responseText) {
                context.getProducts();
                toast("Producto eliminado");

            })
            .fail(function (responseText) {
                swal({
                    title: "No se pudo conectar con el servidor, intete más tarde",
                    icon: "error",
                    buttons: "Aceptar"
                });

            })
    }


    clearDataTable(dataTable) {
        dataTable.clear();
        dataTable.destroy();
        document.getElementById("contCtrlsDTProducts").innerHTML = "";
        document.getElementById("contPagDTProducts").innerHTML = "";
    }
}