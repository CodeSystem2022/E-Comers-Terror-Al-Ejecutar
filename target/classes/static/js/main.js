// PRODUCTOS
let productos = '';
async function getProductos(){
    const request = await fetch('api/producto',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
    });
     productos = await request.json();
cargarProductos(productos);
}
getProductos();

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.imagen}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
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
        onClick: function(){} // Callback after click
      }).showToast();

    let productoEnCarritoDto = {};
    const idBoton = parseInt(e.currentTarget.id, 10); // 10 es la base numérica (decimal) en este caso

    const productoAgregado = productos.find(producto => producto.id === idBoton);
    console.log(productoAgregado)
    console.log(productos)
    console.log(idBoton)

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].quantity++;
    } else {
        productoAgregado.quantity = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    // fetch("api/carrito", {
    //     method: "post",
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },

    //     //make sure to serialize your JSON body
    //     body: JSON.stringify({
    //         "userId": 2,
    //         "productosList": [
    //             {
    //                 "productoId": productoAgregado.id,
    //                 "quantity": productoAgregado.quantity
    //             }
    //         ]
    //     })
    // })
    // .then( (response) => {
    //     console.log("carrito agregado con exito")
    // //do something awesome that makes the world a better plac
    // });
    // productoEnCarritoDto = {
    //     "userId": 2,
    //     "productosList": [
    //         {
    //             "productoId": productoAgregado.id,
    //             "quantity": productoAgregado.quantity
    //         }
    //     ]
    // };

    // Llamar a la función asíncrona para enviar los datos
    // (async () => {
    //     const response = await fetch("api/carrito", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             productoEnCarritoDto
    //         })
    //     });
    //     const carritoProductos = await response.json();
    //     console.log(carritoProductos);
    // })();
    console.log(productosEnCarrito)

          actualizarNumerito();
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

};


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.quantity, 0);
    numerito.innerText = nuevoNumerito;
}
