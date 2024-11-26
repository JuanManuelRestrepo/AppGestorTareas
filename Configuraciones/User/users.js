const UrlApi = "https://localhost:57199/api/Usuario/GetAllUsuarios"; // URL correcta

async function GetUsers() {
    try {
        const response = await fetch(UrlApi);
        const Users = await response.json();

        const usersTableBody = document.getElementById("users-table-body");

        // Limpia la tabla antes de agregar nuevos usuarios
        usersTableBody.innerHTML = "";

        Users.forEach(user => {
            const row = document.createElement('tr');

            const userNameCell = document.createElement('td');
            userNameCell.textContent = user.name;
            row.appendChild(userNameCell);

            const userEmailCell = document.createElement('td');
            userEmailCell.textContent = user.email;
            row.appendChild(userEmailCell);

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.onclick = () => modificarUsuario(user.id);
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => confirmarEliminarUsuario(user);
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function crearUsuario() {
    window.location.href = "Createuser/createUser.html";   
}

function modificarUsuario(id) {
    // Asegúrate de que el id se pase correctamente en la URL
    window.location.href = `editar/editar.html?id=${id}`; 
}


function confirmarEliminarUsuario(user) {
    const confirmation = confirm(`¿Desea eliminar al usuario: ${user.email}?`);
    if (confirmation) {
        eliminarUsuario(user.id); // Ahora usamos el ID
    }
}

async function eliminarUsuario(id) {
    // Verificar si el id es válido
    if (!id) {
        alert("ID no válido");
        return;
    }
    console.log(id)

    try {
        const response = await fetch(`https://localhost:57199/api/Usuario/Delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });   
        if (response.ok) {
            alert('Usuario eliminado exitosamente');
            GetUsers(); // Recargar la lista de usuarios
        } else {
            const errorData = await response.json();
            alert(`Error al eliminar el usuario: ${errorData.message || "Error desconocido"}`);
        }
    } catch (error) {
        console.error('Error al realizar la eliminación:', error);
        alert('Ocurrió un error al intentar eliminar el usuario.');
    }
}

window.onload = GetUsers; // Asegúrate de que esto esté al final del script
