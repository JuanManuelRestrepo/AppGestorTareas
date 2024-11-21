const UrlApi = "https://localhost:57199/api/Usuarios/GetAllUsuarios`";

async function GetUsers() {
    try {
        const response = await fetch(UrlApi);
        const Users = await response.json();

        const usersTableBody = document.getElementById("users-table-body"); // Asegúrate de que esto sea correcto

        Users.forEach(user => {
            const row = document.createElement('tr');

            const userIdCell = document.createElement('td');
            userIdCell.textContent = user.id;
            row.appendChild(userIdCell);

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
    window.location.href = `editar.html?id=${id}`; // Usa comillas invertidas aquí
}

function confirmarEliminarUsuario(user) {
    const confirmation = confirm(`¿Desea eliminar al usuario: ${user.email}?`); // Usa comillas invertidas aquí
    if (confirmation) {
        eliminarUsuario(user.email);
    }
}



async function eliminarUsuario(id) {

    try {
        const data= {
            id: id
        }
        
        console.log(id)
        const response = await fetch(`https://localhost:57199/api/Proyecto/Actualizar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

