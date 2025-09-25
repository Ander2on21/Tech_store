// Este script se ejecuta cuando el contenido del DOM ha sido completamente cargado.
document.addEventListener("DOMContentLoaded", function() {
    const carritoLista = document.getElementById('carrito-lista');
    const resumenContenido = document.getElementById('resumen-contenido');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    /**
     * Guarda el estado actual del carrito en localStorage y actualiza el ícono del carrito.
     */
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarIconoCarrito();
    }

    /**
     * Muestra una notificación emergente (toast).
     * @param {string} message - El mensaje a mostrar en el toast.
     */
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
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
            showToast("No hay más stock de este producto.");
            return;
        }

        const productoEnCarrito = carrito.find(p => p.id === productoId);
        const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;

        if (cantidad > (producto.stock - cantidadEnCarrito)) {
            showToast(`Solo quedan ${producto.stock} en existencia.`);
            return;
        }

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            const productoOriginal = productos.find(p => p.id === productoId);
            carrito.push({ ...productoOriginal, cantidad: cantidad });
        }
        
        actualizarStock(productoId, cantidad);
        guardarCarrito();
        actualizarVistaProducto(productoId);
        showToast(`'${producto.nombre}' ha sido agregado al carrito.`);
    }

    /**
     * Modifica la cantidad de un producto en el carrito.
     * @param {number} productoId - El ID del producto a modificar.
     * @param {number} cambio - El cambio en la cantidad (+1 o -1).
     */
    function modificarCantidad(productoId, cambio) {
        const productoEnCarrito = carrito.find(p => p.id === productoId);
        if (!productoEnCarrito) return;

        const inventario = obtenerInventario();
        const productoInventario = inventario.find(p => p.id === productoId);

        if (cambio > 0 && productoInventario.stock <= 0) {
            showToast(`No hay más stock de ${productoEnCarrito.nombre}.`);
            return;
        }

        if (cambio < 0 && productoEnCarrito.cantidad <= 1) {
            // Si la cantidad es 1 y se intenta reducir, se elimina el producto
            eliminarDelCarrito(productoId);
            return;
        }
        
        productoEnCarrito.cantidad += cambio;
        actualizarStock(productoId, -cambio); // El stock se suma o resta segun el cambio
        guardarCarrito();
        mostrarCarrito();
    }

    /**
     * Elimina un producto completo del carrito.
     * @param {number} productoId - El ID del producto a eliminar.
     */
    function eliminarDelCarrito(productoId) {
        const productoIndex = carrito.findIndex(p => p.id === productoId);
        if (productoIndex > -1) {
            const productoEnCarrito = carrito[productoIndex];
            // Restaura el stock en el inventario.
            actualizarStock(productoId, productoEnCarrito.cantidad);
            // Elimina el producto del carrito
            carrito.splice(productoIndex, 1);
            guardarCarrito();
            mostrarCarrito();
            showToast(`${productoEnCarrito.nombre} ha sido eliminado del carrito.`);
        }
    }

    /**
     * Muestra los productos del carrito en la página.
     */
    function mostrarCarrito() {
        if (!carritoLista) return;

        carritoLista.innerHTML = '';
        if(resumenContenido) resumenContenido.innerHTML = '';

        if (carrito.length === 0) {
            carritoLista.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
            return;
        }

        let totalProductos = 0;
        let totalCompra = 0;

        const tabla = document.createElement('table');
        tabla.className = 'table';
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = tabla.querySelector('tbody');

        carrito.forEach(producto => {
            const totalProducto = producto.precio * producto.cantidad;
            totalProductos += producto.cantidad;
            totalCompra += totalProducto;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                        <span>${producto.nombre}</span>
                    </div>
                </td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                        <span class="mx-2">${producto.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad(${producto.id}, 1)">+</button>
                    </div>
                </td>
                <td>$${totalProducto.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        carritoLista.appendChild(tabla);

        if(resumenContenido) {
            resumenContenido.innerHTML = `
                <p><strong>Productos:</strong> ${totalProductos}</p>
                <p><strong>Total:</strong> $${totalCompra.toFixed(2)}</p>
                <button class="btn btn-primary w-100">Proceder al Pago</button>
            `;
        }
    }

    /**
     * Actualiza el número de artículos en el ícono del carrito en el menú.
     * Lee desde localStorage para asegurar que los datos son correctos incluso con carga asíncrona.
     */
    function actualizarIconoCarrito() {
        const carritoIcon = document.getElementById('carrito-icon');
        const carritoDesdeStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carritoIcon) {
            const totalItems = carritoDesdeStorage.reduce((sum, item) => sum + item.cantidad, 0);
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
                if(stockElement) stockElement.textContent = `Stock: ${producto.stock === 0 ? "Agotado" : producto.stock}`;
                if (buttonElement) {
                    buttonElement.disabled = producto.stock === 0;
                }
            }
        });
    }
    
    // Expone las funciones al objeto global `window` para que puedan ser llamadas desde el HTML (onclick).
    window.agregarAlCarrito = agregarAlCarrito;
    window.modificarCantidad = modificarCantidad;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.actualizarIconoCarrito = actualizarIconoCarrito;

    // Inicializa la vista del carrito al cargar la página.
    if (carritoLista) {
        mostrarCarrito();
    }
});
