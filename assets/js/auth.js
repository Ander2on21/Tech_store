document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    const loginForm = document.getElementById('login-form');
    const menuUsuario = document.getElementById('menu-usuario'); 

    // Cargar usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    /**
     * Muestra una notificación emergente (toast).
     */
    function showToast(message, isError = false) {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = message;
            toast.className = 'toast show';
            if (isError) {
                toast.style.backgroundColor = '#dc3545'; // Color rojo para errores
            }
            setTimeout(() => {
                toast.className = 'toast';
                toast.style.backgroundColor = ''; // Restablecer color
            }, 3000);
        }
    }

    // Lógica de Registro
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const usuarioExiste = usuarios.find(user => user.email === email);

            if (usuarioExiste) {
                showToast('Este correo electrónico ya está registrado.', true);
            } else {
                const nuevoUsuario = { nombre, email, password };
                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                showToast('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setTimeout(() => window.location.href = 'login.html', 2000);
            }
        });
    }

    // Lógica de Inicio de Sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const usuario = usuarios.find(user => user.email === email && user.password === password);

            if (usuario) {
                sessionStorage.setItem('currentUser', JSON.stringify(usuario));
                showToast(`Bienvenido, ${usuario.nombre}!`);
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                showToast('Correo o contraseña incorrectos.', true);
            }
        });
    }

    // Lógica para actualizar la UI y cerrar sesión
    function actualizarMenu() {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        const loginLink = document.querySelector('a[href="login.html"]');
        
        if (currentUser && loginLink) {
            const navList = loginLink.parentElement.parentElement;
            loginLink.parentElement.remove(); // Elimina el <li> de "Iniciar Sesión"

            // Crear el menú desplegable del usuario
            const userLi = document.createElement('li');
            userLi.classList.add('nav-item', 'dropdown');
            userLi.innerHTML = `
                <a class="header__nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${currentUser.nombre}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#" id="logout-btn">Cerrar Sesión</a></li>
                </ul>
            `;
            navList.appendChild(userLi);

            // Evento para cerrar sesión
            document.getElementById('logout-btn').addEventListener('click', () => {
                sessionStorage.removeItem('currentUser');
                showToast('Has cerrado sesión.');
                setTimeout(() => window.location.href = 'index.html', 2000);
            });
        }
    }

    // Exportar funciones para ser usadas globalmente
    window.showToast = showToast;
    window.actualizarMenu = actualizarMenu;
});
