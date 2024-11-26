document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional
  
        // Obtén los valores del formulario
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        // Crea el objeto de datos que enviarás
        const data = {
            email: email,
            password: password,
        };
  
        // Enviar los datos usando Fetch API
        fetch("https://localhost:57199/api/Usuario/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json(); // Ahora esperamos una respuesta JSON
        })
        .then((data) => {
            // Maneja la respuesta del servidor
            if (data.success) {
                document.getElementById("response").innerText = data.message; // Mostramos el mensaje de éxito
                // Redirige al usuario a home.html dentro de la carpeta 'pages'
                window.location.href = "../Home/Home.html"; // Asegúrate de que 'pages/home.html' es la ruta correcta
            } else {
                document.getElementById("response").innerText = "Error de inicio de sesión: " + data.message;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("response").innerText = "Email o Contraseña Incorrecta";
        });
    });
});
