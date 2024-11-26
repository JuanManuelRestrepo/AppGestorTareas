document.addEventListener("DOMContentLoaded", function () {
    const formularioTarea = document.getElementById('formularioTarea');
    const cancelarCrearTarea = document.getElementById('cancelarCrearTarea');
    const nombreProyectoElement = document.getElementById("nombreProyecto");
    const usuariosListElement = document.getElementById("usuariosList");
    const tareasListElement = document.getElementById("tareasList");
    const mostrarFormularioBtn = document.getElementById("mostrarFormularioBtn");
    const crearTareaForm = document.getElementById("crearTareaForm");
    const responsablesSelect = document.getElementById("responsables");

    const formularioActualizarTarea = document.getElementById('formularioActualizarTarea');
    const actualizarTareaForm = document.getElementById('actualizarTareaForm');
    const cancelarActualizarTarea = document.getElementById('cancelarActualizarTarea');
    const responsablesActualizarSelect = document.getElementById("responsablesActualizar");

    // Obtener el ID del proyecto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const proyectoId = urlParams.get('id');

    if (!proyectoId) {
        alert("El ID del proyecto es requerido.");
        return;
    }

    // Cargar el nombre del proyecto
    async function cargarNombreProyecto(proyectoId) {
        try {
            const response = await fetch(`https://localhost:57199/api/Proyecto/ProyectoById/${proyectoId}`);
            if (!response.ok) throw new Error(`Error al cargar el proyecto. Estado: ${response.status}`);
            const proyecto = await response.json();
            nombreProyectoElement.textContent = proyecto.nombre || "Proyecto sin nombre";
        } catch (error) {
            console.error("Error al cargar el nombre del proyecto:", error);
            alert("Ocurrió un error al cargar el nombre del proyecto.");
        }
    }

    // Cargar usuarios del proyecto
    async function cargarUsuariosProyecto(proyectoId) {
        try {
            const response = await fetch(`https://localhost:57199/api/Usuario/Proyecto/${proyectoId}/Usuarios`);
            if (!response.ok) throw new Error(`Error al cargar los usuarios. Estado: ${response.status}`);
            const usuarios = await response.json();
            usuariosListElement.innerHTML = usuarios.map(usuario => `<li>${usuario.name}</li>`).join('');
            const optionsHTML = usuarios.map(usuario => `<option value="${usuario.id}">${usuario.name}</option>`).join('');
            responsablesSelect.innerHTML = optionsHTML;
            responsablesActualizarSelect.innerHTML = optionsHTML;
        } catch (error) {
            console.error("Error al cargar los usuarios del proyecto:", error);
        }
    }

    // Cargar las tareas del proyecto
    async function cargarTareas() {
        try {
            const response = await fetch(`https://localhost:57199/api/Tarea/TareaProyecto?proyectoId=${proyectoId}`);
            if (!response.ok) throw new Error(`Error al cargar las tareas. Estado: ${response.status}`);
            const tareas = await response.json();
            tareasListElement.innerHTML = tareas.map(tarea => `
                <li>
                    <strong>${tarea.nombre}</strong><br>
                    Descripción: ${tarea.descripcion}<br>
                    Fecha Inicio: ${tarea.fechaInicio} <br>
                    Fecha Fin: ${tarea.fechaFin}<br>
                    Estado: ${obtenerEstadoTarea(tarea.estado)}<br>
                    <button data-tarea-id="${tarea.id}" class="editarTareaBtn">Editar</button>
                    <button data-tarea-id="${tarea.id}" class="eliminarTareaBtn">Eliminar</button>
                </li>
            `).join('');

            document.querySelectorAll('.editarTareaBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const tareaId = this.getAttribute('data-tarea-id');
                    mostrarFormularioActualizarTarea(tareaId);
                });
            });

            document.querySelectorAll('.eliminarTareaBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const tareaId = this.getAttribute('data-tarea-id');
                    eliminarTarea(tareaId);
                });
            });
        } catch (error) {
            console.error("Error al cargar las tareas:", error);
        }
    }

    function obtenerEstadoTarea(estado) {
        switch (estado) {
            case 0: return 'Abierta';
            case 1: return 'Suspendida';
            case 2: return 'Cerrada';
            default: return 'Desconocido';
        }
    }

    async function mostrarFormularioActualizarTarea(tareaId) {
        try {
            const response = await fetch(`https://localhost:57199/api/Tarea/GetTareaById/${tareaId}`);
            if (!response.ok) throw new Error(`Error al cargar la tarea. Estado: ${response.status}`);
            const tarea = await response.json();

            document.getElementById("tareaId").value = tarea.id;
            document.getElementById("nombreTareaActualizar").value = tarea.nombre;
            document.getElementById("descripcionTareaActualizar").value = tarea.descripcion;
            document.getElementById("fechaInicioActualizar").value = tarea.fechaInicio;
            document.getElementById("fechaFinActualizar").value = tarea.fechaFin;
            document.getElementById("estadoActualizar").value = tarea.estado;
            responsablesActualizarSelect.value = tarea.responsables.map(r => r.id).join(',');

            formularioActualizarTarea.style.display = "block";
        } catch (error) {
            console.error("Error al cargar los datos de la tarea:", error);
        }
    }

    async function eliminarTarea(id) {
        const url = `https://localhost:57199/api/Tarea/BorrarTarea/${id}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error('No se pudo eliminar la tarea.');
            alert('Tarea eliminada exitosamente.');
            cargarTareas();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            alert('Hubo un error al eliminar la tarea.');
        }
    }

    async function crearTarea(tareaData) {
        try {
            const response = await fetch("https://localhost:57199/api/Tarea/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tareaData)
            });
            if (!response.ok) throw new Error(`Error al crear la tarea. Estado: ${response.status}`);
            alert("Tarea creada con éxito.");
            formularioTarea.style.display = "none";
            cargarTareas();
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    }

    async function actualizarTarea(tareaData) {
        try {
            const response = await fetch(`https://localhost:57199/api/Tarea/actualizar/${tareaData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tareaData)
            });
            if (!response.ok) throw new Error(`Error al actualizar la tarea. Estado: ${response.status}`);
            alert("Tarea actualizada con éxito");
            formularioActualizarTarea.style.display = "none";
            cargarTareas();
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    }

    mostrarFormularioBtn.addEventListener("click", () => {
        formularioTarea.style.display = formularioTarea.style.display === "none" ? "block" : "none";
    });

    cancelarCrearTarea.addEventListener("click", () => {
        formularioTarea.style.display = "none";
    });

    cancelarActualizarTarea.addEventListener("click", () => {
        formularioActualizarTarea.style.display = "none";
    });

    crearTareaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(crearTareaForm);
        const tareaData = {
            nombre: formData.get("nombreTarea"),
            descripcion: formData.get("descripcionTarea"),
            fechaInicio: formData.get("fechaInicio"),
            fechaFin: formData.get("fechaFin"),
            proyectoId: proyectoId,
            estado: 0,
            idsResponsables: Array.from(formData.getAll("responsables"))
        };
        crearTarea(tareaData);
    });

    actualizarTareaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const tareaData = {
            id: event.target.tareaId.value,
            nombre: event.target.nombreTareaActualizar.value,
            descripcion: event.target.descripcionTareaActualizar.value,
            fechaInicio: event.target.fechaInicioActualizar.value,
            fechaFin: event.target.fechaFinActualizar.value,
            estado: parseInt(event.target.estadoActualizar.value), 
            proyectoId,
            idsResponsables: responsablesActualizarSelect.value ? responsablesActualizarSelect.value.split(',') : []  // Si no hay responsables seleccionados, se envía una lista vacía
        };
        actualizarTarea(tareaData);
    });

    // Cargar datos iniciales
    cargarNombreProyecto(proyectoId);
    cargarUsuariosProyecto(proyectoId);
    cargarTareas();
});
