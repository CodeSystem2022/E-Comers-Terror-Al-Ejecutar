


let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const productoList = []


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-nombre">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-stock">
                    <small>Cantidad</small>
                    <p>${producto.quantity}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.quantity}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

};




cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = parseInt(e.currentTarget.id, 10);
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.quantity, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.quantity), 0);
    total.innerText = `$${totalCalculado}`;
}

function agregarListaProducto() {
    productosEnCarrito.forEach(producto => {
        let productoObj = {
            "nombre": producto.nombre,
            "quantity": producto.quantity,
            "precio": producto.precio
        }
        productoList.push(productoObj)
        console.log(productoList)
    })

}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    agregarListaProducto();
    let listaProductos = [];

    productosEnCarrito.forEach(producto => {
        let productoObj = {
            "productoId": producto.id,
            "quantity": producto.quantity
        }
        listaProductos.push(productoObj)
        console.log(listaProductos)
    })

    fetch("api/carrito", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            "userId": 1,
            "productosList": listaProductos
        })
    })
        .then((response) => {
            if (response.ok) {
                console.log("carrito agregado con exito")
            }

        });

    const mp = new MercadoPago('APP_USR-132d9d07-1a00-419f-95da-5d6473e181c8');
    const bricksBuilder = mp.bricks();


    console.log(productoList)
    fetch("api/checkout/create-preference", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            "productosList": productoList
        })
    })
        .then((response) => {
            if (response.ok) {
                // Si la respuesta es exitosa, procesa la respuesta como texto
                return response.text();
            } else if (response.status === 400) {
                // Si la respuesta es un bad request (HTTP 400), maneja el error y muestra un mensaje de error
                console.log("La solicitud ha fallado. Mensaje de error personalizado.");
                // Puedes mostrar el mensaje de error en tu interfaz de usuario
                // Por ejemplo, puedes actualizar un elemento HTML para mostrar el mensaje de error.
                document.getElementById('carrito-comprado').innerText = "La solicitud ha fallado. Mensaje de error personalizado.";
                throw new Error("La solicitud ha fallado.");
            } else {

                document.getElementById('error-message').innerText = "La solicitud ha fallado. Mensaje de error personalizado.";
                // Otras respuestas de error no manejadas
                throw new Error("Error de solicitud: " + response.status);

            }

        }) // Lee la respuesta como texto
        .then((data) => {
            if (data != 'token incorrecto') {
                preferenceId = data;
                console.log("esta todo bien")
                mp.bricks().create("wallet", "wallet_container", {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                });
                // Guardar el id en la variable preferenceId
                console.log(data);
            }
            else {
                console.log("la respuesta fallo")

                document.getElementById('carrito-comprado').innerText = "primero debe loguearse con su usuario y contraseña";
                const btnIniciarSesion = document.createElement('button');
                btnIniciarSesion.innerHTML = "Iniciar Sesión";
                btnIniciarSesion.classList = "producto-agregar";

                // Configurar el evento de clic para redirigir a la página de login
                btnIniciarSesion.addEventListener("click", function () {
                    // Cambia la URL a la página de login
                    window.location.href = "index_login.html";
                });

                // Agregar el botón al contenedor
                document.getElementById("contenedorBoton").appendChild(btnIniciarSesion);
            }

            


        })



    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}