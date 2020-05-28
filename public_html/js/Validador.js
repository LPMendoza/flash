"use strict";

var Validador = function () {

   Validador.prototype.imprimirError = function (DOM, mensaje) {
      DOM.innerText = mensaje;
   }

   //Función para validar solo números
   Validador.prototype.validarNumeros = function(fieldNumber) {
      var regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
      var mensaje = fieldNumber.parentElement.getElementsByClassName('error')[0];
      if (fieldNumber.value < 0 || fieldNumber.value == 0 || regex.test(fieldNumber.value) == false) {
         fieldNumber.focus();
         fieldNumber.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "ingresa solo números";
         return false;
      }
      else {
         mensaje.classList.add('d-none');
         fieldNumber.classList.remove('invalid');
         return true;
      }
   }
   //Función para validar solo números
   Validador.prototype.validarTelefono = function (fieldNumber) {
      var regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
      var mensaje = fieldNumber.parentElement.getElementsByClassName('error')[0];
      if (fieldNumber.value < 0 || fieldNumber.value == 0 || regex.test(fieldNumber.value) == false || fieldNumber.value.length != 10) {
         fieldNumber.focus();
         fieldNumber.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "ingresa un número válido";
         return false;
      } else {
         mensaje.classList.add('d-none');
         fieldNumber.classList.remove('invalid');
         return true;
      }
   }
   //Función para validar el título
   Validador.prototype.validarTitulo = function (titulo) {
      var tituloValue = titulo.value;
      tituloValue = tituloValue.trim();
      var mensaje = titulo.parentElement.getElementsByClassName('error')[0];
      if (tituloValue.length < 2 || tituloValue.indexOf("<") >= 0 || tituloValue.indexOf(">") >= 0) {
         titulo.focus();
         titulo.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "Nombre de la encuesta inválido";
         return false;
      }
      mensaje.classList.add('d-none');
      titulo.classList.remove('invalid');
      return true;
   }
   //Función para validar el título
   Validador.prototype.validarTexto = function (texto) {
      var mensaje = texto.parentElement.getElementsByClassName('error')[0];
      if (texto.value == "") {
         texto.focus();
         texto.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "inválido";
         return false;
      }
      mensaje.classList.add('d-none');
      return true;
   }

   //Función para validar la causa de rechazo
   Validador.prototype.validarCausaRechazo = function (texto) {
      var mensaje = texto.parentElement.getElementsByClassName('error')[0];

      if (texto.value.length < 20) {
         texto.focus();
         texto.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "La causa de rechazo debe tener al menos 20 caracteres";
         return false;
      }
      mensaje.classList.add('d-none');
      texto.classList.remove('invalid');
      return true;
   }


   Validador.prototype.validarCKEditor = function(textarea, data) {
      var mensaje = textarea.parentElement.getElementsByClassName('error')[0];

      if(data.getData() == ""){
         data.focus();
         mensaje.classList.remove('d-none');
         mensaje.textContent = "Enunciado inválido o vacío";
         return false;
      }
      mensaje.classList.add('d-none');
      return true;
   }

   //Función para validar la descripción
   Validador.prototype.validarDescripcion = function (textarea, descripcion) {
      var mensaje = titulo.parentElement.getElementsByClassName('error')[0];

      if(descripcion.val() == '<p></p>'){
         $('html, body').animate({
            scrollTop: $(textarea).offset()
         }, 300);
         textarea.invalid = true;
         mensaje.classList.remove('d-none');
         mensaje.textContent = "Descripción inválida";
         return false;
      }
      mensaje.classList.add('d-none');
      textarea.classList.remove('invalid');
      return true;
   }

   //función para validar los permisos
   Validador.prototype.validarPermisos = function (permisos, parent) {
      var mensaje = parent.parentElement.parentElement.getElementsByClassName('error')[0];
      console.log(mensaje)
      if (permisos == 0) {
         parent.focus();
         mensaje.classList.remove('d-none');
         mensaje.textContent = "Seleccionar por lo menos una opción.";
         return false;
      }
      mensaje.classList.add('d-none');
      return true;
   }
   //Validación de solo fechas 
   Validador.prototype.validarSoloFecha = function(fecha) {
      var expressionDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
      if (expressionDate.test(fecha.value) == false) {
         fecha.invalid = true;

         var mensaje = fecha.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "El formato debe ser dd/mm/yyyy";
         fecha.parentElement.getElementsByClassName("fas")[0].classList.add("text-danger")
         return false;
      } else {
         fecha.classList.remove('invalid');
         var mensaje = fecha.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.add('d-none');
         fecha.parentElement.getElementsByClassName("fas")[0].classList.remove("text-danger")
         return true;
      }
   }
   //Validación de las fechas con hora
   Validador.prototype.validarFechas = function (fechaInicio, fechaFin, horaInicio, horaFin) {
      
      var expressionDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
      var expressionTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      var horaInicioStr = horaInicio.value + ":00";
      var horaFinStr = horaFin.value + ":00";

      if(expressionDate.test(fechaInicio.value) == false) {
         fechaInicio.invalid = true;

         var mensaje = fechaInicio.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "El formato debe ser dd/mm/yyyy";
         fechaInicio.parentElement.getElementsByClassName("fas")[0].classList.add("text-danger")
         return false;
      }
      else {
         fechaInicio.classList.remove('invalid');
         var mensaje = fechaInicio.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.add('d-none');
         fechaInicio.parentElement.getElementsByClassName("fas")[0].classList.remove("text-danger")
      }
      if(expressionDate.test(fechaFin.value) == false) {
         fechaFin.invalid = true;

         var mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "El formato debe ser dd/mm/yyyy";
         fechaFin.parentElement.getElementsByClassName("fas")[0].classList.add("text-danger")

         return false;
      }
      else {
         fechaFin.classList.remove('invalid');
         var mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.add('d-none');
         fechaFin.parentElement.getElementsByClassName("fas")[0].classList.remove("text-danger")
      }
      if(expressionTime.test(horaInicio.value) == false) {
         horaInicio.invalid = true;

         var mensaje = horaInicio.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "El formato debe ser hh:mm";
         horaInicio.parentElement.getElementsByClassName("fas")[1].classList.add("text-danger")
         return false;
      }
      else {
         horaInicio.classList.remove('invalid');
         var mensaje = horaInicio.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.add('d-none');
         horaInicio.parentElement.getElementsByClassName("fas")[1].classList.remove("text-danger")
      }
      if(expressionTime.test(horaFin.value) == false) {
         horaFin.invalid = true;

         var mensaje = horaFin.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "El formato debe ser hh:mm";
         horaFin.parentElement.getElementsByClassName("fas")[1].classList.add("text-danger")
         return false;
      }
      else {
         horaFin.classList.remove('invalid');
         var mensaje = horaFin.parentElement.getElementsByClassName('error')[0];
         horaFin.parentElement.getElementsByClassName("fas")[1].classList.remove("text-danger")
         mensaje.classList.add('d-none');
      }
      var fechaActual = new Date();
      var fechaInicioDate = new Date(fechaInicio.value.split('/')[2], (parseInt(fechaInicio.value.split('/')[1]) - 1), fechaInicio.value.split('/')[0]);
      var fechaFinDate = new Date(fechaFin.value.split('/')[2], (parseInt(fechaFin.value.split('/')[1]) - 1), fechaFin.value.split('/')[0]);

      fechaInicioDate.setHours(horaInicio.value.split(':')[0], horaInicio.value.split(':')[1],"00");
      fechaFinDate.setHours(horaFin.value.split(':')[0], horaFin.value.split(':')[1], "00");
      
      if ((fechaFinDate.getTime() <= fechaInicioDate.getTime())) {
         fechaFin.invalid = true;
         horaFin.invalid = true;

         var mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
         mensaje.classList.remove('d-none');
         mensaje.textContent = "La fecha final debe ser que la inicial.";
         fechaFin.parentElement.getElementsByClassName("fas")[0].classList.add("text-danger")
         horaFin.parentElement.getElementsByClassName("fas")[1].classList.add("text-danger")
         return false;
      } else {
         fechaFin.classList.remove('invalid');
         horaFin.classList.remove('invalid');
         var mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
         fechaFin.parentElement.getElementsByClassName("fas")[0].classList.remove("text-danger")
         horaFin.parentElement.getElementsByClassName("fas")[1].classList.remove("text-danger")
         mensaje.classList.add('d-none');
      }

      fechaInicio.classList.remove('invalid');
      fechaFin.classList.remove('invalid');

      fechaFin.classList.remove('invalid');
      horaFin.classList.remove('invalid');

      var mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
      mensaje.classList.add('d-none');

      mensaje = fechaFin.parentElement.getElementsByClassName('error')[0];
      mensaje.classList.add('d-none');

      return true;

   }

   Validador.prototype.validarFormulario = function (titulo, permisos, parent, fechaInicio, fechaFin, horaInicio, horaFin) {
      if (this.validarTitulo(titulo) && this.validarPermisos(permisos, parent) && this.validarFechas(fechaInicio, fechaFin, horaInicio, horaFin)) {
         return true;
      } else {
         return false;
      }
   }
}