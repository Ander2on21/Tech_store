function inicializarInventario() {
    let inventario = JSON.parse(localStorage.getItem('inventario'));
    if (!inventario) {
        // The 'productos' array is defined in productos.js
        inventario = productos.map(p => ({...p}));
        localStorage.setItem('inventario', JSON.stringify(inventario));
    }
    return inventario;
}

function obtenerInventario() {
    return JSON.parse(localStorage.getItem('inventario'));
}

function actualizarStock(productoId, cantidad) {
    let inventario = obtenerInventario();
    const producto = inventario.find(p => p.id === productoId);
    if (producto) {
        producto.stock -= cantidad;
        localStorage.setItem('inventario', JSON.stringify(inventario));
    }
}

// Initialize the inventory on script load
let inventario = inicializarInventario();
