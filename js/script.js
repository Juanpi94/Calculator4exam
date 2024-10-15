function calcularPorcentaje(puntos, porcentaje, puntosObtenidos) {
    let porcentajeObt = (puntosObtenidos / (puntos / (porcentaje / 100))) * 100;
    porcentajeObt = porcentajeObt.toFixed(2)

    return porcentajeObt
} //Funcion que se encarga de calcular el porcentaje obtenido

function calcularNota(puntos, constante, puntosObtenidos) {
    if (constante == 0 || constante == "") {
        notaFinal = puntosObtenidos * 100 / puntos;
        notaFinal = notaFinal.toFixed(2)
    } else {
        // notaFinal = puntosObtenidos * constante;
        notaFinal = (100 / puntos) * puntosObtenidos;
        notaFinal = notaFinal.toFixed(2)
    }
    return notaFinal
} //Funcion que se encarga de calcular la nota obtenida

function obtenerResultados() {
    let puntos = document.getElementById("puntos").value;
    let porcentaje = document.getElementById("porcentaje").value;
    let constante = document.getElementById("constante").value;

    let puntosObtenidos = document.getElementById("puntosObtenidos").value;

    if (puntos == "" || porcentaje == "" || puntosObtenidos == "") {
        swal.fire({ icon: "error", text: "Faltan datos", timer: 1000 })
    } else {
        if (puntos <= 0 || porcentaje <= 0 || puntosObtenidos <= 0) {
            swal.fire({ icon: "error", text: "Los valores deben ser mayores a 0", timer: 1000 })
        } else {
            if (puntosObtenidos > puntos) {
                document.getElementById("notaObtenida").value = "";
                document.getElementById("porcentajeObtenido").value = "";
                swal.fire({ icon: "error", text: "Los puntos obtenidos, no pueden ser mayor que los puntos del examen", timer: 1000 })
            } else {
                // Swal.fire({
                //     position: "top-center",
                //     icon: "success",
                //     title: "Calculo completado",
                //     showConfirmButton: false,
                //     timer: 1000
                // });

                let notaFinal = calcularNota(puntos, constante, puntosObtenidos)
                document.getElementById("notaObtenida").value = notaFinal;

                let porcentajeObt = calcularPorcentaje(puntos, porcentaje, puntosObtenidos)
                document.getElementById("porcentajeObtenido").value = porcentajeObt;
            }
        }
    }
} //Funcion que se encarga de obtener los resultados de los espacios

document.getElementById("calcular").addEventListener("click", obtenerResultados);

const elementos = document.querySelectorAll('#puntosObtenidos, #puntos, #porcentaje, #constante');

elementos.forEach(function (elemento) {
    elemento.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            obtenerResultados();
            shakeArea();
        }
    });
});

document.getElementById('calcular').addEventListener('click', shakeArea);

function shakeArea() {
    document.getElementById('nota').classList.add('shake');
    setTimeout(() => {
        document.getElementById('nota').classList.remove('shake');
    }, 500); // Duración de la animación en milisegundos
}



