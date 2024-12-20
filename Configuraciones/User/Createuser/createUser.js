document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Create-user");
    if (form) {
        console.log("Formulario encontrado");
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const UrlApi = "https://localhost:57199/api/Usuario/crear";
            const Name = document.getElementById("Name").value;
            const Email = document.getElementById("Email").value;
            const Password = document.getElementById("Password").value;

            console.log("Datos a enviar:", { Name, Email, Password });

            const DataUser = {
                Name: Name,
                Email: Email,
                Contraseña: Password
            };

            fetch(UrlApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataUser)
            })
            .then(response => {
                // Verificamos si la respuesta es exitosa
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error en la red');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Éxito:', data);
                form.reset(); // Resetea el formulario
                document.getElementById("response").innerText = "¡Registro exitoso!"; // Mostrar mensaje de éxito
            })
            .catch(error => {
                console.error("Error:", error.message);
                document.getElementById("response").innerText = error.message; // Mostrar mensaje de error
            });
        });
    } else {
        console.error("El formulario no se encontró.");
    }
});
