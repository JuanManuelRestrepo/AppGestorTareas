
//URL api
const UrlApi = "https://localhost:7037/api/Users/users";

async function GetUsers() {
    try {
        //alamecnamos solicitud de la api en una variable
        const response = await fetch(UrlApi);
        //convertimos en JSON
        const Users = await response.json();

        const usersTableBody = document.getElementById("users-table-body");
        usersTableBody.innerHTML = ""; // Limpiamos el contenedor

        // iterams por cada elemento del JSON
        Users.forEach(user => {

            //por cada usuario creamos una fila
            const row = document.createElement('tr');

            const userIdCell = document.createElement('td');
            userIdCell.textContent = user.id;
            row.appendChild(userIdCell); // agregamos el id al contenedor

            const userNameCell = document.createElement('td');
            userNameCell.textContent = user.name;
            row.appendChild(userNameCell);

            const userEmailCell = document.createElement('td');
            userEmailCell.textContent = user.email;
            row.appendChild(userEmailCell);

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.onclick = () => modificarUsuario(user.id); // Redirige a la página de edición
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => confirmarEliminarUsuario(user); // Función de confirmación
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            // una vez acabada la fila o los datos del usuario agregamos fila a la tabla
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function crearUsuario(){
    window. location.href ="Createuser/createUser.html"   
}

// Función para modificar usuario
function modificarUsuario(id) {
    // Redirigir a la página de edición, pasando el ID
    window.location.href = `editar.html?id=${id}`;
}

// Función para confirmar la eliminación del usuario
function confirmarEliminarUsuario(user) {
    const confirmation = confirm(`¿Desea eliminar al usuario: ${user.name}?`);
    if (confirmation) {
        eliminarUsuario(user.id); // Llamar a la función de eliminación
    }
}

// Función para eliminar usuario
function eliminarUsuario(id) {
    // Aquí podrías hacer una llamada a la API para eliminar el usuario
    console.log(`Eliminar usuario con ID: ${id}`);
    // Ejemplo de llamada a la API (requiere implementar la lógica de eliminación en tu backend)
    // fetch(`${UrlApi}/${id}`, { method: 'DELETE' })
    //     .then(response => {
    //         if (response.ok) {
    //             alert('Usuario eliminado exitosamente');
    //             GetUsers(); // Volver a cargar la lista de usuarios
    //         } else {
    //             alert('Error al eliminar el usuario');
    //         }
    //     });
}

// Llama a la función para cargar los usuarios cuando la página se carga
window.onload = GetUsers;
