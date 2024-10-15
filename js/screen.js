function asignarClase() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        let space = document.getElementsByClassName("input-area2");
        for (let i = 0; i < space.length; i++) {
            space[i].classList.add("col");
            space[i].classList.remove("row");
        }
    }else{
        let space = document.getElementsByClassName("input-area2");
        for (let i = 0; i < space.length; i++) {
            space[i].classList.remove("col");
            space[i].classList.add("row");   
        }
    }
}

// Llamar a la función al cargar la página
window.onload = asignarClase;

// Llamar a la función al cambiar el tamaño de la pantalla
window.onresize = asignarClase;