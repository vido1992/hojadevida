$(document).ready(function () {

  // Función que carga una sección
  function cargarSeccion(seccion) {
    $("#contenido").html(
      '<div class="text-center py-5"><div class="spinner-border" role="status"></div></div>'
    );

    $("#contenido").load("contenido/" + seccion + ".html", function (response, status) {
      if (status === "error") {
        $("#contenido").html(
          '<div class="container mt-4"><p class="text-danger">No se pudo cargar la sección.</p></div>'
        );
      }
      // Subir al inicio al cambiar de sección
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Interceptar clics del navbar
  $(document).on("click", "[data-seccion]", function (e) {
    e.preventDefault();
    var seccion = $(this).data("seccion");

    // Cargar contenido
    cargarSeccion(seccion);

    // Actualizar el hash de la URL (para poder compartir el enlace)
    if (history.pushState) {
      history.pushState(null, null, "#" + seccion);
    } else {
      location.hash = seccion;
    }

    // Cerrar el menú colapsado en móvil
    var navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }

    // Marcar el link activo
    $("[data-seccion]").removeClass("active");
    $(this).addClass("active");
  });

  // Cargar sección inicial según el hash de la URL, o "sobre-mi" por defecto
  var hashInicial = location.hash.replace("#", "") || "sobre-mi";
  cargarSeccion(hashInicial);

  // Detectar cambios en el hash (botones atrás/adelante del navegador)
  window.addEventListener("popstate", function () {
    var seccion = location.hash.replace("#", "") || "sobre-mi";
    cargarSeccion(seccion);
  });

});