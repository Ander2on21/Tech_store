document.addEventListener('DOMContentLoaded', function () {
    const resumenPago = document.getElementById('resumen-pago');
    const formularioPago = document.getElementById('formulario-pago');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
     * Muestra el resumen de la compra en la página de pago.
     */
    function mostrarResumen() {
        if (carrito.length === 0) {
            resumenPago.innerHTML = '<p>No hay productos en el carrito para pagar.</p>';
            formularioPago.style.display = 'none'; // Oculta el formulario si no hay nada que pagar
            return;
        }

        let totalProductos = 0;
        let totalCompra = 0;

        const listaProductos = document.createElement('ul');
        listaProductos.className = 'list-group mb-3';

        carrito.forEach(producto => {
            const totalProducto = producto.precio * producto.cantidad;
            totalProductos += producto.cantidad;
            totalCompra += totalProducto;

            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between lh-sm';
            item.innerHTML = `
                <div>
                    <h6 class="my-0">${producto.nombre}</h6>
                    <small class="text-muted">Cantidad: ${producto.cantidad}</small>
                </div>
                <span class="text-muted">$${totalProducto.toFixed(2)}</span>
            `;
            listaProductos.appendChild(item);
        });

        const itemTotal = document.createElement('li');
        itemTotal.className = 'list-group-item d-flex justify-content-between';
        itemTotal.innerHTML = `
            <span>Total (USD)</span>
            <strong>$${totalCompra.toFixed(2)}</strong>
        `;
        listaProductos.appendChild(itemTotal);

        resumenPago.appendChild(listaProductos);
    }

    /**
     * Procesa el pago, vacía el carrito y redirige al inicio.
     * @param {Event} event - El evento de envío del formulario.
     */
    function procesarPago(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Vaciar el carrito
        localStorage.removeItem('carrito');

        // Actualizar el ícono del carrito en el menú
        if (window.actualizarIconoCarrito) {
            window.actualizarIconoCarrito();
        }

        // Mostrar mensaje de éxito
        showToast('¡Compra realizada con éxito! Gracias por su preferencia.');

        // Redirigir a la página de inicio después de un momento
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    // Asignar el manejador de eventos al formulario
    if (formularioPago) {
        formularioPago.addEventListener('submit', procesarPago);
    }

    // Cargar el resumen de la compra al iniciar
    mostrarResumen();
    
    // Llama a la función para actualizar el ícono del carrito al cargar la página
    if (window.actualizarIconoCarrito) {
        window.actualizarIconoCarrito();
    }
});
