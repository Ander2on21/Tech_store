// Este script se ejecuta cuando el contenido del DOM ha sido completamente cargado.
document.addEventListener("DOMContentLoaded", function() {
    // Carga el menú de navegación desde menu.html y lo inserta en el placeholder.
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-placeholder").innerHTML = data;
            // Una vez cargado el menú, se asegura de que el ícono del carrito esté actualizado.
            if (typeof actualizarIconoCarrito === 'function') {
                actualizarIconoCarrito();
            }
            // Actualiza el menú para reflejar el estado de inicio de sesión.
            if (typeof actualizarMenu === 'function') {
                actualizarMenu();
            }
        });

    // Renderiza las secciones de productos destacados y nuevos en la página principal.
    renderProductos(productosDestacados, "productos-destacados", false);
    renderProductos(productosNuevos, "productos-nuevos", true);
});

/**
 * Muestra una notificación "toast" con un mensaje.
 * @param {string} message - El mensaje a mostrar.
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function(){ toast.classList.remove('show'); }, 3000);
    }
}

/**
 * Agrega un producto al carrito y muestra una notificación.
 * @param {number} productoId - El ID del producto a comprar.
 * @param {string} productoNombre - El nombre del producto.
 */
function comprarProducto(productoId, productoNombre) {
    agregarAlCarrito(productoId, 1);
    showToast(`'${productoNombre}' ha sido agregado al carrito.`);
}

// Exponer funciones al ámbito global para que puedan ser llamadas desde el HTML.
window.showToast = showToast;
window.comprarProducto = comprarProducto;


/**
 * Renderiza una lista de productos en un contenedor específico de la página.
 * @param {Array} productos - El array de productos a mostrar.
 * @param {string} containerId - El ID del elemento contenedor donde se mostrarán los productos.
 * @param {boolean} mostrarNuevo - Indica si se debe mostrar la etiqueta "Nuevo" en los productos.
*/
function renderProductos(productos, containerId, mostrarNuevo = false) {
    const container = document.getElementById(containerId);
    let inventario = obtenerInventario(); // Obtiene el inventario actual desde localStorage.
    if (container) {
        // Itera sobre la lista de productos para crear y mostrar cada tarjeta de producto.
        productos.forEach(producto => {
            const productoInventario = inventario.find(p => p.id === producto.id);
            const stock = productoInventario ? productoInventario.stock : 0;
            const etiquetaNuevo = mostrarNuevo
                ? `<span class="new">Nuevo</span>`
                : '';
            const etiquetaDestacado = !mostrarNuevo
                ? `<span class="new">Destacado</span>`
                : '';
            // Crea el HTML para la tarjeta del producto.
            
            const productCard = `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="product-card card h-100" id="product-card-${producto.id}">
                        <a href="producto-detalle.html?id=${producto.id}">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
                            ${etiquetaNuevo}
                            ${etiquetaDestacado}
                        </a>
                        <div class="card-body">
                            <h3 class="card-title">
                                <a href="producto-detalle.html?id=${producto.id}">${producto.nombre}</a>
                            </h3>
                            <p class="card-text">${producto.descripcion.substring(0, 50)}...</p>
                            <p class="price fs-3">$ ${producto.precio}</p>
                            <p class="stock">Stock: ${stock === 0 ? "Agotado" : stock}</p>
                        </div>
                        <div class="card-footer d-grid gap-2">
                             <button class="btn btn-success" ${stock === 0 ? "disabled" : ""} onclick="comprarProducto(${producto.id}, '${producto.nombre}')">Añadir al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            // Agrega la tarjeta del producto al contenedor.
            container.innerHTML += productCard;
        });
    }
}
