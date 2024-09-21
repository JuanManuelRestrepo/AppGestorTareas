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
        fetch("https://localhost:7037/api/Login/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            // Aquí manejas la respuesta del servidor
            if (data.success) {
                document.getElementById("response").innerText = "¡Inicio de sesión exitoso!";
                // Redirige al usuario a home.html dentro de la carpeta 'pages'
                window.location.href = "../Home/Home.html"; // Asegúrate de que 'pages/home.html' es la ruta correcta
            } else {
                document.getElementById("response").innerText = "Error de inicio de sesión: " + data.message;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("response").innerText = "Error en la solicitud. Verifica la consola para más detalles."
            console.log("Eror al enviar la solicitud")
        });
    });
  });
  