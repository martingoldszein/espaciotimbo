// ============================================================
// ADMIN - CREDENCIALES (versión simple y funcional)
// ============================================================

// ⚠️ NOTA: En producción, usa autenticación por servidor
const ADMIN_CREDENTIALS = {
  usuario: 'admin',
  contraseña: 'timbó2025'
};

// ============================================================
// RESTA DEL CÓDIGO...
// ============================================================

let productosAdmin = [];
let adminLogueado = false;
let productoEditando = null;

// ============================================================
// LOGIN
// ============================================================

function loginAdmin(event) {
  event.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  console.log('Usuario ingresado:', user);
  console.log('Contraseña ingresada:', pass);
  console.log('Usuario esperado:', ADMIN_CREDENTIALS.usuario);
  console.log('Contraseña esperada:', ADMIN_CREDENTIALS.contraseña);

  if (user === ADMIN_CREDENTIALS.usuario && pass === ADMIN_CREDENTIALS.contraseña) {
    adminLogueado = true;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPanel').hidden = false;
    cargarProductos();
    renderizarAdmin();
    mostrarNotificacion('🔐 Sesión iniciada como administrador');
  } else {
    document.getElementById('loginError').hidden = false;
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
  }
}

function cerrarAdmin() {
  if (confirm('¿Cerrar sesión?')) {
    adminLogueado = false;
    document.getElementById('adminPanel').hidden = true;
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').hidden = true;
    mostrarNotificacion('🔒 Sesión cerrada');
  }
}

// ============================================================
// CARGA DE DATOS
// ============================================================

function cargarProductos() {
  // Intentar cargar desde localStorage primero
  const stored = localStorage.getItem('productos_timbo');
  if (stored) {
    try {
      productosAdmin = JSON.parse(stored);
      return;
    } catch (e) {
      // Si hay error, cargar desde JSON
    }
  }

  // Cargar desde JSON (solo la primera vez)
  fetch('assets/data/productos.json')
    .then(response => response.json())
    .then(data => {
      productosAdmin = data.productos || [];
      guardarProductosEnStorage();
      renderizarAdmin();
    })
    .catch(() => {
      // Si falla, usar datos por defecto inline
      productosAdmin = getDefaultProducts();
      guardarProductosEnStorage();
      renderizarAdmin();
    });
}

function getDefaultProducts() {
  // Datos por defecto en caso de que no se pueda cargar el JSON
  return [
    { id: 1, nombre: 'Aceite de Caléndula', categoria: 'aceites', precio: 450, descripcion: 'Aceite macerado de caléndula, ideal para pieles sensibles y irritadas.', imagen: 'assets/images/productos/aceite-calendula.jpg', stock: true },
    { id: 2, nombre: 'Aceite de Hipérico', categoria: 'aceites', precio: 480, descripcion: 'Aceite de hipérico (hierba de San Juan) para aliviar dolores musculares y articulares.', imagen: 'assets/images/productos/aceite-hiperico.jpg', stock: true },
    { id: 3, nombre: 'Aceite de Rosa Mosqueta', categoria: 'aceites', precio: 520, descripcion: 'Aceite regenerador con vitamina C, ideal para cicatrices y manchas.', imagen: 'assets/images/productos/aceite-rosamosqueta.jpg', stock: false },
    { id: 4, nombre: 'Aceite de Lavanda', categoria: 'aceites', precio: 420, descripcion: 'Aceite esencial de lavanda, relajante y aromático.', imagen: 'assets/images/productos/aceite-lavanda.jpg', stock: true },
    { id: 5, nombre: 'Pomada de Caléndula', categoria: 'pomadas', precio: 380, descripcion: 'Pomada cicatrizante con caléndula y propóleo, para heridas y rozaduras.', imagen: 'assets/images/productos/pomada-calendula.jpg', stock: true },
    { id: 6, nombre: 'Pomada de Manzanilla', categoria: 'pomadas', precio: 350, descripcion: 'Pomada calmante con manzanilla para pieles irritadas.', imagen: 'assets/images/productos/pomada-manzanilla.jpg', stock: true },
    { id: 7, nombre: 'Pomada de Ajo y Propóleo', categoria: 'pomadas', precio: 400, descripcion: 'Pomada antibacteriana para afecciones de la piel.', imagen: 'assets/images/productos/pomada-ajo.jpg', stock: false },
    { id: 8, nombre: 'Pomada de Ruda', categoria: 'pomadas', precio: 360, descripcion: 'Pomada tradicional para dolores musculares y reumáticos.', imagen: 'assets/images/productos/pomada-ruda.jpg', stock: true },
    { id: 9, nombre: 'Jabón de Lavanda', categoria: 'jabones', precio: 280, descripcion: 'Jabón artesanal con aceite de oliva y lavanda, suave y aromático.', imagen: 'assets/images/productos/jabon-lavanda.jpg', stock: true },
    { id: 10, nombre: 'Jabón de Caléndula', categoria: 'jabones', precio: 280, descripcion: 'Jabón suave con caléndula, ideal para pieles sensibles.', imagen: 'assets/images/productos/jabon-calendula.jpg', stock: true },
    { id: 11, nombre: 'Jabón de Romero', categoria: 'jabones', precio: 290, descripcion: 'Jabón estimulante con romero para la piel.', imagen: 'assets/images/productos/jabon-romero.jpg', stock: false },
    { id: 12, nombre: 'Jabón de Aloe Vera', categoria: 'jabones', precio: 300, descripcion: 'Jabón hidratante con aloe vera, para todo tipo de piel.', imagen: 'assets/images/productos/jabon-aloe.jpg', stock: true },
    { id: 13, nombre: 'Tintura de Propóleo', categoria: 'tinturas', precio: 320, descripcion: 'Tintura madre de propóleo, antibacteriano y reforzador del sistema inmune.', imagen: 'assets/images/productos/tintura-propoleo.jpg', stock: true },
    { id: 14, nombre: 'Tintura de Equinácea', categoria: 'tinturas', precio: 350, descripcion: 'Tintura de equinácea para reforzar defensas.', imagen: 'assets/images/productos/tintura-equipacea.jpg', stock: true },
    { id: 15, nombre: 'Tintura de Ajo', categoria: 'tinturas', precio: 310, descripcion: 'Tintura de ajo, antibiótico natural.', imagen: 'assets/images/productos/tintura-ajo.jpg', stock: false },
    { id: 16, nombre: 'Sahúmo de Salvia', categoria: 'sahunos', precio: 250, descripcion: 'Sahúmo de salvia blanca para limpieza energética.', imagen: 'assets/images/productos/sahumo-salvia.jpg', stock: true },
    { id: 17, nombre: 'Sahúmo de Palo Santo', categoria: 'sahunos', precio: 300, descripcion: 'Palo Santo para aromaterapia y meditación.', imagen: 'assets/images/productos/sahumo-palo.jpg', stock: true },
    { id: 18, nombre: 'Sahúmo de Romero', categoria: 'sahunos', precio: 230, descripcion: 'Sahúmo de romero para claridad mental.', imagen: 'assets/images/productos/sahumo-romero.jpg', stock: false },
    { id: 19, nombre: 'Manzanilla', categoria: 'hierbas', precio: 180, descripcion: 'Flores de manzanilla secas, digestivas y relajantes.', imagen: 'assets/images/productos/hierba-manzanilla.jpg', stock: true },
    { id: 20, nombre: 'Menta', categoria: 'hierbas', precio: 160, descripcion: 'Hojas de menta secas, aromáticas y digestivas.', imagen: 'assets/images/productos/hierba-menta.jpg', stock: true },
    { id: 21, nombre: 'Hipérico', categoria: 'hierbas', precio: 200, descripcion: 'Planta de hipérico seca, para infusiones calmantes.', imagen: 'assets/images/productos/hierba-hiperico.jpg', stock: false },
    { id: 22, nombre: 'Romero', categoria: 'hierbas', precio: 170, descripcion: 'Romero seco, estimulante y antioxidante.', imagen: 'assets/images/productos/hierba-romero.jpg', stock: true },
    { id: 23, nombre: 'Semillas de Aromáticas (mix)', categoria: 'semillas', precio: 220, descripcion: 'Mix de semillas de albahaca, perejil, cilantro y eneldo.', imagen: 'assets/images/productos/semillas-aromaticas.jpg', stock: true },
    { id: 24, nombre: 'Plantín de Lavanda', categoria: 'semillas', precio: 350, descripcion: 'Plantín de lavanda para tu jardín o maceta.', imagen: 'assets/images/productos/plantin-lavanda.jpg', stock: true },
    { id: 25, nombre: 'Semillas de Caléndula', categoria: 'semillas', precio: 190, descripcion: 'Semillas de caléndula, flor medicinal y ornamental.', imagen: 'assets/images/productos/semillas-calendula.jpg', stock: false },
    { id: 26, nombre: 'Plantín de Romero', categoria: 'semillas', precio: 320, descripcion: 'Plantín de romero para cultivar en casa.', imagen: 'assets/images/productos/plantin-romero.jpg', stock: true }
  ];
}

function guardarProductosEnStorage() {
  localStorage.setItem('productos_timbo', JSON.stringify(productosAdmin));
}

// ============================================================
// RENDERIZAR ADMIN
// ============================================================

function renderizarAdmin() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  const search = document.getElementById('adminSearch')?.value.toLowerCase() || '';
  const filtrados = productosAdmin.filter(p =>
    p.nombre.toLowerCase().includes(search) ||
    p.categoria.toLowerCase().includes(search)
  );

  // Actualizar estadísticas
  document.getElementById('adminTotal').textContent = productosAdmin.length;
  document.getElementById('adminStock').textContent = productosAdmin.filter(p => p.stock !== false).length;
  document.getElementById('adminSinStock').textContent = productosAdmin.filter(p => p.stock === false).length;

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-empty">No hay productos que coincidan con la búsqueda</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${p.imagen}" alt="${p.nombre}" class="admin-img" onerror="this.src='assets/images/productos/placeholder.jpg'"></td>
      <td><strong>${p.nombre}</strong></td>
      <td><span class="admin-categoria">${p.categoria}</span></td>
      <td>$${p.precio}</td>
      <td>
        <span class="admin-stock-badge ${p.stock !== false ? 'stock-ok' : 'stock-no'}">
          ${p.stock !== false ? '✅ Disponible' : '❌ Sin stock'}
        </span>
      </td>
      <td>
        <button class="admin-action-btn edit" onclick="editarProducto(${p.id})" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button class="admin-action-btn delete" onclick="eliminarProducto(${p.id})" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function filtrarAdmin() {
  renderizarAdmin();
}

// ============================================================
// CRUD - CREAR, EDITAR, ELIMINAR
// ============================================================

function agregarProducto() {
  productoEditando = null;
  document.getElementById('editModalTitle').textContent = '➕ Nuevo Producto';
  document.getElementById('editForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('editModal').hidden = false;
}

function editarProducto(id) {
  const producto = productosAdmin.find(p => p.id === id);
  if (!producto) return;

  productoEditando = producto;
  document.getElementById('editModalTitle').textContent = `✏️ Editar: ${producto.nombre}`;
  document.getElementById('editId').value = producto.id;
  document.getElementById('editNombre').value = producto.nombre;
  document.getElementById('editCategoria').value = producto.categoria;
  document.getElementById('editPrecio').value = producto.precio;
  document.getElementById('editDescripcion').value = producto.descripcion;
  document.getElementById('editImagen').value = producto.imagen || '';
  document.getElementById('editStock').value = producto.stock !== false ? 'true' : 'false';

  document.getElementById('editModal').hidden = false;
}

function cerrarEdit() {
  document.getElementById('editModal').hidden = true;
  productoEditando = null;
}

function guardarProducto(event) {
  event.preventDefault();

  const id = parseInt(document.getElementById('editId').value) || null;
  const nombre = document.getElementById('editNombre').value.trim();
  const categoria = document.getElementById('editCategoria').value;
  const precio = parseInt(document.getElementById('editPrecio').value);
  const descripcion = document.getElementById('editDescripcion').value.trim();
  const imagen = document.getElementById('editImagen').value.trim() || 'assets/images/productos/placeholder.jpg';
  const stock = document.getElementById('editStock').value === 'true';

  if (!nombre || !descripcion || !precio) {
    mostrarNotificacion('⚠️ Todos los campos obligatorios deben estar completos');
    return;
  }

  if (id) {
    // Editar producto existente
    const index = productosAdmin.findIndex(p => p.id === id);
    if (index !== -1) {
      productosAdmin[index] = { ...productosAdmin[index], nombre, categoria, precio, descripcion, imagen, stock };
    }
    mostrarNotificacion(`✅ Producto "${nombre}" actualizado`);
  } else {
    // Crear nuevo producto
    const newId = Math.max(...productosAdmin.map(p => p.id), 0) + 1;
    productosAdmin.push({ id: newId, nombre, categoria, precio, descripcion, imagen, stock });
    mostrarNotificacion(`✅ Producto "${nombre}" creado`);
  }

  guardarProductosEnStorage();
  renderizarAdmin();
  cerrarEdit();
}

function eliminarProducto(id) {
  const producto = productosAdmin.find(p => p.id === id);
  if (!producto) return;

  if (confirm(`¿Eliminar definitivamente "${producto.nombre}"?`)) {
    productosAdmin = productosAdmin.filter(p => p.id !== id);
    guardarProductosEnStorage();
    renderizarAdmin();
    mostrarNotificacion(`🗑️ Producto "${producto.nombre}" eliminado`);
  }
}

// ============================================================
// EXPORTAR / IMPORTAR
// ============================================================

function exportarDatos() {
  const dataStr = JSON.stringify(productosAdmin, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `productos_timbo_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  mostrarNotificacion('📦 Datos exportados');
}

function importarDatos() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          if (confirm(`¿Importar ${data.length} productos? Se reemplazarán los datos actuales.`)) {
            productosAdmin = data;
            guardarProductosEnStorage();
            renderizarAdmin();
            mostrarNotificacion(`📥 ${data.length} productos importados`);
          }
        } else {
          mostrarNotificacion('⚠️ Formato de archivo inválido');
        }
      } catch (err) {
        mostrarNotificacion('⚠️ Error al leer el archivo');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ============================================================
// NOTIFICACIONES
// ============================================================

function mostrarNotificacion(mensaje) {
  document.querySelectorAll('.notificacion-admin').forEach(n => n.remove());
  const notif = document.createElement('div');
  notif.className = 'notificacion-admin';
  notif.textContent = mensaje;
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add('visible'));
  setTimeout(() => {
    notif.classList.remove('visible');
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Ocultar el panel y mostrar login
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('adminPanel').hidden = true;
  document.getElementById('loginError').hidden = true;

  console.log('🔐 Panel de Administración - Espacio Timbó');
  console.log('📝 Credenciales por defecto: admin / timbó2025');
});