// Este script se ejecuta cuando el contenido del DOM ha sido completamente cargado.
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene los elementos del DOM para el contenedor del carrito y el total.
    const carritoContainer = document.getElementById('carrito-container');
    const carritoTotal = document.getElementById('carrito-total');
    // Carga el carrito desde localStorage o inicializa un array vacío si no existe.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    /**
     * Guarda el estado actual del carrito en localStorage y actualiza el ícono del carrito.
     */
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarIconoCarrito();
    }

    /**
     * Agrega un producto al carrito o actualiza su cantidad si ya existe.
     * @param {number} productoId - El ID del producto a agregar.
     * @param {number} [cantidad=1] - La cantidad de productos a agregar.
     */
    function agregarAlCarrito(productoId, cantidad = 1) {
        cantidad = parseInt(cantidad);
        let inventario = obtenerInventario();
        const producto = inventario.find(p => p.id === productoId);

        if (!producto || producto.stock <= 0) {
            alert("No hay más stock de este producto.");
            return;
        }

        if (cantidad > producto.stock) {
            alert(`Solo quedan ${producto.stock} en existencia.`);
            return;
        }

        const productoEnCarrito = carrito.find(p => p.id === productoId);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            const productoOriginal = productos.find(p => p.id === productoId);
            carrito.push({ ...productoOriginal, cantidad: cantidad });
        }
        
        actualizarStock(productoId, cantidad);
        guardarCarrito();
        actualizarVistaProducto(productoId);
    }

    /**
     * Elimina un producto completo del carrito.
     * @param {number} productoId - El ID del producto a eliminar.
     */
    function eliminarDelCarrito(productoId) {
        const productoEnCarrito = carrito.find(p => p.id === productoId);
        if (productoEnCarrito) {
            // Restaura el stock en el inventario y filtra el producto fuera del carrito.
            actualizarStock(productoId, -productoEnCarrito.cantidad);
            carrito = carrito.filter(p => p.id !== productoId);
            guardarCarrito();
            mostrarCarrito(); // Vuelve a renderizar el carrito
            actualizarVistaProducto(productoId);
        }
    }

    /**
     * Muestra los productos del carrito en la página del carrito.
     */
    function mostrarCarrito() {
        if (!carritoContainer) return; // Si no estamos en la página del carrito, no hace nada.
        carritoContainer.innerHTML = '';
        let total = 0;
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
            if(carritoTotal) carritoTotal.innerHTML = '';
            return;
        }

        // Itera sobre los productos del carrito y los muestra.
        carrito.forEach(producto => {
            carritoContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio: ${producto.precio}</p>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                            <button class="btn btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            total += producto.precio * producto.cantidad;
        });

        // Muestra el total de la compra.
        if(carritoTotal) carritoTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    }

    /**
     * Actualiza el número de artículos en el ícono del carrito en el menú.
     */
    function actualizarIconoCarrito() {
        const carritoIcon = document.getElementById('carrito-icon');
        if (carritoIcon) {
            const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            carritoIcon.textContent = `Carrito (${totalItems})`;
        }
    }

    /**
     * Actualiza la vista de una tarjeta de producto (stock y botón de compra).
     * @param {number} productoId - El ID del producto a actualizar en la vista.
     */
    function actualizarVistaProducto(productoId) {
        const inventario = obtenerInventario();
        const producto = inventario.find(p => p.id === productoId);
        const productoCards = document.querySelectorAll(`#product-card-${productoId}`);

        productoCards.forEach(productoCard => {
            if (productoCard) {
                const stockElement = productoCard.querySelector('.stock');
                const buttonElement = productoCard.querySelector('button');
                stockElement.textContent = `Stock: ${producto.stock === 0 ? "Agotado" : producto.stock}`;
                if (producto.stock === 0) {
                    buttonElement.disabled = true;
                } else {
                    buttonElement.disabled = false;
                }
            }
        });
    }

    // Expone las funciones al objeto global `window` para que puedan ser llamadas desde el HTML (onclick).
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.actualizarIconoCarrito = actualizarIconoCarrito;

    // Si estamos en la página del carrito, lo muestra.
    if (carritoContainer) {
        mostrarCarrito();
    }
    // Actualiza el ícono del carrito al cargar la página.
    actualizarIconoCarrito();

    // Actualiza la vista de todos los productos al cargar la página para reflejar el stock actual.
    let inventario = obtenerInventario();
    if (inventario) {
        inventario.forEach(producto => {
            actualizarVistaProducto(producto.id);
        });
    }
});