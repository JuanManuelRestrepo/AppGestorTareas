// Mostrar y ocultar formularios
const mostrarFormularioCrear = () => {
  document.getElementById('formularioCrearProyecto').style.display = 'block';
};

const ocultarFormularioCrear = () => {
  document.getElementById('formularioCrearProyecto').style.display = 'none';
};

const mostrarFormularioActualizar = (proyecto) => {
  document.getElementById('idProyecto').value = proyecto.id;
  document.getElementById('nombreActualizar').value = proyecto.nombre;
  document.getElementById('formularioActualizarProyecto').style.display = 'block';
};

const ocultarFormularioActualizar = () => {
  document.getElementById('formularioActualizarProyecto').style.display = 'none';
};


const cargarUsuariosCrear = async () => {
  try {
    const response = await fetch('https://localhost:57199/api/Usuario/GetUsuariosProyectos'); // Suponiendo que tienes un endpoint para obtener usuarios
    if (response.ok) {
      const usuarios = await response.json();
      const selectUsuarios = document.getElementById('Usuarios');
      console.log(usuarios)
      
      // Limpiar las opciones anteriores
      selectUsuarios.innerHTML = '';

      // Agregar las opciones de usuarios
      usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id; // Suponiendo que cada usuario tiene un id único
        option.text = usuario.name; // Suponiendo que cada usuario tiene un nombre
        selectUsuarios.appendChild(option);
      });
    } else {
      console.error('Error al obtener usuarios');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

document.addEventListener('DOMContentLoaded', cargarUsuariosCrear);

const crearProyecto = async (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  // Obtener los usuarios seleccionados como lista de GUIDs
  const usuariosId = Array.from(document.getElementById('Usuarios').selectedOptions)
                          .map(option => option.value); // Lista de GUIDs seleccionados

  // Construir el objeto JSON
  const proyectoData = {
    nombre: nombre,
    usuariosId: usuariosId // Asegúrate de que coincida con el DTO en el backend
  };

  try {
    // Verifica que el JSON está bien formado antes de enviarlo
    console.log('Enviando JSON:', JSON.stringify(proyectoData)); 

    const response = await fetch('https://localhost:57199/api/Proyecto/CrearProyecto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proyectoData), // Convertir el objeto a JSON
    });

    if (response.ok) {
      alert('Proyecto creado exitosamente');
      obtenerProyectos(); // Actualiza la lista de proyectos
      ocultarFormularioCrear(); // Oculta el formulario de creación
    } else {
      console.error('Error al crear proyecto:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



// Actualizar proyecto
const actualizarProyecto = async (event) => {
  event.preventDefault();

  const id = document.getElementById('idProyecto').value;
  const nombre = document.getElementById('nombreActualizar').value;

  // Obtener los usuarios seleccionados como lista de GUIDs
  const usuariosId = Array.from(document.getElementById('usuariosActualizar').selectedOptions)
                          .map(option => option.value); // Lista de GUIDs seleccionados

  // Construir el objeto JSON
  const proyectoData = {
    nombre: nombre,
    usuariosId: usuariosId // Asegúrate de que coincida con el DTO en el backend
  };

  try {
    // Verifica que el JSON está bien formado antes de enviarlo
    console.log('Enviando JSON:', JSON.stringify(proyectoData)); 

    const response = await fetch(`https://localhost:57199/api/Proyecto/ActualizarProyecto/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proyectoData), // Convertir el objeto a JSON
    });

    if (response.ok) {
      alert('Proyecto actualizado exitosamente');
      obtenerProyectos(); // Actualiza la lista de proyectos
      ocultarFormularioActualizar(); // Oculta el formulario de actualización
    } else {
      console.error('Error al actualizar proyecto:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


// Obtener usuarios y llenar el campo de selección
const cargarUsuariosActualizar = async () => {
  try {
    const response = await fetch('https://localhost:57199/api/Usuario/GetUsuariosProyectos'); // Suponiendo que tienes un endpoint para obtener usuarios
    if (response.ok) {
      const usuarios = await response.json();
      const selectUsuarios = document.getElementById('usuariosActualizar');
      
      
      // Limpiar las opciones anteriores
      selectUsuarios.innerHTML = '';

      // Agregar las opciones de usuarios
      usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id; // Suponiendo que cada usuario tiene un id único
        option.text = usuario.name; // Suponiendo que cada usuario tiene un nombre
        selectUsuarios.appendChild(option);
      });
    } else {
      console.error('Error al obtener usuarios');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Llamar a la función para cargar los usuarios cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarUsuariosActualizar);











// Obtener proyectos
const obtenerProyectos = async () => {
  try {
    const response = await fetch('https://localhost:57199/api/Proyecto/GetAll');
    if (response.ok) {
      const proyectos = await response.json();
      mostrarProyectos(proyectos); // Muestra los proyectos en la interfaz
    } else {
      console.error('Error al obtener proyectos');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Mostrar proyectos
const mostrarProyectos = (proyectos) => {
  const proyectosList = document.getElementById('proyectosList');
  proyectosList.innerHTML = ''; // Limpia la lista de proyectos

  proyectos.forEach(proyecto => {
    const card = document.createElement('div');
    card.classList.add('proyecto-card');
    card.innerHTML = `
      <div class="proyecto-name">${proyecto.nombre}</div>
      <div class="proyecto-description">${proyecto.descripcion}</div>
      <div class="proyecto-buttons">
        <button onclick='mostrarFormularioActualizar(${JSON.stringify(proyecto)})'>Actualizar</button>
        <button class="eliminar" onclick='eliminarProyecto("${proyecto.id}")'>Eliminar</button>
      </div>
    `;
    proyectosList.appendChild(card); // Añade la tarjeta de proyecto a la lista
  });
};

// Eliminar proyecto
const eliminarProyecto = async (id) => {
  try {
    const response = await fetch(`https://localhost:57199/api/Proyecto/Borrar/${id}`, { method: 'DELETE' });
    if (response.ok) {
      alert('Proyecto eliminado');
      obtenerProyectos(); // Actualiza la lista de proyectos
    } else {
      console.error('Error al eliminar proyecto');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Eventos
document.getElementById('crearProyectoBtn').addEventListener('click', mostrarFormularioCrear); // Muestra el formulario de creación
document.getElementById('cancelarCrearProyecto').addEventListener('click', ocultarFormularioCrear); // Cancela la creación de proyecto
document.getElementById('formProyecto').addEventListener('submit', crearProyecto); // Envía el formulario de creación
document.getElementById('formActualizarProyecto').addEventListener('submit', actualizarProyecto); // Envía el formulario de actualización
document.getElementById('cancelarActualizarProyecto').addEventListener('click', ocultarFormularioActualizar); // Cancela la actualización

// Inicialización: obtiene la lista de proyectos cuando la página se carga
document.addEventListener('DOMContentLoaded', obtenerProyectos);
