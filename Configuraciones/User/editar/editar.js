// URL de la API
const UrlApi = "https://localhost:57199/api/Usuario/";

// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');


console.log(userId)

// Cuando la página se cargue, obtenemos los datos del usuario
window.onload = function() {
    if (userId) {
        obtenerUsuario(userId);
    } else {
        document.getElementById("message-container").innerHTML = "ID de usuario no proporcionado.";
    }

    // Manejar el evento de envío del formulario
    const form = document.getElementById("edit-user-form");
    form.onsubmit = function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        actualizarUsuario(userId);
    };
};

// Función para obtener los datos del usuario
async function obtenerUsuario(id) {
    try {
        const response = await fetch(`${UrlApi}GetUsuarioById/${id}`);
        const user = await response.json();
        
        // Rellenar los campos del formulario con los datos del usuario
        if (user) {
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('password').value = '';  // Se puede dejar en blanco
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        document.getElementById("message-container").innerHTML = "No se pudo cargar la información del usuario.";
    }
}

// Función para actualizar los datos del usuario
async function actualizarUsuario(id) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Asegúrate de enviar los datos correctos
    const updatedUser = {
        name: name,    // Asegúrate de que este campo coincida con el backend
        email: email,  // Asegúrate de que este campo coincida con el backend
        password: password
    };

    try {
        const response = await fetch("https://localhost:57199/api/Usuario/UpdateUsuario", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        // Verifica si la respuesta es exitosa
        if (response.ok) {
            document.getElementById("message-container").innerHTML = "Usuario actualizado correctamente.";
        } else {
            const errorData = await response.json();
            document.getElementById("message-container").innerHTML = `Error: ${errorData.message || 'Error desconocido'}`;
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        document.getElementById("message-container").innerHTML = "Error al intentar actualizar el usuario.";
    }
}