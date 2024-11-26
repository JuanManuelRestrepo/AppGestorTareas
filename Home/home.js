// home.js

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.querySelector('.main-content');
    
    // Cambiar el estado activo de la barra lateral
    sidebar.classList.toggle('active');
    
    // Ajustar el margen del contenido principal
    mainContent.classList.toggle('sidebar-active');
}
