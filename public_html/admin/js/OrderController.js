class OrderController {
    constructor() {
        this.orders = [];
        this.dataTableOrd = null;
    }

    getOrders() {
        var context = this;
        $.get({
                url: API + "/order/",
                cache: false
            })
            .done((responseText) => {
                context.orders = responseText;
                context.showOrders();
            })
            .fail(function (responseText) {
                swal({
                    title: "No se pudo conectar con el servidor, intete más tarde",
                    icon: "error",
                    buttons: "Aceptar"
                });
            })
    }

    showOrders() {
        if(this.dataTableOrd != null) {
            this.clearDataTable(this.dataTableOrd);
            document.getElementById("contCtrlsDTOrders").innerHTML = "";
            document.getElementById("contPagDTOrders").innerHTML = "";
        }
        var tbody = document.getElementById("tbOrders");
        this.orders.map((el, index) => {
            tbody.innerHTML += `\
            <tr>\
                <td>${el.idOrder}</td>\
                <td>${el.total}</td>\
                <td>${el.name}</td>\
                <td>${el.neighborhood}</td>\
                <td>${el.street}</td>\
                <td>${el.number}</td>\
                <td>${el.phone}</td>\
                <td><button class="btn shadow-sm bg-warning text-white btn-table btnView"id="btnView-${el.idOrder}-${index}"><span class="fas fa-eye"></span></button></td>\
                <td><button class="btn shadow-sm bg-danger text-white btn-table btnDelete" id="btnDelete-${el.idOrder}-${index}"><span class="fas fa-times"></span></button></td>\
            </tr>\
            `;

        });

        this.dataTableOrd = $("#tblOrders").DataTable({
            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ pedidos",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "No hay pedidos",
                "sInfo": "Mostrando pedidos del _START_ al _END_ de un total de _TOTAL_",
                "sInfoEmpty": "Mostrando encuestas del 0 al 0 de un total de 0 encuestas",
                "sInfoFiltered": "(filtrado de un total de _MAX_ pedidos)",
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
            columns: [{

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


                }, {


                },
                {

                    orderable: false
                },
                {

                    orderable: false

                },
            ]
        });
        var filtersDT = document.getElementById("tblOrders_wrapper").firstElementChild;
        var paginationDT = document.getElementById("tblOrders_paginate").parentElement.parentElement;
        document.getElementById("tblOrders_length").classList.add("text-left");
        document.getElementById("tblOrders_length").classList.add("pl-0");

        document.getElementById("tblOrders_filter").classList.add("text-left");
        document.getElementById("tblOrders_filter").classList.add("text-lg-right");
        document.getElementById("tblOrders_filter").classList.add("pl-0");
        document.getElementById("tblOrders_filter").parentElement.classList.add("col-lg-6");
        document.getElementById("contCtrlsDTOrders").appendChild(filtersDT);
        document.getElementById("contPagDTOrders").appendChild(paginationDT);

        this.setFuncionTabla();
    }
    setFuncionTabla() {
        var context = this;
        $(".btnView").on("click", function (e) {
            $("#contOrderProducts").empty();

            $("#modalOrderProducts").modal("show");

            var idOrder = this.id.split("-")[1];
            var index = this.id.split("-")[2];
            for(var i = 0; i < context.orders.length; i++) {
                if (context.orders[i].idOrder == idOrder) {
                    var totalPedido = 0;
                    context.orders[i].orderdetails.map(function (prd) {
                        document.getElementById("totalPedido").innerHTML = "Total: <strong>$" + context.orders[i].total + "</strong>";
                        document.getElementById("contOrderProducts").innerHTML += `
                        <tr>
                            <td>${prd.productName}</td>
                            <td>${prd.quantityCart}</td>
                            <td>$${prd.total}</td>
                        </tr>
                    `
                    });
                    break;
                }
            }

            e.stopImmediatePropagation();
        });
        $(".btnDelete").on("click", function (e) {
            var idOrder = this.id.split("-")[1];

            swal({
                    title: "¿Está seguro de eliminar el product?",
                    body: "Toda la información respecto a el ya no estará disponible",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"]
                })
                .then(function (acept) {
                    if (acept) {
                        context.deleteProduct(idProduct);
                    }
                })

            e.stopImmediatePropagation();
        })
    }
    clearDataTable(dataTable) {
        dataTable.clear();
        dataTable.destroy();
    }

}
