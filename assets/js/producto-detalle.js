// Este script se ejecuta cuando el contenido del DOM de la página de detalle del producto ha sido cargado.
document.addEventListener("DOMContentLoaded", function() {
    // Crea un objeto para manejar los parámetros de la URL.
    const params = new URLSearchParams(window.location.search);
    // Obtiene el ID del producto desde el parámetro 'id' de la URL y lo convierte a número.
    const productoId = parseInt(params.get('id'));

    // Busca el producto correspondiente en el array de productos utilizando el ID.
    const producto = productos.find(p => p.id === productoId);

    // Si se encuentra el producto, se procede a mostrar sus detalles.
    if (producto) {
        const container = document.getElementById('producto-detalle-container');
        let inventario = obtenerInventario();
        const productoInventario = inventario.find(p => p.id === producto.id);
        const stock = productoInventario ? productoInventario.stock : 0;

        // Inserta el HTML con los detalles del producto en el contenedor.
        container.innerHTML = `
            <div class="col-md-6">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
            </div>
            <div class="col-md-6">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p class="price">Precio: $${producto.precio}</p>
                <p class="stock">En existencia: ${stock === 0 ? 'Agotado' : stock} </p>
                <div class="d-flex align-items-center">
                    <button class="btn btn-secondary" id="restar-cantidad">-</button>
                    <span id="cantidad-producto" class="mx-3">1</span>
                    <button class="btn btn-secondary" id="sumar-cantidad">+</button>
                    <button class="btn btn-success ms-3" id="agregar-al-carrito-btn" ${stock === 0 ? 'disabled' : ''}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        // Lógica para los botones de cantidad y agregar al carrito
        const restarBtn = document.getElementById('restar-cantidad');
        const sumarBtn = document.getElementById('sumar-cantidad');
        const cantidadSpan = document.getElementById('cantidad-producto');
        const agregarBtn = document.getElementById('agregar-al-carrito-btn');

        let cantidad = 1;

        restarBtn.addEventListener('click', () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadSpan.textContent = cantidad;
            }
        });

        sumarBtn.addEventListener('click', () => {
            if (cantidad < stock) {
                cantidad++;
                cantidadSpan.textContent = cantidad;
            }
        });

        agregarBtn.addEventListener('click', () => {
            agregarAlCarrito(producto.id, cantidad);
            showToast(`'${producto.nombre}' ha sido agregado al carrito.`);
        });

    } else {
        // Si no se encuentra el producto, muestra un mensaje de error.
        const container = document.getElementById('producto-detalle-container');
        container.innerHTML = '<p>Producto no encontrado.</p>';
    }
});