const tbody = document.querySelector("tbody")
const spanTotal = document.querySelector("span")
const btnComprar = document.querySelector("#btnComprar")
const btnVolver = document.querySelector("#btnVolver")

const retornoCarritoHTML = (destino) => {
    return `<tr>
            <td>${destino.cantidad}</td>
            <td>${destino.nombre}</td>
            <td>${destino.precio}</td>
            <td><button id="${destino.id}" class="btn.btn-primary botonQuitar">X</button></td>
        </tr>`
}

function mostrarCarrito() {
    tbody.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach(destino => tbody.innerHTML += retornoCarritoHTML(destino))
        activarBotonesEliminar()
        spanTotal.innerText = calcularTotal(carrito).toLocaleString()
    } else {
        spanTotal.innerText = "0.00"
        tbody.innerHTML = ""
    }
}

function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach(destino => total += (destino.precio * destino.cantidad))
    return total
}

function guardarCarrito() {
    localStorage.setItem("carritoUsuario", JSON.stringify(carrito))
}

function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".botonQuitar")
    if (botones) {
        for (let boton of botones) {
            boton.addEventListener("click", (e) => {
                let indice = carrito.findIndex((destino) => destino.id === parseInt(e.target.id))
                if (indice > -1) {
                    carrito.splice(indice, 1)
                    guardarCarrito()
                    mostrarCarrito()
                }
            })
        }
    }
}

btnComprar.addEventListener("click", () => {
    Toastify({
        text: "Tu compra se ha realizado con éxito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "rgb(80, 180, 400)",
        }
    }).showToast();

    carrito.length = 0
    localStorage.removeItem("carritoUsuario")
    mostrarCarrito()
})

mostrarCarrito();

btnVolver.addEventListener("click", () => location.href = "index.html")