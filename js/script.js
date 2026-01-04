/** 
 * @description Función que se encarga de la logica para obtener los resultados
 * @returns {void}
 */
function obtenerResultados() {
  const puntos = formateo(document.getElementById("puntos").value);
  const porcentaje = formateo(document.getElementById("porcentaje").value);
  const constante = formateo(document.getElementById("constante").value);

  const puntosObtenidos = formateo(document.getElementById("puntosObtenidos").value);

  if (puntos === "" || porcentaje === "" || puntosObtenidos === "") {
    mostrarError("Faltan datos");
    return;
  }

  if (puntos <= 0 || porcentaje <= 0 || puntosObtenidos <= 0) {
    mostrarError("Los valores deben ser mayores a 0");
    return;
  }

  if (puntosObtenidos > puntos) {
    mostrarError("Los puntos obtenidos, no pueden ser mayor que los puntos del examen");
    limpiarCampos();
    return;
  }

  const notaFinal = calcularNota(puntos, constante, puntosObtenidos);
  document.getElementById("notaObtenida").value = notaFinal;

  const porcentajeObt = calcularPorcentaje(puntos, porcentaje, puntosObtenidos);
  document.getElementById("porcentajeObtenido").value = porcentajeObt;
} //Funcion que se encarga de obtener los resultados de los espacios

document.getElementById("calcular").addEventListener("click", obtenerResultados);
document.getElementById("calcular").addEventListener("click", shakeArea);

const elementos = document.querySelectorAll("#puntosObtenidos, #puntos, #porcentaje, #constante");

elementos.forEach(function (elemento) {
  elemento.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      obtenerResultados();
      shakeArea();
    }
  });
});

function shakeArea() {
  document.getElementById("nota").classList.add("shake");
  setTimeout(() => {
    document.getElementById("nota").classList.remove("shake");
  }, 500); // Duración de la animación en milisegundos
}

function mostrarError(mensaje) {
  swal.fire({
    icon: "error",
    text: mensaje,
    timer: 1500,
  });
}

function limpiarCampos() {
    document.getElementById("porcentajeObtenido").value = null;
    document.getElementById("puntosObtenidos").value = null;
    document.getElementById("notaObtenida").value = null;
} //Funcion que se encarga de limpiar los campos

function formateo(valor) {
  const num = parseFloat(valor);
  return Number.isNaN(num) ? "" : num;
}

function calcularPorcentaje(puntos, porcentaje, puntosObtenidos) {
  let porcentajeObt = (puntosObtenidos / (puntos / (porcentaje / 100))) * 100;
  porcentajeObt = porcentajeObt.toFixed(2);

  return porcentajeObt;
} //Funcion que se encarga de calcular el porcentaje obtenido

function calcularNota(puntos, constante, puntosObtenidos) {
  if (constante == 0 || constante == "") {
    notaFinal = (puntosObtenidos * 100) / puntos;
    return notaFinal.toFixed(2);
  } else {
    nota = (puntosObtenidos * 100) / puntos;
    notaFinal = nota * constante < 100 ? nota * constante : 100;
    return notaFinal.toFixed(2);
  }
} //Funcion que se encarga de calcular la nota obtenida