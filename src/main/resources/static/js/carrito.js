const productosEnCarrito = obtenerProductosEnCarritoDesdeLocalStorage();
const elementosDOM = {
  contenedorCarritoVacio: document.querySelector("#carrito-vacio"),
  contenedorCarritoProductos: document.querySelector("#carrito-productos"),
  contenedorCarritoAcciones: document.querySelector("#carrito-acciones"),
  contenedorCarritoComprado: document.querySelector("#carrito-comprado"),
  botonVaciar: document.querySelector("#carrito-acciones-vaciar"),
  contenedorTotal: document.querySelector("#total"),
  botonComprar: document.querySelector("#carrito-acciones-comprar"),
};

function obtenerProductosEnCarritoDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
}

function cargarProductosCarrito() {
  const isEmpty = productosEnCarrito.length === 0;

  elementosDOM.contenedorCarritoVacio.classList.toggle("disabled", !isEmpty);
  elementosDOM.contenedorCarritoProductos.classList.toggle("disabled", isEmpty);
  elementosDOM.contenedorCarritoAcciones.classList.toggle("disabled", isEmpty);
  elementosDOM.contenedorCarritoComprado.classList.add("disabled");

  if (!isEmpty) {
    elementosDOM.contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = crearElementoCarrito(producto);
      elementosDOM.contenedorCarritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
  }
}

function crearElementoCarrito(producto) {
  const div = document.createElement("div");
  div.classList.add("carrito-producto");
  div.innerHTML = `
            <img class="carrito-producto-imagen" src="${
              producto.imagen
            }" alt="${producto.nombre}">
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
            <button class="carrito-producto-eliminar" id="${
              producto.id
            }"><i class="bi bi-trash-fill"></i></button>
        `;

  return div;
}

function actualizarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(
    ".carrito-producto-eliminar"
  );
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = parseInt(e.currentTarget.id, 10);
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  if (index !== -1) {
    productosEnCarrito.splice(index, 1);
    actualizarLocalStorageYRecargarCarrito();
  }
}

function actualizarLocalStorageYRecargarCarrito() {
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

elementosDOM.botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  const totalProductos = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.quantity,
    0
  );

  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${totalProductos} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      actualizarLocalStorageYRecargarCarrito();
    }
  });
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.quantity,
    0
  );
  elementosDOM.contenedorTotal.innerText = `$${totalCalculado}`;
}

function agregarListaProducto() {
  productoList.length = 0;

  productosEnCarrito.forEach((producto) => {
    let productoObj = {
      nombre: producto.nombre,
      quantity: producto.quantity,
      precio: producto.precio,
    };
    productoList.push(productoObj);
  });
}

elementosDOM.botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  agregarListaProducto();

  // ... (resto del código)
}
