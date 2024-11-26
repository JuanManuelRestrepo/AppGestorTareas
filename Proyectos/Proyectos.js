// --- Mostrar y Ocultar Formularios ---
const mostrarFormularioCrear = () => {
  document.getElementById('formularioCrearProyecto').style.display = 'block';
};

const ocultarFormularioCrear = () => {
  document.getElementById('formularioCrearProyecto').style.display = 'none';
};

const mostrarFormularioActualizar = (proyecto) => {
  document.getElementById('idProyecto').value = proyecto.id;
  document.getElementById('nombreActualizar').value = proyecto.nombre;
  cargarUsuariosEnFormulario('usuariosActualizar', proyecto.usuarios); // Seleccionar usuarios del proyecto
  document.getElementById('formularioActualizarProyecto').style.display = 'block';
};

const ocultarFormularioActualizar = () => {
  document.getElementById('formularioActualizarProyecto').style.display = 'none';
};

// --- Cargar Usuarios Dinámicamente ---
const cargarUsuariosEnFormulario = async (selectId, usuariosSeleccionados = []) => {
  try {
    const response = await fetch('https://localhost:57199/api/Usuario/GetUsuariosProyectos');
    if (response.ok) {
      const usuarios = await response.json();
      const selectElement = document.getElementById(selectId);
      selectElement.innerHTML = ''; // Limpiar opciones previas

      usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.name;
        if (usuariosSeleccionados.includes(usuario.id)) {
          option.selected = true; // Marcar usuarios previamente seleccionados
        }
        selectElement.appendChild(option);
      });
    } else {
      console.error('Error al cargar usuarios:', await response.text());
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};

// --- Crear Proyecto ---
const crearProyecto = async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const usuariosId = Array.from(document.getElementById('usuariosCrear').selectedOptions)
    .map(option => option.value);

  const proyectoData = { nombre, usuariosId };

  try {
    const response = await fetch('https://localhost:57199/api/Proyecto/CrearProyecto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proyectoData),
    });

    if (response.ok) {
      alert('Proyecto creado exitosamente');
      obtenerProyectos(); // Actualizar lista
      ocultarFormularioCrear();
    } else {
      console.error('Error al crear proyecto:', await response.text());
    }
  } catch (error) {
    console.error('Error al crear proyecto:', error);
  }
};

// --- Actualizar Proyecto ---
const actualizarProyecto = async (event) => {
  event.preventDefault();
  const id = document.getElementById('idProyecto').value;
  const nombre = document.getElementById('nombreActualizar').value;
  const usuariosId = Array.from(document.getElementById('usuariosActualizar').selectedOptions)
    .map(option => option.value);

  const proyectoData = { nombre, usuariosId };

  try {
    const response = await fetch(`https://localhost:57199/api/Proyecto/ActualizarProyecto/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proyectoData),
    });

    if (response.ok) {
      alert('Proyecto actualizado exitosamente');
      obtenerProyectos(); // Actualizar lista
      ocultarFormularioActualizar();
    } else {
      console.error('Error al actualizar proyecto:', await response.text());
    }
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
  }
};

// --- Eliminar Proyecto ---
const eliminarProyecto = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    try {
      const response = await fetch(`https://localhost:57199/api/Proyecto/Borrar/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Proyecto eliminado exitosamente');
        obtenerProyectos(); // Actualizar lista
      } else {
        console.error('Error al eliminar proyecto:', await response.text());
      }
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  }
};

// --- Obtener y Mostrar Proyectos ---
const obtenerProyectos = async () => {
  try {
    const response = await fetch('https://localhost:57199/api/Proyecto/GetAll');
    if (response.ok) {
      const proyectos = await response.json();
      mostrarProyectos(proyectos);
    } else {
      console.error('Error al obtener proyectos:', await response.text());
    }
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
  }
};

const mostrarProyectos = (proyectos) => {
  const proyectosList = document.getElementById('proyectosList');
  proyectosList.innerHTML = ''; // Limpiar lista

  proyectos.forEach(proyecto => {
    const card = document.createElement('div');
    card.classList.add('proyecto-card');
    card.innerHTML = `
      <div class="proyecto-name">
        <a href="/Proyectos/DetallesProyecto/Tareas.html?id=${proyecto.id}" class="proyecto-enlace">
          ${proyecto.nombre}
        </a>
      </div>
      <div class="proyecto-buttons">
        <button onclick='mostrarFormularioActualizar(${JSON.stringify(proyecto)})'>Actualizar</button>
        <button class="eliminar" onclick='eliminarProyecto("${proyecto.id}")'>Eliminar</button>
      </div>
    `;
    proyectosList.appendChild(card);
  });
};

// --- Inicializar Eventos ---
document.getElementById('crearProyectoBtn').addEventListener('click', mostrarFormularioCrear);
document.getElementById('cancelarCrearProyecto').addEventListener('click', ocultarFormularioCrear);
document.getElementById('formProyecto').addEventListener('submit', crearProyecto);
document.getElementById('formActualizarProyecto').addEventListener('submit', actualizarProyecto);
document.getElementById('cancelarActualizarProyecto').addEventListener('click', ocultarFormularioActualizar);

// --- Cargar Usuarios y Proyectos al Iniciar ---
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuariosEnFormulario('usuariosCrear');
  obtenerProyectos();
});
