const container = document.querySelector(".container")
const inputSearch = document.querySelector("input#inputSearch")
const imgCarrito = document.querySelector("img#imgCarrito")
const btnCheckout = document.querySelector("div.btnCheckout")

const destinos = []
const URL = 'js/destinos.json'

fetch(URL)
    .then((response) => response.json())
    .then((data) => destinos.push(...data))
    .then(() => cargarProductos(destinos))
    .catch((error) => container.innerHTML = avisoError())

function filtrarDestinos(valor) {
    let resultado = destinos.filter(destino => destino.nombre.toLowerCase().includes(valor.toLowerCase()))
    resultado.length > 0 && console.table(resultado)
    if (resultado.length > 0) {
        cargarProductos(resultado)
    }
}

function retornarcardHTML(destino) {
    return `<div class="div-card">
                <div class="imagen"><img src="${destino.imagen}"</img></div>
                <div class="nombre"><h3>${destino.nombre}</h3>
                <div class="fechaSalida"><h4>Fecha de salida: ${destino.fechaSalida}</h4>
                <div class="duracion"><h4>Duración:${destino.duracion}</h4>
                <div class="precio"><h4>USD ${destino.precio}</h4>
                <div class="botonCard">
                    <button class="btn btn-primary btn-sm" id="${destino.id}" title="Agregar">Agregar</button>
            </div>`
}

function avisoError() {
    container.innerHTML =
        `<div class="avisoError">
                               <h3>Hubo un error.<h3>
                               <h3>Intentalo nuevamente.<h3>
                          </div>`
}

function cargarProductos(array) {
    container.innerHTML = ""
    array.forEach((destino) => {
        container.innerHTML += retornarcardHTML(destino)
    })
    activarClickBotones()
}

inputSearch.addEventListener("search", (e) => {
    filtrarDestinos(e.target.value)
})

function activarClickBotones() {
    const botones = document.querySelectorAll("button.btn.btn-primary.btn-sm")
    for (const boton of botones) {
        boton.addEventListener("click", (e) => {
            (async () => {
                const {
                    value: cantidad
                } = await Swal.fire({
                    title: 'Escribe la cantidad de pasajeros',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    showLoaderOnConfirm: true,
                    cancelButtonText: "Cancelar"
                });
                if (cantidad > 0) {
                    let resultado = destinos.find(destino => destino.id === parseInt(e.target.id))
                    resultado.cantidad = parseInt(cantidad)
                    carrito.push(resultado)
                    guardarCarrito()
                    avisoSeleccion()
                } else {
                    Swal.fire('Debes ingresar un número.')
                }
            })()
        })
    }
}

function avisoSeleccion() {
    Toastify({
        text: "Agregaste un destino",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "rgb(80, 180, 400)",
        }
    }).showToast();
}

destinos.length > 0 ? cargarProductos(destinos) : avisoError()

btnCheckout.addEventListener("click", () => location.href = "carrito.html")
