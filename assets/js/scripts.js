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
   - linkURL:    string (URL externa para detalle o publicación)
   - whatsapp:   true (abre consulta WhatsApp) | false (usa formulario)
═══════════════════════════════════════════════════════════════ */

const TALLERES_EVENTOS = [
  {
    tipo: "experiencia",
    titulo: "Retiro Vivencial: Retorno al Origen",
    desc: "• Ceremonia de Rapé, Rezo de Tabaco y Cantos Ancestrales alrededor del Fuego\n• Limpieza e Inmersión con Sahumos\n • Ceremonia con Plantas Maestras",
    fecha: "Sábado 19 de Septiembre",
    hora: " 10:00 hs",
    duracion: "1 día",
    cupos: "0",
    precio: "",
    precio_nota: "por persona · incluye almuerzo",
    badge: "nuevo",
    agotado: false,
    linkURL:"https://www.instagram.com/p/DagfVcWlZD7/?img_index=1",
    imagen: "../assets/images/experiencia1.png",
    whatsapp: true
  }
  /*,
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
const navLinks = document.querySelectorAll('#nav ul a');
document.getElementById('hamburger').addEventListener('click', () => { nav.classList.toggle('open'); });

function cerrarMenuMovil() {
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
  }
}

function activarLinkNav(link) {
  navLinks.forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    activarLinkNav(this);
    cerrarMenuMovil();
  });
});

function activarLinkPorHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const link = document.querySelector(`#nav ul a[href="${hash}"]`);
  if (link) activarLinkNav(link);
}

function activarLinkPorSection(sectionId) {
  const link = document.querySelector(`#nav ul a[href="#${sectionId}"]`);
  if (link) activarLinkNav(link);
}

function setupScrollSpy() {
  const sectionLinks = Array.from(navLinks).filter(a => a.hash.startsWith('#'));
  const sections = sectionLinks
    .map(a => document.getElementById(a.hash.slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.sort((a, b) => a.target.offsetTop - b.target.offsetTop);
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activarLinkPorSection(entry.target.id);
      }
    });
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));
}

function setupSectionTitleReveal() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-animated');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px'
  });

  titles.forEach(title => observer.observe(title));
}

window.addEventListener('load', () => {
  activarLinkPorHash();
  setupScrollSpy();
  setupSectionTitleReveal();
});
window.addEventListener('hashchange', activarLinkPorHash);

// ── HERO SLIDESHOW
function setupHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  slides[currentIndex].classList.add('is-active');

  setInterval(() => {
    const currentSlide = slides[currentIndex];
    currentSlide.classList.remove('is-active');

    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('is-active');
  }, 4500);
}

window.addEventListener('load', setupHeroSlideshow);

// ── GLAMPING SLIDESHOW
function setupGlampingSlideshow() {
  const slides = document.querySelectorAll('.glamping-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  slides[currentIndex].classList.add('is-active');

  setInterval(() => {
    const currentSlide = slides[currentIndex];
    currentSlide.classList.remove('is-active');

    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('is-active');
  }, 4200);
}

window.addEventListener('load', setupGlampingSlideshow);

// ── SLIDESHOWS DE YURTAS
function activarSlide(slideshow, index) {
  const slides = slideshow.querySelectorAll('.yurta-slide');
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });
}

function setupYurtaSlideshow(slideshow) {
  const slides = slideshow.querySelectorAll('.yurta-slide');
  if (!slides.length) return;

  let currentIndex = Number(slideshow.dataset.startIndex || 0);
  currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));
  activarSlide(slideshow, currentIndex);

  const prevBtn = slideshow.querySelector('.yurta-slide-btn.prev');
  const nextBtn = slideshow.querySelector('.yurta-slide-btn.next');

  let touchStartX = 0;
  let touchEndX = 0;

  slideshow.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  slideshow.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) < 40) return;

    if (delta < 0) {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    activarSlide(slideshow, currentIndex);
  }, { passive: true });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    activarSlide(slideshow, currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    activarSlide(slideshow, currentIndex);
  });
}

document.querySelectorAll('.yurta-slideshow').forEach(setupYurtaSlideshow);

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
    const cuposText = e.cupos ? `${e.cupos} cupos` : '';
    const msgWA = encodeURIComponent(`Hola! Me interesa el taller "${e.titulo}" (${e.fecha}). ¿Hay lugares disponibles?`);
    const descHTML = (e.desc || '').replace(/\r?\n/g, '<br>');
    const linkHTML = e.linkURL
      ? `<a href="${e.linkURL}" target="_blank" rel="noopener noreferrer" class="evento-link"><i class="fa-solid fa-link"></i><span>Ver más información</span></a>`
      : '';
    const precioHTML = e.precio?.trim()
      ? `<p class="evento-precio">${e.precio} <span>${e.precio_nota || ''}</span></p>`
      : '';
    const cuposHTML = typeof e.cupos === 'number'
      ? `<div class="evento-meta-item">${iconos.cupos}<span>${cuposText}</span></div>`
      : '';
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
        <p class="evento-desc">${descHTML}</p>
        <div class="evento-meta">
          <div class="evento-meta-item">${iconos.fecha}<span>${e.fecha}</span></div>
          <div class="evento-meta-item">${iconos.hora}<span>${e.hora}</span></div>
          <div class="evento-meta-item">${iconos.dur}<span>${e.duracion}</span></div>
          ${cuposHTML}
        </div>
        ${precioHTML}
        ${linkHTML}
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

const NOMBRES_YURTAS = {
  1: 'Yurta Ceibo',
  2: 'Yurta Canelon'
};

function seleccionarYurta(n) {
  calState.yurta  = n;
  calState.inicio = null; calState.fin = null; calState.hover = null;
  document.getElementById('cal-error').style.display = 'none';
  const nombreYurta = NOMBRES_YURTAS[n] || `Yurta ${n}`;
  document.getElementById('cal-yurta-label').textContent = nombreYurta;
  document.getElementById('btn-yurta1').classList.toggle('active', n === 1);
  document.getElementById('btn-yurta2').classList.toggle('active', n === 2);
  document.getElementById('display-yurta').value = nombreYurta;
  document.getElementById('yurta').value = nombreYurta;
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
  document.querySelectorAll('.pago-metodo-btn, .pago-form-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('metodo-pago').value = metodo;
}
function initFormSubmit() {
  const form = document.getElementById('formularioContacto');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    // Prevenir el envío tradicional SOLO si usamos fetch
    e.preventDefault();

    console.log('🟡 Enviando formulario...');

    // Obtener los datos del formulario
    const formData = new FormData(form);
    formData.append('form-name', 'contacto');

    // Enviar a Netlify - MÁS RÁPIDO
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    })
    .then(response => {
      console.log('✅ Respuesta HTTP:', response.status);
      if (response.ok) {
        // Mostrar modal de éxito
        mostrarModal();
        form.reset();
        // Resetear campos del calendario
        calState.inicio = null;
        calState.fin = null;
        renderCalendario();
        actualizarResumenYForm();
        // Resetear método de pago
        document.querySelectorAll('.pago-metodo-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('metodo-pago').value = '';
      } else {
        throw new Error('Error en el servidor');
      }
    })
    .catch(error => {
      console.error('❌ Error:', error);
      alert('Hubo un error al enviar. Por favor, intentá de nuevo o contactanos directamente por WhatsApp.');
    });
  });
}
// ── INIT
(function init() {
  renderEventos('todos');
  const nombreYurtaInicial = NOMBRES_YURTAS[1];
  document.getElementById('display-yurta').value = nombreYurtaInicial;
  document.getElementById('yurta').value = nombreYurtaInicial;
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

    document.querySelector('form[name="contacto"]').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita la recarga

    // Mostrar estado de carga
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Recopilar datos del formulario
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Añadir información extra si es necesario
    data.timestamp = new Date().toISOString();
    data.user_agent = navigator.userAgent;

    try {
        const response = await fetch('https://formtorch.com/f/pguw3euojn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Mostrar mensaje de éxito
            document.getElementById('form-success').hidden = false;
            this.reset(); // Limpiar el formulario

            // Opcional: limpiar campos display
            document.getElementById('display-yurta').value = '';
            document.getElementById('display-noches').value = '';
            document.getElementById('display-llegada').value = '';
            document.getElementById('display-salida').value = '';
            document.querySelectorAll('.pago-metodo-btn').forEach(btn => btn.classList.remove('active'));

            // Scroll al mensaje de éxito
            document.getElementById('form-success').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Por favor, verifica tu internet y vuelve a intentar.');
    } finally {
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
// ============================================================
// DATOS DE PRODUCTOS - CATÁLOGO ESPACIO TIMBÓ
// ============================================================

const productos = [
  // ACEITES
  { id: 1, nombre: 'Aceite de Cannabis', categoria: 'aceites', precio: 450, descripcion: 'Aceite macerado de caléndula, ideal para pieles sensibles y irritadas.', imagen: 'assets/images/productos/aceite-calendula.jpg', stock: false },

  // POMADAS
  { id: 5, nombre: 'Pomada de Caléndula & Cannabis', categoria: 'pomadas', precio: 380, descripcion: 'Pomada cicatrizante con caléndula y propóleo, para heridas y rozaduras.', imagen: 'assets/images/productos/pomada-calendula.jpg', stock: true },

  // JABONES
  { id: 9, nombre: 'Jabón artesanal de Cannabis · Milenrama · Marcela', categoria: 'jabones', precio: 280, descripcion: 'Jabón artesanal con aceite de oliva y lavanda, suave y aromático.', imagen: 'assets/images/productos/jabon-lavanda.jpg', stock: true },

  // TINTURAS
  { id: 13, nombre: 'Tintura de MBURUCUYÁ', categoria: 'tinturas', precio: 320, descripcion: 'Tintura madre de propóleo, antibacteriano y reforzador del sistema inmune.', imagen: 'assets/images/productos/tintura-propoleo.jpg', stock: true },
  { id: 14, nombre: 'Tintura de MILENRAMA', categoria: 'tinturas', precio: 350, descripcion: 'Tintura de equinácea para reforzar defensas.', imagen: 'assets/images/productos/tintura-equipacea.jpg', stock: true },
  { id: 15, nombre: 'Tintura de ARTEMISIA', categoria: 'tinturas', precio: 310, descripcion: 'Tintura de ajo, antibiótico natural.', imagen: 'assets/images/productos/tintura-ajo.jpg', stock: false }, // SIN STOCK

  // SAHÚMOS
  { id: 16, nombre: 'Sahúmo de Salvia', categoria: 'sahunos', precio: 250, descripcion: 'Sahúmo de salvia blanca para limpieza energética.', imagen: 'assets/images/productos/sahumo-salvia.jpg', stock: true },
  { id: 17, nombre: 'Sahúmo de Palo Santo', categoria: 'sahunos', precio: 300, descripcion: 'Palo Santo para aromaterapia y meditación.', imagen: 'assets/images/productos/sahumo-palo.jpg', stock: true },
  { id: 18, nombre: 'Sahúmo de Romero', categoria: 'sahunos', precio: 230, descripcion: 'Sahúmo de romero para claridad mental.', imagen: 'assets/images/productos/sahumo-romero.jpg', stock: false }, // SIN STOCK

  // HIERBAS MEDICINALES
  { id: 19, nombre: 'Manzanilla', categoria: 'hierbas', precio: 180, descripcion: 'Flores de manzanilla secas, digestivas y relajantes.', imagen: 'assets/images/productos/hierba-manzanilla.jpg', stock: true },
  { id: 20, nombre: 'Menta', categoria: 'hierbas', precio: 160, descripcion: 'Hojas de menta secas, aromáticas y digestivas.', imagen: 'assets/images/productos/hierba-menta.jpg', stock: true },
  { id: 21, nombre: 'Hipérico', categoria: 'hierbas', precio: 200, descripcion: 'Planta de hipérico seca, para infusiones calmantes.', imagen: 'assets/images/productos/hierba-hiperico.jpg', stock: false }, // SIN STOCK
  { id: 22, nombre: 'Romero', categoria: 'hierbas', precio: 170, descripcion: 'Romero seco, estimulante y antioxidante.', imagen: 'assets/images/productos/hierba-romero.jpg', stock: true },

  // SEMILLAS Y PLANTINES
  { id: 23, nombre: 'Semillas de Aromáticas (mix)', categoria: 'semillas', precio: 220, descripcion: 'Mix de semillas de albahaca, perejil, cilantro y eneldo.', imagen: 'assets/images/productos/semillas-aromaticas.jpg', stock: true },
  { id: 24, nombre: 'Plantín de Lavanda', categoria: 'semillas', precio: 350, descripcion: 'Plantín de lavanda para tu jardín o maceta.', imagen: 'assets/images/productos/plantin-lavanda.jpg', stock: true },
  { id: 25, nombre: 'Semillas de Caléndula', categoria: 'semillas', precio: 190, descripcion: 'Semillas de caléndula, flor medicinal y ornamental.', imagen: 'assets/images/productos/semillas-calendula.jpg', stock: false }, // SIN STOCK
  { id: 26, nombre: 'Plantín de Romero', categoria: 'semillas', precio: 320, descripcion: 'Plantín de romero para cultivar en casa.', imagen: 'assets/images/productos/plantin-romero.jpg', stock: true },
];
// ============================================================
// ESTADO DEL CARRITO
// ============================================================

let carrito = [];
let categoriaActual = 'todos';

// ============================================================
// FUNCIONES DEL CATÁLOGO
// ============================================================

// Renderizar productos
// Renderizar productos
function renderizarProductos(categoria = 'todos') {
  const grid = document.getElementById('catalogo-grid');
  if (!grid) return;

  const filtrados = categoria === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    grid.innerHTML = `<p class="sin-productos">No hay productos en esta categoría.</p>`;
    return;
  }

  grid.innerHTML = filtrados.map(p => {
    // Determinar si tiene stock
    const tieneStock = p.stock !== undefined ? p.stock : true;
    const stockClass = tieneStock ? '' : 'sin-stock';
    const stockBadge = tieneStock
      ? ''
      : `<span class="badge-sin-stock">Sin stock</span>`;
    const botonAgregar = tieneStock
      ? `<button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">
          <i class="fas fa-plus"></i> Agregar
        </button>`
      : `<button class="btn-agregar btn-sin-stock" disabled>
          <i class="fas fa-times"></i> No disponible
        </button>`;

    return `
      <div class="producto-card ${stockClass}" data-id="${p.id}">
        <div class="producto-imagen">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='assets/images/productos/placeholder.jpg'">
          ${stockBadge}
        </div>
        <div class="producto-info">
          <span class="producto-categoria">${p.categoria}</span>
          <h3 class="producto-nombre">${p.nombre}</h3>
          <p class="producto-descripcion">${p.descripcion}</p>
          <div class="producto-footer">
            <span class="producto-precio">$${p.precio}</span>
            ${botonAgregar}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filtrar productos por categoría
function filtrarProductos(categoria, btn) {
  categoriaActual = categoria;
  renderizarProductos(categoria);

  // Actualizar botones activos
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ============================================================
// FUNCIONES DEL CARRITO
// ============================================================

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
  const producto = productos.find(p => p.id === productoId);
  if (!producto) return;

  // Verificar stock
  if (producto.stock === false) {
    mostrarNotificacion('⚠️ Este producto no está disponible actualmente');
    return;
  }

  const existente = carrito.find(p => p.id === productoId);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}

// Eliminar producto del carrito
function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(p => p.id !== productoId);
  actualizarCarrito();
}

// Actualizar cantidad de un producto
function actualizarCantidad(productoId, nuevaCantidad) {
  const item = carrito.find(p => p.id === productoId);
  if (!item) return;

  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }

  item.cantidad = nuevaCantidad;
  actualizarCarrito();
}

// Vaciar carrito completamente
function vaciarCarrito() {
  if (carrito.length === 0) return;
  carrito = [];
  actualizarCarrito();
  mostrarNotificacion('🔄 Carrito vaciado');
}

// Calcular total del carrito
function calcularTotal() {
  return carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
}

// Calcular cantidad total de items
function calcularCantidadTotal() {
  return carrito.reduce((sum, p) => sum + p.cantidad, 0);
}

// Actualizar toda la UI del carrito
// Actualizar toda la UI del carrito
function actualizarCarrito() {
  // 1. Actualizar contador en el header
  const count = calcularCantidadTotal();
  const countEl = document.getElementById('nav-carrito-count');
  if (countEl) countEl.textContent = count;

  // 2. Actualizar lista del panel
  const lista = document.getElementById('carrito-lista-header');
  const totalEl = document.getElementById('carrito-total-monto-header');

  if (!lista || !totalEl) return;

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    totalEl.textContent = '$0';
    return;
  }

  lista.innerHTML = carrito.map(p => `
    <div class="carrito-item">
      <div class="carrito-item-info">
        <span class="carrito-item-nombre">${p.nombre}</span>
        <span class="carrito-item-precio">$${p.precio}</span>
      </div>
      <div class="carrito-item-controls">
        <button class="carrito-qty-btn" onclick="actualizarCantidad(event, ${p.id}, ${p.cantidad - 1})">
          −
        </button>
        <span class="carrito-item-qty">${p.cantidad}</span>
        <button class="carrito-qty-btn" onclick="actualizarCantidad(event, ${p.id}, ${p.cantidad + 1})">
          +
        </button>
        <button class="carrito-eliminar" onclick="eliminarDelCarrito(event, ${p.id})">
          ✕
        </button>
      </div>
    </div>
  `).join('');

  totalEl.textContent = `$${calcularTotal()}`;
}

// Actualizar cantidad - CON stopPropagation
function actualizarCantidad(event, productoId, nuevaCantidad) {
  // Evitar que el evento burbujee y cierre el carrito
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const item = carrito.find(p => p.id === productoId);
  if (!item) return;

  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(event, productoId);
    return;
  }

  item.cantidad = nuevaCantidad;
  actualizarCarrito();
}

// Eliminar del carrito - CON stopPropagation
function eliminarDelCarrito(event, productoId) {
  // Evitar que el evento burbujee y cierre el carrito
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  carrito = carrito.filter(p => p.id !== productoId);
  actualizarCarrito();
}

// Vaciar carrito - CON stopPropagation
function vaciarCarrito(event) {
  // Evitar que el evento burbujee y cierre el carrito
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (carrito.length === 0) return;
  if (confirm('¿Vaciar todo el carrito?')) {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion('🔄 Carrito vaciado');
  }
}

// Enviar pedido - CON stopPropagation
function enviarPedido(event) {
  // Evitar que el evento burbujee y cierre el carrito
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (carrito.length === 0) {
    mostrarNotificacion('⚠️ El carrito está vacío');
    return;
  }

  // ... resto del código de enviar pedido ...
}

// Función para cerrar el carrito SOLO con la X
function cerrarCarrito(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const panel = document.getElementById('carrito-panel-header');
  if (panel) {
    panel.hidden = true;
  }
}

// Toggle carrito - solo para abrir/cerrar con el ícono
function toggleCarrito(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const panel = document.getElementById('carrito-panel-header');
  if (panel) {
    // Si está oculto, lo mostramos
    if (panel.hidden) {
      panel.hidden = false;
      actualizarCarrito();
    } else {
      // Si está visible, lo ocultamos SOLO si el clic fue en el ícono
      // (no en los botones internos)
      const target = event ? event.target : null;
      if (target && target.closest('.carrito-panel-header')) {
        // El clic fue dentro del panel, no hacemos nada
        return;
      }
      panel.hidden = true;
    }
  }
}

// Cerrar carrito al hacer clic fuera (modificado)
document.addEventListener('click', function(event) {
  const panel = document.getElementById('carrito-panel-header');
  const btn = document.querySelector('.nav-carrito');

  if (panel && !panel.hidden) {
    const isClickInside = panel.contains(event.target) || (btn && btn.contains(event.target));
    if (!isClickInside) {
      panel.hidden = true;
    }
  }
});

// ============================================================
// PANEL DEL CARRITO
// ============================================================

// Abrir/cerrar el panel del carrito
function toggleCarrito(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const panel = document.getElementById('carrito-panel-header');
  if (panel) {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      actualizarCarrito();
    }
  }
}

// Cerrar carrito al hacer clic fuera
document.addEventListener('click', function(event) {
  const panel = document.getElementById('carrito-panel-header');
  const btn = document.querySelector('.nav-carrito');
  if (panel && !panel.hidden) {
    const isClickInside = panel.contains(event.target) || (btn && btn.contains(event.target));
    if (!isClickInside) {
      panel.hidden = true;
    }
  }
});

// ============================================================
// NOTIFICACIONES
// ============================================================

function mostrarNotificacion(mensaje) {
  // Eliminar notificaciones existentes
  document.querySelectorAll('.notificacion').forEach(n => n.remove());

  const notif = document.createElement('div');
  notif.className = 'notificacion';
  notif.textContent = mensaje;
  document.body.appendChild(notif);

  // Animación de entrada
  requestAnimationFrame(() => {
    notif.classList.add('visible');
  });

  // Auto-eliminar después de 3 segundos
  setTimeout(() => {
    notif.classList.remove('visible');
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// ============================================================
// ENVIAR PEDIDO POR EMAIL
// ============================================================

function enviarPedido() {
  if (carrito.length === 0) {
    mostrarNotificacion('⚠️ El carrito está vacío');
    return;
  }

  // Construir mensaje
  let mensaje = '📦 NUEVO PEDIDO - ESPACIO TIMBÓ\n';
  mensaje += '═'.repeat(40) + '\n\n';
  mensaje += '🔹 PRODUCTOS SOLICITADOS:\n';
  mensaje += '─'.repeat(30) + '\n';

  carrito.forEach((p, index) => {
    mensaje += `  ${index + 1}. ${p.nombre}\n`;
    mensaje += `     Cantidad: ${p.cantidad}\n`;
    mensaje += `     Precio unitario: $${p.precio}\n`;
    mensaje += `     Subtotal: $${p.precio * p.cantidad}\n\n`;
  });

  mensaje += '─'.repeat(30) + '\n';
  mensaje += `💰 TOTAL DEL PEDIDO: $${calcularTotal()}\n\n`;

  mensaje += '═'.repeat(40) + '\n';
  mensaje += '📋 DATOS DE CONTACTO:\n';
  mensaje += '  • Nombre completo: \n';
  mensaje += '  • Correo electrónico: \n';
  mensaje += '  • Teléfono/WhatsApp: \n';
  mensaje += '  • Método de pago preferido: \n\n';

  mensaje += '📝 OBSERVACIONES:\n';
  mensaje += '  • \n\n';

  mensaje += '═'.repeat(40) + '\n';
  mensaje += '🌿 Gracias por elegir Espacio Timbó\n';
  mensaje += '📍 Santa Ana, Colonia, Uruguay\n';
  mensaje += '📧 espaciotimbo.uy@gmail.com\n';
  mensaje += '📱 +598 97 328 615';

  // Enviar por email
  const asunto = encodeURIComponent('📦 Nuevo pedido de productos - Espacio Timbó');
  const cuerpo = encodeURIComponent(mensaje);
  const email = 'espaciotimbo.uy@gmail.com';

  window.location.href = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;

  // Opcional: también abrir WhatsApp con el mismo mensaje
  // const whatsappMsg = encodeURIComponent(mensaje);
  // window.open(`https://wa.me/59897328615?text=${whatsappMsg}`, '_blank');

  // Cerrar carrito
  const panel = document.getElementById('carrito-panel-header');
  if (panel) panel.hidden = true;

  mostrarNotificacion('📨 Pedido enviado por email');
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar catálogo
  renderizarProductos();

  // Inicializar carrito
  actualizarCarrito();

  // Marcar el botón "Todos" como activo
  const todosBtn = document.querySelector('.cat-btn[data-categoria="todos"]');
  if (todosBtn) todosBtn.classList.add('active');

  console.log('🌿 Espacio Timbó - Catálogo y Carrito cargado correctamente');
  console.log(`📦 ${productos.length} productos disponibles en ${new Set(productos.map(p => p.categoria)).size} categorías`);
});
// ============================================================
// SISTEMA DE ADMINISTRACIÓN - ESPACIO TIMBÓ
// ============================================================

// Credenciales (en producción usar hash y servidor)
const ADMIN_CREDENTIALS = {
  usuario: 'admin',
  contraseña: 'timbó2025'
};

let productosAdmin = [];
let adminLogueado = false;
let productoEditando = null;

// ============================================================
// LOGIN
// ============================================================

function abrirLogin() {
  document.getElementById('loginModal').hidden = false;
  document.getElementById('loginError').hidden = true;
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginUser').focus();
}

function cerrarLogin() {
  document.getElementById('loginModal').hidden = true;
}

function loginAdmin(event) {
  event.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (user === ADMIN_CREDENTIALS.usuario && pass === ADMIN_CREDENTIALS.contraseña) {
    adminLogueado = true;
    cerrarLogin();
    abrirAdmin();
    mostrarNotificacion('🔐 Sesión iniciada como administrador');
  } else {
    document.getElementById('loginError').hidden = false;
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
  }
}

// Cerrar login con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarLogin();
    cerrarEdit();
  }
});

// ============================================================
// PANEL DE ADMINISTRACIÓN
// ============================================================

function abrirAdmin() {
  if (!adminLogueado) return;

  // Cargar datos desde localStorage o usar los productos por defecto
  cargarProductosDesdeStorage();

  document.getElementById('adminPanel').hidden = false;
  renderizarAdmin();
  document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' });
}

function cerrarAdmin() {
  document.getElementById('adminPanel').hidden = true;
  adminLogueado = false;
  mostrarNotificacion('🔒 Sesión cerrada');
}

// ============================================================
// GESTIÓN DE PRODUCTOS (localStorage)
// ============================================================

function cargarProductosDesdeStorage() {
  const stored = localStorage.getItem('productos_timbo');
  if (stored) {
    try {
      productosAdmin = JSON.parse(stored);
      // Sincronizar con la variable global productos
      sincronizarProductosGlobales();
    } catch (e) {
      productosAdmin = [...productos];
      guardarProductosEnStorage();
    }
  } else {
    productosAdmin = [...productos];
    guardarProductosEnStorage();
  }
}

function guardarProductosEnStorage() {
  localStorage.setItem('productos_timbo', JSON.stringify(productosAdmin));
  sincronizarProductosGlobales();
}

function sincronizarProductosGlobales() {
  // Sincronizar con la variable global 'productos' usada en el catálogo
  if (typeof productos !== 'undefined') {
    // Reemplazar el array global
    productos.length = 0;
    productosAdmin.forEach(p => productos.push(p));
    // Re-renderizar catálogo
    renderizarProductos(categoriaActual || 'todos');
  }
}

// ============================================================
// RENDERIZAR TABLA ADMIN
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

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-empty">No hay productos que coincidan con la búsqueda</td></tr>`;
  }
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
// INICIALIZACIÓN - Cargar datos
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Cargar productos desde localStorage
  cargarProductosDesdeStorage();

  // Renderizar catálogo
  renderizarProductos();

  // Inicializar carrito
  actualizarCarrito();

  console.log('🌿 Espacio Timbó - Sistema de Administración cargado');
  console.log(`📦 ${productosAdmin.length} productos en el catálogo`);
});

// En scripts.js - acceso oculto al admin
  // Ctrl+Shift+A (o Cmd+Shift+A en Mac)
  document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});