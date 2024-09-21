document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Create-user");
    if (form) {
        console.log("Formulario encontrado");
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const UrlApi = "https://localhost:7037/api/Users/CreateUser";
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
                if (!response.ok) {
                    console.error('Error en la respuesta:', response);
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Éxito:', data);
                const form  = document.getElementById("Create-user");
                form.reset();
                document.getElementById("response").innerText = "¡Registro exitoso!"; // Opcional
              

                
            })
            .catch((error) => {
                console.error("Error:", error);
                document.getElementById("response").innerText = "¡Correo Existente!";
            });
        });
    } else {
        console.error("El formulario no se encontró.");
    }
});
