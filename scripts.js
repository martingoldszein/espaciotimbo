/* ═══════════════════════════════════════════════════════════════
   ▶ DATOS DE TALLERES Y EVENTOS — EDITAR AQUÍ
   ═══════════════════════════════════════════════════════════════
   Cada objeto es una tarjeta. Campos:
   - tipo:       "taller" | "evento" | "experiencia"
   - titulo:     string
   - desc:       string (descripción corta)
   - fecha:      string (ej. "14 de junio, 2025")
   - hora:       string (ej. "10:00 – 14:00 hs")
   - duracion:   string (ej. "4 horas")
   - cupos:      number | null (null = sin límite)
   - precio:     string (ej. "$ 800" o "Libre aporte")
   - precio_nota: string (ej. "por persona · incluye materiales")
   - badge:      "nuevo" | "pronto" | null
   - agotado:    true | false
   - imagen:     string (URL de imagen) | null
   - whatsapp:   true (abre consulta WhatsApp) | false (usa formulario)
═══════════════════════════════════════════════════════════════ */

const TALLERES_EVENTOS = [
/*  {
    tipo: "taller",
    titulo: "Introducción a la Permacultura",
    desc: "Un día inmersivo en los principios del diseño permacultural. Recorremos el espacio, la huerta y conversamos sobre ética y diseño regenerativo para el hogar y la comunidad.",
    fecha: "22 de junio, 2025",
    hora: "9:00 – 17:00 hs",
    duracion: "1 día",
    cupos: 12,
    precio: "$ 1.200",
    precio_nota: "por persona · incluye almuerzo",
    badge: "nuevo",
    agotado: false,
    imagen: null,
    whatsapp: true
  },
  {
    tipo: "taller",
    titulo: "Bioconstrucción Natural",
    desc: "Aprendemos técnicas de construcción con barro, paja y materiales del entorno. Trabajamos directamente en una estructura del espacio. Apto para todo público, sin experiencia previa.",
    fecha: "5 y 6 de julio, 2025",
    hora: "9:00 – 16:00 hs",
    duracion: "2 días",
    cupos: 8,
    precio: "$ 2.000",
    precio_nota: "por persona · fin de semana completo",
    badge: null,
    agotado: false,
    imagen: null,
    whatsapp: true
  },
  {
    tipo: "experiencia",
    titulo: "Recorrido Agroforestal",
    desc: "Caminata guiada por el sistema agroforestal del Espacio Timbó. Conocemos las plantas, los ciclos del suelo y las estrategias de regeneración aplicadas en el predio.",
    fecha: "Todos los sábados",
    hora: "9:30 hs",
    duracion: "2 horas",
    cupos: 10,
    precio: "Libre aporte",
    precio_nota: "sugerido $ 300 por persona",
    badge: null,
    agotado: false,
    imagen: null,
    whatsapp: true
  },
  {
    tipo: "evento",
    titulo: "Encuentro de Economía Regenerativa",
    desc: "Conversatorio abierto sobre monedas complementarias, economía solidaria y cooperativismo en el contexto rural. Con invitados de la región.",
    fecha: "12 de julio, 2025",
    hora: "16:00 – 19:00 hs",
    duracion: "3 horas",
    cupos: null,
    precio: "Entrada libre",
    precio_nota: "",
    badge: "pronto",
    agotado: false,
    imagen: null,
    whatsapp: false
  },
  {
    tipo: "taller",
    titulo: "Plantas Medicinales del Bosque Nativo",
    desc: "Reconocimiento de plantas medicinales autóctonas, sus usos terapéuticos y culinarios. Incluye preparación de infusiones y aceites.",
    fecha: "19 de julio, 2025",
    hora: "10:00 – 13:00 hs",
    duracion: "3 horas",
    cupos: 15,
    precio: "$ 700",
    precio_nota: "por persona · incluye materiales",
    badge: null,
    agotado: true,
    imagen: null,
    whatsapp: true
  } */
];

/* ═══════════════════════════════════════════════════════════════
   ▶ iCAL — CONFIGURAR URLs de Airbnb
   ═══════════════════════════════════════════════════════════════
   Reemplazá estas URLs con las de tu calendario de Airbnb.
   Airbnb → Anuncio → Calendario → Exportar calendario (iCal)

   NOTA: Los navegadores bloquean peticiones directas a .ics por CORS.
   Para producción, usar un proxy propio o un servicio como:
   https://api.allorigins.win/raw?url=TU_URL_ICAL

   Por ahora el calendario muestra disponibilidad de ejemplo.
═══════════════════════════════════════════════════════════════ */
//const ICAL_URL_YURTA1 = "https://www.airbnb.com/calendar/ical/1267620632342788641.ics?t=28be1aecaa5c4cb1b4213a716fd00a8d&locale=es-XL"; // Ej: "https://www.airbnb.com/calendar/ical/1267620632342788641.ics?t=28be1aecaa5c4cb1b4213a716fd00a8d&locale=es-XL"
//const ICAL_URL_YURTA2 = "https://www.airbnb.com/calendar/ical/47333689.ics?t=2c5799a6fea7496fa0030b5b3e5302bd&locale=es-XL"; // Ej: "https://www.airbnb.com/calendar/ical/47333689.ics?t=2c5799a6fea7496fa0030b5b3e5302bd&locale=es-XL"


/* ═══════════════════════════════════════════════════════════════
   ▶ iCAL — Fetch y parseo de calendarios de Airbnb
═══════════════════════════════════════════════════════════════ */
const ICAL_URL_YURTA1 = 'https://www.airbnb.com/calendar/ical/1267620632342788641.ics?t=28be1aecaa5c4cb1b4213a716fd00a8d&locale=es-XL';
const ICAL_URL_YURTA2 = 'https://www.airbnb.com/calendar/ical/47333689.ics?t=2c5799a6fea7496fa0030b5b3e5302bd&locale=es-XL';

// Acá guardamos los RANGOS ocupados (no solo números de día)
const OCUPADOS_ICAL = {
  yurta1: [], // array de { start: Date, end: Date }
  yurta2: []
};

// Parsea el texto crudo de un .ics y devuelve array de rangos {start, end}
function parseICS(icsText) {
  const rangos = [];
  const eventos = icsText.split('BEGIN:VEVENT').slice(1);

  eventos.forEach(bloque => {
    const dtStartMatch = bloque.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const dtEndMatch   = bloque.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);
    if (!dtStartMatch || !dtEndMatch) return;

    const start = parseFechaICS(dtStartMatch[1]);
    const end   = parseFechaICS(dtEndMatch[1]);
    rangos.push({ start, end });
  });

  return rangos;
}

// Convierte "20250620" a Date(2025, 5, 20)
function parseFechaICS(str) {
  const anio = +str.slice(0, 4);
  const mes  = +str.slice(4, 6) - 1;
  const dia  = +str.slice(6, 8);
  const f = new Date(anio, mes, dia);
  f.setHours(0, 0, 0, 0);
  return f;
}

async function cargarICal(url, yurtaKey) {
  try {
    const proxyUrl = `/.netlify/functions/ics-proxy?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    const data = await res.text();
    OCUPADOS_ICAL[yurtaKey] = parseICS(data);
    renderCalendario(); // re-dibujar una vez que llegan los datos
  } catch (err) {
    console.error(`Error cargando ICS de ${yurtaKey}:`, err);
  }
}

cargarICal(ICAL_URL_YURTA1, 'yurta1');
cargarICal(ICAL_URL_YURTA2, 'yurta2');

/* ═══════════════════════════════════════════════════════════════
   MOTOR — No editar salvo que sepas lo que hacés
═══════════════════════════════════════════════════════════════ */

// ── NAV
const nav = document.getElementById('nav');
document.getElementById('hamburger').addEventListener('click', () => { nav.classList.toggle('open'); });

// ── FORM
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalLabel = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  try {
    const response = await fetch(form.action || '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (!response.ok) throw new Error(`Netlify respondió con ${response.status}`);

    form.reset();
    mostrarModal();
  } catch (error) {
    console.error('Error al enviar la reserva:', error);
    alert('No se pudo enviar la reserva. Intentá nuevamente.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
}

document.getElementById('formularioContacto').addEventListener('submit', handleSubmit);

// ── SCROLL NAV
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(242,234,216,0.97)'
    : 'rgba(242,234,216,0.92)';
});

// ── TALLERES: render
function renderEventos(filtro) {
  const grid = document.getElementById('talleres-grid');
  const items = filtro === 'todos'
    ? TALLERES_EVENTOS
    : TALLERES_EVENTOS.filter(e => e.tipo === filtro);

  if (!items.length) {
    const msg = (filtro === 'todos' || TALLERES_EVENTOS.length === 0)
      ? 'Por el momento no hay talleres ni eventos programados. Seguinos en Instagram para enterarte de las próximas actividades.'
      : 'No hay actividades programadas en esta categoría por el momento.';
    grid.innerHTML = `<div class="talleres-empty">${msg}</div>`;
    return;
  }

  const iconos = {
    fecha: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    hora:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    cupos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    dur:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M12 8v4l3 3"/></svg>`
  };

  const badgeLabels = { nuevo: 'Nuevo', pronto: 'Próximamente' };
  const tipoLabels  = { taller: 'Taller', evento: 'Evento', experiencia: 'Experiencia' };

  grid.innerHTML = items.map(e => {
    const cuposText = e.cupos ? `${e.cupos} cupos` : 'Abierto';
    const msgWA = encodeURIComponent(`Hola! Me interesa el taller "${e.titulo}" (${e.fecha}). ¿Hay lugares disponibles?`);
    const ctaHTML = e.agotado
      ? `<span class="evento-agotado">Cupos agotados</span>`
      : e.whatsapp
        ? `<a href="https://wa.me/59897328615?text=${msgWA}" target="_blank" class="evento-cta">Consultar por WhatsApp</a>`
        : `<a href="#reservas" class="evento-cta">Consultar</a>`;

    return `
    <div class="evento-card" data-tipo="${e.tipo}">
      ${e.imagen
        ? `<img class="evento-card-img" src="${e.imagen}" alt="${e.titulo}">`
        : `<div class="evento-card-img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`}
      <div class="evento-card-body">
        ${e.badge ? `<span class="evento-badge ${e.badge}">${badgeLabels[e.badge]}</span>` : ''}
        <p class="evento-tipo">${tipoLabels[e.tipo] || e.tipo}</p>
        <h3 class="evento-titulo">${e.titulo}</h3>
        <p class="evento-desc">${e.desc}</p>
        <div class="evento-meta">
          <div class="evento-meta-item">${iconos.fecha}<span>${e.fecha}</span></div>
          <div class="evento-meta-item">${iconos.hora}<span>${e.hora}</span></div>
          <div class="evento-meta-item">${iconos.dur}<span>${e.duracion}</span></div>
          <div class="evento-meta-item">${iconos.cupos}<span>${cuposText}</span></div>
        </div>
        <p class="evento-precio">${e.precio} <span>${e.precio_nota}</span></p>
        ${ctaHTML}
      </div>
    </div>`;
  }).join('');
}

function filtrarEventos(filtro, btn) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEventos(filtro);
}

// ── MINI CALENDARIO INTERACTIVO
const calState = {
  yurta: 1,
  mes: new Date().getMonth(),
  anio: new Date().getFullYear(),
  inicio: null,
  fin: null,
  hover: null
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

function fechaNorm(a, m, d) {
  const f = new Date(a, m, d); f.setHours(0,0,0,0); return f;
}
function hoyNorm() {
  const h = new Date(); h.setHours(0,0,0,0); return h;
}

function ocupadosDeYurta(y) {
  return (y === 1 ? OCUPADOS_ICAL.yurta1 : OCUPADOS_ICAL.yurta2) || [];
}

function esDiaOcupado(d, m, a) {
  const hoy = hoyNorm();
  const fecha = fechaNorm(a, m, d);
  if (fecha < hoy) return false;

  const rangos = ocupadosDeYurta(calState.yurta);
  // Airbnb marca DTEND como el día de checkout (no ocupado esa noche),
  // por eso el chequeo es fecha >= start && fecha < end
  return rangos.some(r => fecha >= r.start && fecha < r.end);
}



function rangoTieneOcupados(ini, fin) {
  let cur = new Date(ini); cur.setDate(cur.getDate()+1); cur.setHours(0,0,0,0);
  while (cur < fin) {
    if (esDiaOcupado(cur.getDate(), cur.getMonth(), cur.getFullYear())) return true;
    cur.setDate(cur.getDate()+1);
  }
  return false;
}
function formatoFecha(f) {
  if (!f) return '—';
  return `${f.getDate()} ${MESES[f.getMonth()].slice(0,3)} ${f.getFullYear()}`;
}
function formatoISO(f) {
  if (!f) return '';
  return `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}-${String(f.getDate()).padStart(2,'0')}`;
}

function actualizarResumenYForm() {
  const { inicio, fin } = calState;
  const n = (inicio && fin) ? Math.round((fin-inicio)/86400000) : null;

  document.getElementById('resumen-llegada').textContent = formatoFecha(inicio);
  document.getElementById('resumen-salida').textContent  = formatoFecha(fin);
  document.getElementById('resumen-noches').textContent  = n !== null ? n+(n===1?' noche':' noches') : '—';

  document.getElementById('display-llegada').value = inicio ? formatoFecha(inicio) : '';
  document.getElementById('display-salida').value  = fin    ? formatoFecha(fin)    : '';
  document.getElementById('display-noches').value  = n !== null ? n : '';
  document.getElementById('llegada').value = formatoISO(inicio);
  document.getElementById('salida').value  = formatoISO(fin);
}

function renderCalendario() {
  const container = document.getElementById('cal-principal');
  if (!container) return;

  const { mes, anio, inicio, fin, hover } = calState;
  const primerDia = new Date(anio, mes, 1).getDay();
  const ajuste    = primerDia === 0 ? 6 : primerDia - 1;
  const diasMes   = new Date(anio, mes+1, 0).getDate();
  const hoy       = hoyNorm();

  let html = `
    <div class="mini-cal-nav">
      <button data-nav="-1">‹</button>
      <span class="mini-cal-month">${MESES[mes]} ${anio}</span>
      <button data-nav="1">›</button>
    </div>
    <div class="mini-cal-grid" id="cal-grid">
      ${DIAS_SEMANA.map(d=>`<div class="mini-cal-day-header">${d}</div>`).join('')}
      ${Array(ajuste).fill('<div class="mini-cal-day empty"></div>').join('')}`;

  for (let d = 1; d <= diasMes; d++) {
    const fecha   = fechaNorm(anio, mes, d);
    const pasado  = fecha < hoy;
    const ocupado = esDiaOcupado(d, mes, anio);
    const esHoy   = fecha.getTime() === hoy.getTime();
    const esInicio = inicio && fecha.getTime() === inicio.getTime();
    const esFin    = fin   && fecha.getTime() === fin.getTime();

    // Para el preview del hover, usarlo solo si está después del inicio
    const hoverValido = hover && inicio && hover > inicio;
    const esHoverFin  = hoverValido && fecha.getTime() === hover.getTime();
    // Rango: entre inicio y fin real; si hay hover reemplaza el fin para preview
    const limiteRango = hoverValido ? hover : fin;
    const enRango     = inicio && limiteRango && fecha > inicio && fecha < limiteRango;

    let cls = 'mini-cal-day';
    if      (pasado)    cls += ' pasado';
    else if (ocupado)   cls += ' ocupado';
    else if (esInicio)  cls += ' inicio';
    else if (esFin)     cls += ' fin';
    else if (esHoverFin)cls += ' fin-preview';
    else if (enRango)   cls += ' rango';
    else                cls += ' libre';

    if (esHoy && !esInicio && !esFin) cls += ' today';

    // data-d para los event listeners — sin onclick inline
    const attrs = (!pasado && !ocupado) ? `data-d="${d}" data-m="${mes}" data-a="${anio}"` : '';
    html += `<div class="${cls}" ${attrs}>${d}</div>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

// Listeners adjuntados UNA SOLA VEZ al inicializar — no dentro de renderCalendario
function initCalListeners() {
  const container = document.getElementById('cal-principal');

  // Click en días
  container.addEventListener('click', function(e) {
    // Botones de navegación de mes
    const nav = e.target.closest('[data-nav]');
    if (nav) { calNavMes(+nav.dataset.nav); return; }

    // Días clickeables
    const el = e.target.closest('[data-d]');
    if (!el) return;
    manejarClick(+el.dataset.d, +el.dataset.m, +el.dataset.a);
  });

  // Hover — solo actualiza estado y redibuja, no re-adjunta listeners
  container.addEventListener('mouseover', function(e) {
    if (!calState.inicio) return;
    const el = e.target.closest('[data-d]');
    if (!el) return;
    const nueva = fechaNorm(+el.dataset.a, +el.dataset.m, +el.dataset.d);
    if (!calState.hover || calState.hover.getTime() !== nueva.getTime()) {
      calState.hover = nueva;
      renderCalendario();
    }
  });

  container.addEventListener('mouseleave', function() {
    if (calState.hover) {
      calState.hover = null;
      renderCalendario();
    }
  });
}

function manejarClick(d, m, a) {
  const fecha = fechaNorm(a, m, d);
  const err = document.getElementById('cal-error');
  err.style.display = 'none';
  calState.hover = null; // limpiar hover antes de cualquier lógica

  if (!calState.inicio) {
    // Primer click: fijar llegada
    calState.inicio = fecha;
    calState.fin    = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  if (fecha.getTime() === calState.inicio.getTime()) {
    // Mismo día: cancelar todo
    calState.inicio = null;
    calState.fin    = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  if (fecha < calState.inicio) {
    // Antes del inicio: nuevo inicio
    calState.inicio = fecha;
    calState.fin    = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  // Después del inicio: fijar salida
  if (rangoTieneOcupados(calState.inicio, fecha)) {
    err.textContent = 'El rango incluye días no disponibles. Elegí otras fechas.';
    err.style.display = 'block';
    renderCalendario();
    return;
  }

  const noches = Math.round((fecha - calState.inicio) / 86400000);
  if (noches < 2) {
    err.textContent = 'La estadía mínima es de 2 noches.';
    err.style.display = 'block';
    renderCalendario();
    return;
  }

  calState.fin = fecha;
  renderCalendario();
  actualizarResumenYForm();
}

function calNavMes(dir) {
  calState.mes += dir;
  if (calState.mes > 11) { calState.mes = 0; calState.anio++; }
  if (calState.mes < 0)  { calState.mes = 11; calState.anio--; }
  renderCalendario();
}

function seleccionarYurta(n) {
  calState.yurta  = n;
  calState.inicio = null; calState.fin = null; calState.hover = null;
  document.getElementById('cal-error').style.display = 'none';
  document.getElementById('cal-yurta-label').textContent = `Yurta ${n}`;
  document.getElementById('btn-yurta1').classList.toggle('active', n === 1);
  document.getElementById('btn-yurta2').classList.toggle('active', n === 2);
  document.getElementById('display-yurta').value = `Yurta ${n}`;
  document.getElementById('yurta').value = `Yurta ${n}`;
  renderCalendario();
  actualizarResumenYForm();
}

// ── PAGO
function cambiarRegion(region, btn) {
  document.querySelectorAll('.pago-region-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pago-metodos').forEach(m => m.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('metodos-' + region).classList.add('active');
  // Limpiar método seleccionado al cambiar región
  document.querySelectorAll('.pago-metodo-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('metodo-pago').value = '';
}

function elegirPago(btn, metodo) {
  // Deseleccionar todos los botones del grupo activo
  btn.closest('.pago-metodos').querySelectorAll('.pago-metodo-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('metodo-pago').value = metodo;
}

// ── INIT
(function init() {
  renderEventos('todos');
  document.getElementById('display-yurta').value = 'Yurta 1';
  document.getElementById('yurta').value = 'Yurta 1';
  renderCalendario();
  initCalListeners();
  actualizarResumenYForm();
})();

    // Función para mostrar el modal
    function mostrarModal() {
      document.getElementById('modalGracias').hidden = false;
    }

    // Función para cerrar el modal
    function cerrarModal() {
      document.getElementById('modalGracias').hidden = true;
    }

    // Cerrar modal al hacer clic fuera de él
    window.onclick = function(event) {
        const modal = document.getElementById('modalGracias');
        if (event.target === modal) {
          modal.hidden = true;
        }
    };

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarModal();
        }
    });

    document.getElementById('cerrarModal').addEventListener('click', cerrarModal);
