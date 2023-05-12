const titulo = document.getElementById("Titulo")
const bajadaTitulo = document.getElementById("bajadaTitulo")


titulo.innerText = "Tu mejor viaje"
bajadaTitulo.innerText = "Selecciona tu paquete favorito."

const carrito = recuperarCarrito() || []

function recuperarCarrito() {
    const carritoTemporal = JSON.parse(localStorage.getItem("carritoUsuario")) || []
    return carritoTemporal
}

function guardarCarrito() {
    localStorage.setItem("carritoUsuario", JSON.stringify(carrito))
}