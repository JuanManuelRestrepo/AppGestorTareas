document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Preparar los datos a enviar
    const data = {
      username: username,
      password: password,
    };

    // Enviar los datos usando Fetch API
    fetch("/login", {
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
          document.getElementById("response").innerText = "Login successful!";
          // Aquí puedes redirigir al usuario a otra página si es necesario
        } else {
          document.getElementById("response").innerText =
            "Login failed: " + data.message;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
