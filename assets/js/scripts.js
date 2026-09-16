/* ═══════════════════════════════════════════════════════════════
   ESPACIO TIMBÓ · scripts.js
   Versión unificada y ordenada
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   1. DATOS · TALLERES Y EVENTOS
   ═══════════════════════════════════════════════════════════════ */
const TALLERES_EVENTOS = [
  /* Descomentá y editá estos talleres cuando quieras mostrarlos:
  {
    tipo: "experiencia",
    titulo: "Retiro Vivencial: Retorno al Origen",
    desc: "• Ceremonia de Rapé, Rezo de Tabaco y Cantos Ancestrales alrededor del Fuego\n• Limpieza e Inmersión con Sahumos\n• Ceremonia con Plantas Maestras",
    fecha: "Sábado 19 de Septiembre",
    hora: "10:00 hs",
    duracion: "1 día",
    cupos: "0",
    precio: "",
    precio_nota: "por persona · incluye almuerzo",
    badge: "nuevo",
    agotado: false,
    linkURL: "https://www.instagram.com/p/DagfVcWlZD7/?img_index=1",
    imagen: "../assets/images/experiencia1.png",
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
  */
];

/* ═══════════════════════════════════════════════════════════════
   2. CONFIGURACIÓN iCAL (Airbnb)
   ═══════════════════════════════════════════════════════════════ */
const ICAL_URL_YURTA1 = 'https://www.airbnb.com/calendar/ical/1267620632342788641.ics?t=28be1aecaa5c4cb1b4213a716fd00a8d&locale=es-XL';
const ICAL_URL_YURTA2 = 'https://www.airbnb.com/calendar/ical/47333689.ics?t=2c5799a6fea7496fa0030b5b3e5302bd&locale=es-XL';

const OCUPADOS_ICAL = {
  yurta1: [],
  yurta2: []
};

/* ═══════════════════════════════════════════════════════════════
   3. DATOS · PRODUCTOS DEL CATÁLOGO
   ═══════════════════════════════════════════════════════════════ */
const PRODUCTOS_BASE = [
  { id: 1,  nombre: 'Aceite de Cannabis',                                categoria: 'aceites',  precio: 450, descripcion: 'Aceite macerado de caléndula, ideal para pieles sensibles y irritadas.',                       imagen: 'assets/images/productos/aceite-calendula.jpg',   stock: false },
  { id: 5,  nombre: 'Pomada de Caléndula & Cannabis',                    categoria: 'pomadas',  precio: 380, descripcion: 'Pomada cicatrizante con caléndula y propóleo, para heridas y rozaduras.',                        imagen: 'assets/images/productos/pomada-calendula.jpg',   stock: true  },
  { id: 9,  nombre: 'Jabón artesanal de Cannabis · Milenrama · Marcela', categoria: 'jabones',  precio: 280, descripcion: 'Jabón artesanal con aceite de oliva y lavanda, suave y aromático.',                              imagen: 'assets/images/productos/jabon-lavanda.jpg',      stock: true  },
  { id: 13, nombre: 'Tintura de MBURUCUYÁ',                              categoria: 'tinturas', precio: 320, descripcion: 'Tintura madre de propóleo, antibacteriano y reforzador del sistema inmune.',                     imagen: 'assets/images/productos/tintura-propoleo.jpg',   stock: true  },
  { id: 14, nombre: 'Tintura de MILENRAMA',                              categoria: 'tinturas', precio: 350, descripcion: 'Tintura de equinácea para reforzar defensas.',                                                   imagen: 'assets/images/productos/tintura-equipacea.jpg',  stock: true  },
  { id: 15, nombre: 'Tintura de ARTEMISIA',                              categoria: 'tinturas', precio: 310, descripcion: 'Tintura de ajo, antibiótico natural.',                                                           imagen: 'assets/images/productos/tintura-ajo.jpg',        stock: false },
  { id: 16, nombre: 'Sahúmo de Salvia',                                  categoria: 'sahunos',  precio: 250, descripcion: 'Sahúmo de salvia blanca para limpieza energética.',                                              imagen: 'assets/images/productos/sahumo-salvia.jpg',      stock: true  },
  { id: 17, nombre: 'Sahúmo de Palo Santo',                              categoria: 'sahunos',  precio: 300, descripcion: 'Palo Santo para aromaterapia y meditación.',                                                     imagen: 'assets/images/productos/sahumo-palo.jpg',        stock: true  },
  { id: 18, nombre: 'Sahúmo de Romero',                                  categoria: 'sahunos',  precio: 230, descripcion: 'Sahúmo de romero para claridad mental.',                                                         imagen: 'assets/images/productos/sahumo-romero.jpg',      stock: false },
  { id: 19, nombre: 'Manzanilla',                                        categoria: 'hierbas',  precio: 180, descripcion: 'Flores de manzanilla secas, digestivas y relajantes.',                                           imagen: 'assets/images/productos/hierba-manzanilla.jpg',   stock: true  },
  { id: 20, nombre: 'Menta',                                             categoria: 'hierbas',  precio: 160, descripcion: 'Hojas de menta secas, aromáticas y digestivas.',                                                 imagen: 'assets/images/productos/hierba-menta.jpg',       stock: true  },
  { id: 21, nombre: 'Hipérico',                                          categoria: 'hierbas',  precio: 200, descripcion: 'Planta de hipérico seca, para infusiones calmantes.',                                            imagen: 'assets/images/productos/hierba-hiperico.jpg',    stock: false },
  { id: 22, nombre: 'Romero',                                            categoria: 'hierbas',  precio: 170, descripcion: 'Romero seco, estimulante y antioxidante.',                                                       imagen: 'assets/images/productos/hierba-romero.jpg',      stock: true  },
  { id: 23, nombre: 'Semillas de Aromáticas (mix)',                      categoria: 'semillas', precio: 220, descripcion: 'Mix de semillas de albahaca, perejil, cilantro y eneldo.',                                       imagen: 'assets/images/productos/semillas-aromaticas.jpg',stock: true  },
  { id: 24, nombre: 'Plantín de Lavanda',                                categoria: 'semillas', precio: 350, descripcion: 'Plantín de lavanda para tu jardín o maceta.',                                                    imagen: 'assets/images/productos/plantin-lavanda.jpg',    stock: true  },
  { id: 25, nombre: 'Semillas de Caléndula',                             categoria: 'semillas', precio: 190, descripcion: 'Semillas de caléndula, flor medicinal y ornamental.',                                            imagen: 'assets/images/productos/semillas-calendula.jpg', stock: false },
  { id: 26, nombre: 'Plantín de Romero',                                 categoria: 'semillas', precio: 320, descripcion: 'Plantín de romero para cultivar en casa.',                                                       imagen: 'assets/images/productos/plantin-romero.jpg',     stock: true  }
];

/* ═══════════════════════════════════════════════════════════════
   4. ESTADO GLOBAL
   ═══════════════════════════════════════════════════════════════ */
const filtros = {
  categoria: 'todos',
  texto: '',
  orden: 'relevancia'
};

let carrito = [];
let productosAdmin = [];
let adminLogueado = false;
let productoEditando = null;

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];
const NOMBRES_YURTAS = { 1: 'Yurta Ceibo', 2: 'Yurta Canelón' };
const ADMIN_CREDENTIALS = { usuario: 'admin', contraseña: 'timbó2025' };

/* ═══════════════════════════════════════════════════════════════
   5. HELPERS GENERALES
   ═══════════════════════════════════════════════════════════════ */
function normalizar(texto) {
  return (texto || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function fechaNorm(a, m, d) {
  const f = new Date(a, m, d);
  f.setHours(0, 0, 0, 0);
  return f;
}

function hoyNorm() {
  const h = new Date();
  h.setHours(0, 0, 0, 0);
  return h;
}

function formatoFecha(f) {
  if (!f) return '—';
  return `${f.getDate()} ${MESES[f.getMonth()].slice(0, 3)} ${f.getFullYear()}`;
}

function formatoISO(f) {
  if (!f) return '';
  return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════════════
   6. NAVEGACIÓN
   ═══════════════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav ul a');

if (document.getElementById('hamburger')) {
  document.getElementById('hamburger').addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

function cerrarMenuMovil() {
  if (nav && nav.classList.contains('open')) nav.classList.remove('open');
}

function activarLinkNav(link) {
  navLinks.forEach(a => a.classList.remove('active'));
  if (link) link.classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', function () {
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
  const sectionLinks = Array.from(navLinks).filter(a => a.hash && a.hash.startsWith('#'));
  const sections = sectionLinks
    .map(a => document.getElementById(a.hash.slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.sort((a, b) => a.target.offsetTop - b.target.offsetTop);
    entries.forEach(entry => {
      if (entry.isIntersecting) activarLinkPorSection(entry.target.id);
    });
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
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

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.style.background = window.scrollY > 60
    ? 'rgba(242,234,216,0.97)'
    : 'rgba(242,234,216,0.92)';
});

/* ═══════════════════════════════════════════════════════════════
   7. SLIDESHOWS (HERO + GLAMPING + YURTAS)
   ═══════════════════════════════════════════════════════════════ */
function setupHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let currentIndex = 0;
  slides[currentIndex].classList.add('is-active');
  setInterval(() => {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('is-active');
  }, 4500);
}

function setupGlampingSlideshow() {
  const slides = document.querySelectorAll('.glamping-slide');
  if (!slides.length) return;
  let currentIndex = 0;
  slides[currentIndex].classList.add('is-active');
  setInterval(() => {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('is-active');
  }, 4200);
}

function activarSlide(slideshow, index) {
  const slides = slideshow.querySelectorAll('.yurta-slide');
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
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

  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  slideshow.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) currentIndex = (currentIndex + 1) % slides.length;
    else currentIndex = (currentIndex - 1 + slides.length) % slides.length;
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

window.addEventListener('load', setupHeroSlideshow);
window.addEventListener('load', setupGlampingSlideshow);
document.querySelectorAll('.yurta-slideshow').forEach(setupYurtaSlideshow);

/* ═══════════════════════════════════════════════════════════════
   8. TALLERES / EVENTOS
   ═══════════════════════════════════════════════════════════════ */
function renderEventos(filtro) {
  const grid = document.getElementById('talleres-grid');
  if (!grid) return;

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
  if (btn) btn.classList.add('active');
  renderEventos(filtro);
}

/* ═══════════════════════════════════════════════════════════════
   9. CALENDARIO INTERACTIVO (RESERVAS)
   ═══════════════════════════════════════════════════════════════ */
const calState = {
  yurta: 1,
  mes: new Date().getMonth(),
  anio: new Date().getFullYear(),
  inicio: null,
  fin: null,
  hover: null
};

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
    renderCalendario();
  } catch (err) {
    console.error(`Error cargando ICS de ${yurtaKey}:`, err);
  }
}

cargarICal(ICAL_URL_YURTA1, 'yurta1');
cargarICal(ICAL_URL_YURTA2, 'yurta2');

function ocupadosDeYurta(y) {
  return (y === 1 ? OCUPADOS_ICAL.yurta1 : OCUPADOS_ICAL.yurta2) || [];
}

function esDiaOcupado(d, m, a) {
  const hoy = hoyNorm();
  const fecha = fechaNorm(a, m, d);
  if (fecha < hoy) return false;
  const rangos = ocupadosDeYurta(calState.yurta);
  return rangos.some(r => fecha >= r.start && fecha < r.end);
}

function rangoTieneOcupados(ini, fin) {
  let cur = new Date(ini);
  cur.setDate(cur.getDate() + 1);
  cur.setHours(0, 0, 0, 0);
  while (cur < fin) {
    if (esDiaOcupado(cur.getDate(), cur.getMonth(), cur.getFullYear())) return true;
    cur.setDate(cur.getDate() + 1);
  }
  return false;
}

function actualizarResumenYForm() {
  const { inicio, fin } = calState;
  const n = (inicio && fin) ? Math.round((fin - inicio) / 86400000) : null;

  const elResLlegada = document.getElementById('resumen-llegada');
  const elResSalida  = document.getElementById('resumen-salida');
  const elResNoches  = document.getElementById('resumen-noches');
  const elDisLlegada = document.getElementById('display-llegada');
  const elDisSalida  = document.getElementById('display-salida');
  const elDisNoches  = document.getElementById('display-noches');
  const elLlegada    = document.getElementById('llegada');
  const elSalida     = document.getElementById('salida');

  if (elResLlegada) elResLlegada.textContent = formatoFecha(inicio);
  if (elResSalida)  elResSalida.textContent  = formatoFecha(fin);
  if (elResNoches)  elResNoches.textContent  = n !== null ? n + (n === 1 ? ' noche' : ' noches') : '—';

  if (elDisLlegada) elDisLlegada.value = inicio ? formatoFecha(inicio) : '';
  if (elDisSalida)  elDisSalida.value  = fin ? formatoFecha(fin) : '';
  if (elDisNoches)  elDisNoches.value  = n !== null ? n : '';
  if (elLlegada)    elLlegada.value    = formatoISO(inicio);
  if (elSalida)     elSalida.value     = formatoISO(fin);
}

function renderCalendario() {
  const container = document.getElementById('cal-principal');
  if (!container) return;

  const { mes, anio, inicio, fin, hover } = calState;
  const primerDia = new Date(anio, mes, 1).getDay();
  const ajuste    = primerDia === 0 ? 6 : primerDia - 1;
  const diasMes   = new Date(anio, mes + 1, 0).getDate();
  const hoy       = hoyNorm();

  let html = `
    <div class="mini-cal-nav">
      <button data-nav="-1">‹</button>
      <span class="mini-cal-month">${MESES[mes]} ${anio}</span>
      <button data-nav="1">›</button>
    </div>
    <div class="mini-cal-grid" id="cal-grid">
      ${DIAS_SEMANA.map(d => `<div class="mini-cal-day-header">${d}</div>`).join('')}
      ${Array(ajuste).fill('<div class="mini-cal-day empty"></div>').join('')}`;

  for (let d = 1; d <= diasMes; d++) {
    const fecha   = fechaNorm(anio, mes, d);
    const pasado  = fecha < hoy;
    const ocupado = esDiaOcupado(d, mes, anio);
    const esHoy   = fecha.getTime() === hoy.getTime();
    const esInicio = inicio && fecha.getTime() === inicio.getTime();
    const esFin    = fin && fecha.getTime() === fin.getTime();

    const hoverValido = hover && inicio && hover > inicio;
    const esHoverFin = hoverValido && fecha.getTime() === hover.getTime();
    const limiteRango = hoverValido ? hover : fin;
    const enRango = inicio && limiteRango && fecha > inicio && fecha < limiteRango;

    let cls = 'mini-cal-day';
    if (pasado)          cls += ' pasado';
    else if (ocupado)    cls += ' ocupado';
    else if (esInicio)   cls += ' inicio';
    else if (esFin)      cls += ' fin';
    else if (esHoverFin) cls += ' fin-preview';
    else if (enRango)    cls += ' rango';
    else                 cls += ' libre';

    if (esHoy && !esInicio && !esFin) cls += ' today';

    const attrs = (!pasado && !ocupado) ? `data-d="${d}" data-m="${mes}" data-a="${anio}"` : '';
    html += `<div class="${cls}" ${attrs}>${d}</div>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

function initCalListeners() {
  const container = document.getElementById('cal-principal');
  if (!container) return;

  container.addEventListener('click', function (e) {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) { calNavMes(+navBtn.dataset.nav); return; }

    const el = e.target.closest('[data-d]');
    if (!el) return;
    manejarClick(+el.dataset.d, +el.dataset.m, +el.dataset.a);
  });

  container.addEventListener('mouseover', function (e) {
    if (!calState.inicio) return;
    const el = e.target.closest('[data-d]');
    if (!el) return;
    const nueva = fechaNorm(+el.dataset.a, +el.dataset.m, +el.dataset.d);
    if (!calState.hover || calState.hover.getTime() !== nueva.getTime()) {
      calState.hover = nueva;
      renderCalendario();
    }
  });

  container.addEventListener('mouseleave', function () {
    if (calState.hover) {
      calState.hover = null;
      renderCalendario();
    }
  });
}

function manejarClick(d, m, a) {
  const fecha = fechaNorm(a, m, d);
  const err = document.getElementById('cal-error');
  if (err) err.style.display = 'none';
  calState.hover = null;

  if (!calState.inicio) {
    calState.inicio = fecha;
    calState.fin = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  if (fecha.getTime() === calState.inicio.getTime()) {
    calState.inicio = null;
    calState.fin = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  if (fecha < calState.inicio) {
    calState.inicio = fecha;
    calState.fin = null;
    renderCalendario();
    actualizarResumenYForm();
    return;
  }

  if (rangoTieneOcupados(calState.inicio, fecha)) {
    if (err) {
      err.textContent = 'El rango incluye días no disponibles. Elegí otras fechas.';
      err.style.display = 'block';
    }
    renderCalendario();
    return;
  }

  const noches = Math.round((fecha - calState.inicio) / 86400000);
  if (noches < 2) {
    if (err) {
      err.textContent = 'La estadía mínima es de 2 noches.';
      err.style.display = 'block';
    }
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
  calState.yurta = n;
  calState.inicio = null;
  calState.fin = null;
  calState.hover = null;

  const err = document.getElementById('cal-error');
  if (err) err.style.display = 'none';

  const nombreYurta = NOMBRES_YURTAS[n] || `Yurta ${n}`;
  const label = document.getElementById('cal-yurta-label');
  if (label) label.textContent = nombreYurta;

  const btn1 = document.getElementById('btn-yurta1');
  const btn2 = document.getElementById('btn-yurta2');
  if (btn1) btn1.classList.toggle('active', n === 1);
  if (btn2) btn2.classList.toggle('active', n === 2);

  const inputYurta = document.getElementById('display-yurta');
  const hiddenYurta = document.getElementById('yurta');
  if (inputYurta) inputYurta.value = nombreYurta;
  if (hiddenYurta) hiddenYurta.value = nombreYurta;

  renderCalendario();
  actualizarResumenYForm();
}

/* ═══════════════════════════════════════════════════════════════
   10. CATÁLOGO · FILTROS + RENDER
   ═══════════════════════════════════════════════════════════════ */
function ordenarProductos(arr, orden) {
  const copia = [...arr];
  switch (orden) {
    case 'nombre-asc':  return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    case 'nombre-desc': return copia.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'));
    case 'precio-asc':  return copia.sort((a, b) => a.precio - b.precio);
    case 'precio-desc': return copia.sort((a, b) => b.precio - a.precio);
    default:            return copia;
  }
}

function renderizarProductos() {
  const grid = document.getElementById('catalogo-grid');
  const contador = document.getElementById('catalogoContador');
  const vacio = document.getElementById('catalogoVacio');
  const resetBtn = document.getElementById('catalogoReset');
  const limpiarBtn = document.getElementById('filtroLimpiar');

  if (!grid) return;

  const lista = (window.productos && window.productos.length) ? window.productos : PRODUCTOS_BASE;

  // Filtrar
  const textoNorm = normalizar(filtros.texto);
  let filtrados = lista.filter(p => {
    const coincideCat = filtros.categoria === 'todos' || p.categoria === filtros.categoria;
    const nombreNorm = normalizar(p.nombre);
    const descNorm = normalizar(p.descripcion || '');
    const coincideTexto = !textoNorm || nombreNorm.includes(textoNorm) || descNorm.includes(textoNorm);
    return coincideCat && coincideTexto;
  });

  // Ordenar
  filtrados = ordenarProductos(filtrados, filtros.orden);

  // Contador
  if (contador) {
    contador.textContent = filtrados.length === 1
      ? 'Mostrando 1 producto'
      : `Mostrando ${filtrados.length} productos`;
  }

  // Vacío
  if (vacio) vacio.hidden = filtrados.length > 0;
  grid.hidden = filtrados.length === 0;

  // Reset buttons
  const hayFiltros = filtros.texto || filtros.categoria !== 'todos' || filtros.orden !== 'relevancia';
  if (resetBtn) resetBtn.hidden = !hayFiltros;
  if (limpiarBtn) limpiarBtn.hidden = !filtros.texto;

  // Render
  if (filtrados.length === 0) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = filtrados.map(p => {
    const tieneStock = p.stock !== undefined ? p.stock : true;
    const stockClass = tieneStock ? '' : 'sin-stock';
    const stockBadge = tieneStock ? '' : `<span class="badge-sin-stock">Sin stock</span>`;
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
      </div>`;
  }).join('');
}

function filtrarProductos(categoria) {
  filtros.categoria = categoria;
  renderizarProductos();

  // Auto-cerrar sidebar en mobile (opcional)
  if (window.innerWidth <= 900) {
    const sidebar = document.getElementById('catalogoSidebar');
    if (sidebar) sidebar.classList.remove('is-open');
  }
}

function resetearFiltros() {
  filtros.categoria = 'todos';
  filtros.texto = '';
  filtros.orden = 'relevancia';

  const input = document.getElementById('filtroTexto');
  const selectOrden = document.getElementById('filtroOrden');
  const selectCat = document.getElementById('filtroCategoria');

  if (input) input.value = '';
  if (selectOrden) selectOrden.value = 'relevancia';
  if (selectCat) selectCat.value = 'todos';

  renderizarProductos();
}

/* ═══════════════════════════════════════════════════════════════
   11. CARRITO
   ═══════════════════════════════════════════════════════════════ */
function agregarAlCarrito(productoId) {
  const lista = (window.productos && window.productos.length) ? window.productos : PRODUCTOS_BASE;
  const producto = lista.find(p => p.id === productoId);
  if (!producto) return;

  if (producto.stock === false) {
    mostrarNotificacion('⚠️ Este producto no está disponible actualmente');
    return;
  }

  const existente = carrito.find(p => p.id === productoId);
  if (existente) existente.cantidad += 1;
  else carrito.push({ ...producto, cantidad: 1 });

  actualizarCarrito();
  mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}

function actualizarCantidad(productoId, nuevaCantidad) {
  const item = carrito.find(p => p.id === productoId);
  if (!item) return;
  if (nuevaCantidad <= 0) { eliminarDelCarrito(productoId); return; }
  item.cantidad = nuevaCantidad;
  actualizarCarrito();
}

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(p => p.id !== productoId);
  actualizarCarrito();
}

function vaciarCarrito(event) {
  if (event) event.stopPropagation();
  if (carrito.length === 0) return;
  if (confirm('¿Vaciar todo el carrito?')) {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion('🔄 Carrito vaciado');
  }
}

function calcularTotal() {
  return carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
}

function calcularCantidadTotal() {
  return carrito.reduce((sum, p) => sum + p.cantidad, 0);
}

function actualizarCarrito() {
  const countEl = document.getElementById('nav-carrito-count');
  if (countEl) countEl.textContent = calcularCantidadTotal();

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
        <button class="carrito-qty-btn" onclick="event.stopPropagation(); actualizarCantidad(${p.id}, ${p.cantidad - 1})">−</button>
        <span class="carrito-item-qty">${p.cantidad}</span>
        <button class="carrito-qty-btn" onclick="event.stopPropagation(); actualizarCantidad(${p.id}, ${p.cantidad + 1})">+</button>
        <button class="carrito-eliminar" onclick="event.stopPropagation(); eliminarDelCarrito(${p.id})">✕</button>
      </div>
    </div>
  `).join('');

  totalEl.textContent = `$${calcularTotal()}`;
}

function cerrarCarrito(event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  const panel = document.getElementById('carrito-panel-header');
  if (panel) panel.hidden = true;
}

function toggleCarrito(event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const panel = document.getElementById('carrito-panel-header');
  if (panel) {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) actualizarCarrito();
  }
}

function enviarPedido() {
  if (carrito.length === 0) {
    mostrarNotificacion('⚠️ El carrito está vacío');
    return;
  }

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
  mensaje += '📝 OBSERVACIONES:\n  • \n\n';
  mensaje += '═'.repeat(40) + '\n';
  mensaje += '🌿 Gracias por elegir Espacio Timbó\n';
  mensaje += '📍 Santa Ana, Colonia, Uruguay\n';
  mensaje += '📧 espaciotimbo.uy@gmail.com\n';
  mensaje += '📱 +598 97 328 615';

  const asunto = encodeURIComponent('📦 Nuevo pedido de productos - Espacio Timbó');
  const cuerpo = encodeURIComponent(mensaje);
  const email = 'espaciotimbo.uy@gmail.com';

  window.location.href = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;

  const panel = document.getElementById('carrito-panel-header');
  if (panel) panel.hidden = true;

  mostrarNotificacion('📨 Pedido enviado por email');
}

function mostrarNotificacion(mensaje) {
  document.querySelectorAll('.notificacion').forEach(n => n.remove());
  const notif = document.createElement('div');
  notif.className = 'notificacion';
  notif.textContent = mensaje;
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add('visible'));
  setTimeout(() => {
    notif.classList.remove('visible');
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

/* ═══════════════════════════════════════════════════════════════
   12. PAGO
   ═══════════════════════════════════════════════════════════════ */
function elegirPago(btn, metodo) {
  document.querySelectorAll('.pago-metodo-btn, .pago-form-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('metodo-pago');
  if (input) input.value = metodo;
}

/* ═══════════════════════════════════════════════════════════════
   13. PANEL DE ADMINISTRACIÓN
   ═══════════════════════════════════════════════════════════════ */
function cargarProductosDesdeStorage() {
  const stored = localStorage.getItem('productos_timbo');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      productosAdmin = Array.isArray(parsed) && parsed.length ? parsed : [...PRODUCTOS_BASE];
    } catch (e) {
      productosAdmin = [...PRODUCTOS_BASE];
    }
  } else {
    productosAdmin = [...PRODUCTOS_BASE];
  }
  window.productos = [...productosAdmin];
}

function guardarProductosEnStorage() {
  localStorage.setItem('productos_timbo', JSON.stringify(productosAdmin));
  window.productos = [...productosAdmin];
  renderizarProductos();
}

function abrirAdmin() {
  if (!adminLogueado) return;
  cargarProductosDesdeStorage();
  const panel = document.getElementById('adminPanel');
  if (panel) {
    panel.hidden = false;
    renderizarAdmin();
    panel.scrollIntoView({ behavior: 'smooth' });
  }
}

function cerrarAdmin() {
  const panel = document.getElementById('adminPanel');
  if (panel) panel.hidden = true;
  adminLogueado = false;
  mostrarNotificacion('🔒 Sesión cerrada');
}

function renderizarAdmin() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  const search = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  const filtrados = productosAdmin.filter(p =>
    p.nombre.toLowerCase().includes(search) ||
    p.categoria.toLowerCase().includes(search)
  );

  const adminTotal = document.getElementById('adminTotal');
  const adminStock = document.getElementById('adminStock');
  const adminSinStock = document.getElementById('adminSinStock');
  if (adminTotal) adminTotal.textContent = productosAdmin.length;
  if (adminStock) adminStock.textContent = productosAdmin.filter(p => p.stock !== false).length;
  if (adminSinStock) adminSinStock.textContent = productosAdmin.filter(p => p.stock === false).length;

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

function agregarProducto() {
  productoEditando = null;
  const title = document.getElementById('editModalTitle');
  if (title) title.textContent = '➕ Nuevo Producto';
  const form = document.getElementById('editForm');
  if (form) form.reset();
  const idField = document.getElementById('editId');
  if (idField) idField.value = '';
  const modal = document.getElementById('editModal');
  if (modal) modal.hidden = false;
}

function editarProducto(id) {
  const producto = productosAdmin.find(p => p.id === id);
  if (!producto) return;

  productoEditando = producto;
  const title = document.getElementById('editModalTitle');
  if (title) title.textContent = `✏️ Editar: ${producto.nombre}`;
  const idField = document.getElementById('editId');
  if (idField) idField.value = producto.id;
  const nombre = document.getElementById('editNombre');
  if (nombre) nombre.value = producto.nombre;
  const cat = document.getElementById('editCategoria');
  if (cat) cat.value = producto.categoria;
  const precio = document.getElementById('editPrecio');
  if (precio) precio.value = producto.precio;
  const desc = document.getElementById('editDescripcion');
  if (desc) desc.value = producto.descripcion;
  const img = document.getElementById('editImagen');
  if (img) img.value = producto.imagen || '';
  const stock = document.getElementById('editStock');
  if (stock) stock.value = producto.stock !== false ? 'true' : 'false';

  const modal = document.getElementById('editModal');
  if (modal) modal.hidden = false;
}

function cerrarEdit() {
  const modal = document.getElementById('editModal');
  if (modal) modal.hidden = true;
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
    const index = productosAdmin.findIndex(p => p.id === id);
    if (index !== -1) {
      productosAdmin[index] = { ...productosAdmin[index], nombre, categoria, precio, descripcion, imagen, stock };
    }
    mostrarNotificacion(`✅ Producto "${nombre}" actualizado`);
  } else {
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

/* ═══════════════════════════════════════════════════════════════
   14. FORMULARIO DE RESERVAS
   ═══════════════════════════════════════════════════════════════ */
function initFormReservas() {
  const form = document.querySelector('form[name="contacto"]');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
    }

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();
    data.user_agent = navigator.userAgent;

    try {
      const response = await fetch('https://formtorch.com/f/pguw3euojn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const success = document.getElementById('form-success');
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth' });
        }
        this.reset();

        // Limpiar campos del calendario
        ['display-yurta','display-noches','display-llegada','display-salida'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
        document.querySelectorAll('.pago-metodo-btn').forEach(btn => btn.classList.remove('active'));
        const metodo = document.getElementById('metodo-pago');
        if (metodo) metodo.value = '';

        calState.inicio = null;
        calState.fin = null;
        renderCalendario();
        actualizarResumenYForm();
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Por favor, verifica tu internet y vuelve a intentar.');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   15. INICIALIZACIÓN GENERAL
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  // Productos: base o storage
  cargarProductosDesdeStorage();

  // Render catálogo + carrito
  renderizarProductos();
  actualizarCarrito();

  // Marcar "Todos" como activo
  const todosBtn = document.querySelector('.cat-btn[data-categoria="todos"]');
  if (todosBtn) todosBtn.classList.add('active');

  // Talleres
  renderEventos('todos');

  // Calendario
  const nombreYurtaInicial = NOMBRES_YURTAS[1];
  const inputYurta = document.getElementById('display-yurta');
  const hiddenYurta = document.getElementById('yurta');
  if (inputYurta) inputYurta.value = nombreYurtaInicial;
  if (hiddenYurta) hiddenYurta.value = nombreYurtaInicial;
  renderCalendario();
  initCalListeners();
  actualizarResumenYForm();

  // Formulario de reservas
  initFormReservas();

  // ── Listeners de filtros del catálogo ──
  const inputFiltro = document.getElementById('filtroTexto');
  const selectOrden = document.getElementById('filtroOrden');
  const limpiar = document.getElementById('filtroLimpiar');
  const reset1 = document.getElementById('catalogoReset');
  const reset2 = document.getElementById('catalogoReset2');

  let timeoutBusqueda;
  if (inputFiltro) {
    inputFiltro.addEventListener('input', function (e) {
      clearTimeout(timeoutBusqueda);
      timeoutBusqueda = setTimeout(() => {
        filtros.texto = e.target.value.trim();
        renderizarProductos();
      }, 200);
    });
  }

  if (limpiar) {
    limpiar.addEventListener('click', function () {
      filtros.texto = '';
      if (inputFiltro) { inputFiltro.value = ''; inputFiltro.focus(); }
      renderizarProductos();
    });
  }

  if (selectOrden) {
    selectOrden.addEventListener('change', function (e) {
      filtros.orden = e.target.value;
      renderizarProductos();
      // Auto-cerrar sidebar en mobile
      if (window.innerWidth <= 900) {
        const sidebar = document.getElementById('catalogoSidebar');
        if (sidebar) sidebar.classList.remove('is-open');
      }
    });
  }

  if (reset1) reset1.addEventListener('click', resetearFiltros);
  if (reset2) reset2.addEventListener('click', resetearFiltros);

  // ── Cerrar carrito al hacer clic fuera ──
  document.addEventListener('click', function (event) {
    const panel = document.getElementById('carrito-panel-header');
    const btn = document.querySelector('.nav-carrito');
    if (panel && !panel.hidden) {
      const isClickInside = panel.contains(event.target) || (btn && btn.contains(event.target));
      if (!isClickInside) panel.hidden = true;
    }
  });

  // ── Login admin (por si se usa modal en el HTML) ──
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value.trim();
      if (user === ADMIN_CREDENTIALS.usuario && pass === ADMIN_CREDENTIALS.contraseña) {
        adminLogueado = true;
        const modal = document.getElementById('loginModal');
        if (modal) modal.hidden = true;
        abrirAdmin();
        mostrarNotificacion('🔐 Sesión iniciada como administrador');
      } else {
        const err = document.getElementById('loginError');
        if (err) err.hidden = false;
        const passInput = document.getElementById('loginPass');
        if (passInput) { passInput.value = ''; passInput.focus(); }
      }
    });
  }

  // ── Cerrar modales con ESC ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const loginModal = document.getElementById('loginModal');
      if (loginModal) loginModal.hidden = true;
      const editModal = document.getElementById('editModal');
      if (editModal) editModal.hidden = true;
    }
  });

  // ── Modal de gracias (formulario reservas) ──
  const cerrarModalBtn = document.getElementById('cerrarModal');
  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener('click', function () {
      const modal = document.getElementById('modalGracias');
      if (modal) modal.hidden = true;
    });
  }

  window.addEventListener('click', function (event) {
    const modal = document.getElementById('modalGracias');
    if (modal && event.target === modal) modal.hidden = true;
  });

  console.log('🌿 Espacio Timbó · scripts.js cargado correctamente');
  console.log(`📦 ${(window.productos || []).length} productos en catálogo`);

// Listener de categorías (dropdown)
const selectCat = document.getElementById('filtroCategoria');
if (selectCat) {
  selectCat.addEventListener('change', function (e) {
    filtros.categoria = e.target.value;
    renderizarProductos();

    // Auto-cerrar sidebar en mobile
    if (window.innerWidth <= 900) {
      const sidebar = document.getElementById('catalogoSidebar');
      if (sidebar) sidebar.classList.remove('is-open');
    }
  });
}




});

/* ═══════════════════════════════════════════════════════════════
   16. ACCESO OCULTO AL ADMIN (Ctrl + Shift + A)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});

/* ─── TOGGLE DE FILTROS EN MOBILE ─── */
const sidebarToggle = document.getElementById('catalogoSidebarToggle');
const sidebar = document.getElementById('catalogoSidebar');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('is-open');
  });
}
