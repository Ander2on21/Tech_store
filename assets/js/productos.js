// Este archivo contiene los datos de los productos de la tienda.
// En una aplicación real, estos datos provendrían de una base de datos a través de una API.

// --- Lista Completa de Productos ---
// Este es el array principal que contiene todos los productos disponibles en la tienda.
const productos = [
    // Periféricos
    {
        id: 1,
        nombre: "Monitor",
        precio: 50,
        imagen: "./assets/imagenes/monitor.png",
        stock: 10,
        descripcion: "Monitor de 24 pulgadas Full HD para una experiencia visual inmersiva."
    },
    {
        id: 2,
        nombre: "Audifonos",
        precio: 10,
        imagen: "./assets/imagenes/audifonos.jpg",
        stock: 15,
        descripcion: "Audífonos con cancelación de ruido para una máxima concentración."
    },
    {
        id: 3,
        nombre: "Teclado",
        precio: 15,
        imagen: "./assets/imagenes/teclado.jpg",
        stock: 20,
        descripcion: "Teclado mecánico retroiluminado para gaming."
    },
    {
        id: 4,
        nombre: "Mouse",
        precio: 10,
        imagen: "./assets/imagenes/mouse.jpg",
        stock: 25,
        descripcion: "Mouse ergonómico inalámbrico de alta precisión."
    }
    ,
    // Laptops
    {
        id: 5,
        nombre: "Laptop Gamer",
        precio: 1500,
        imagen: "./assets/imagenes/laptop.jpg",
        stock: 5,
        descripcion: "Laptop con tarjeta gráfica dedicada y procesador de última generación para los juegos más exigentes."
    },
    {
        id: 6,
        nombre: "Laptop Ultrabook",
        precio: 1200,
        imagen: "./assets/imagenes/laptop2.jpg",
        stock: 8,
        descripcion: "Laptop ligera y potente, ideal para trabajar o estudiar en cualquier lugar."
    },
    
    // Oficina
    {
        id: 7,
        nombre: "Escritorio",        
        precio: 300,
        imagen: "./assets/imagenes/escritorio.jpg",
        stock: 15,
        descripcion: "Escritorio amplio y moderno para tu oficina en casa."
    },
    {
        id: 8,
        nombre: "Silla de Oficina",
        precio: 150,
        imagen: "./assets/imagenes/silla.jpg",
        stock: 20,
        descripcion: "Silla ergonómica con soporte lumbar para largas jornadas de trabajo."
    },
    {
        id: 9,
        nombre: "Lampara de Escritorio",
        precio: 40,
        imagen: "./assets/imagenes/lampara.jpg",
        stock: 10,
        descripcion: "Lámpara LED con brillo ajustable para no forzar la vista."
    },
    // Accesorios
    {
        id: 10,
        nombre: "USB",
        precio: 20,
        imagen: "./assets/imagenes/usb.jpg",
        stock: 0,
        descripcion: "Memoria USB de 64GB para almacenar y transportar tus archivos."
    },
    {
        id: 11,
        nombre: "Disco Duro Externo",
        precio: 80,
        imagen: "./assets/imagenes/disco.jpg",
        stock: 12,
        descripcion: "Disco duro externo de 1TB para copias de seguridad y almacenamiento extra."
    },
    {
        id: 12, 
        nombre: "Cargador",
        precio: 30,
        imagen: "./assets/imagenes/cargador.jpg",
        stock: 18,
        descripcion: "Cargador rápido universal para tus dispositivos móviles."
    },
    {
        id: 13,
        nombre: "Cable HDMI",
        precio: 15,
        imagen: "./assets/imagenes/cable.jpg",
        stock: 25,
        descripcion: "Cable HDMI de alta velocidad para conectar tus dispositivos a pantallas."
    }
]

// --- Productos Destacados ---
// Una selección de productos para mostrar en la sección "Destacados" de la página principal.
const productosDestacados = [
    {
        id: 5,
        nombre: "Laptop Gamer",
        precio: 1500,
        imagen: "./assets/imagenes/laptop.jpg",
        stock: 5,
        descripcion: "Laptop con tarjeta gráfica dedicada y procesador de última generación para los juegos más exigentes."
    },
    {
        id: 1,
        nombre: "Monitor",
        precio: 50,
        imagen: "./assets/imagenes/monitor.png",
        stock: 10,
        descripcion: "Monitor de 24 pulgadas Full HD para una experiencia visual inmersiva."
    },
    {
        id: 8,
        nombre: "Silla de Oficina",
        precio: 150,
        imagen: "./assets/imagenes/silla.jpg",
        stock: 20,
        descripcion: "Silla ergonómica con soporte lumbar para largas jornadas de trabajo."
    },
    {
        id: 10,
        nombre: "Micro-USB",
        precio: 20,
        imagen: "./assets/imagenes/usb.jpg",
        stock: 50,
        descripcion: "Memoria USB de 64GB para almacenar y transportar tus archivos."
    }
];

// --- Productos Nuevos ---
// Una selección de productos para mostrar en la sección "Nuevos" de la página principal.
const productosNuevos = [
    {
        id: 14,
        nombre: "Cable HDMI",
        precio: 15,
        imagen: "./assets/imagenes/cable.jpg",
        stock: 25,
        descripcion: "Cable HDMI de alta velocidad para conectar tus dispositivos a pantallas."
    },
    {
        id: 15, 
        nombre: "Cargador",
        precio: 30,
        imagen: "./assets/imagenes/cargador.jpg",
        stock: 18,
        descripcion: "Cargador rápido universal para tus dispositivos móviles."
    },
    {
        id: 16,
        nombre: "Disco Duro Externo",
        precio: 80,
        imagen: "./assets/imagenes/disco.jpg",
        stock: 12,
        descripcion: "Disco duro externo de 1TB para copias de seguridad y almacenamiento extra."
    },
    {
        id: 17,
        nombre: "Laptop Ultrabook",
        precio: 1200,
        imagen: "./assets/imagenes/laptop2.jpg",
        stock: 8,
        descripcion: "Laptop ligera y potente, ideal para trabajar o estudiar en cualquier lugar."
    }
];