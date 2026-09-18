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
      ? t('tall.empty')
      : t('tall.empty.cat');
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
      ? t('cat.contador.1')
      : t('cat.contador').replace('{n}', filtrados.length);
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
    const stockBadge = tieneStock ? '' : `<span class="badge-sin-stock">${t('cat.stock')}</span>`;
    const botonAgregar = tieneStock
      ? `<button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">
          <i class="fas fa-plus"></i> ${t('cat.agregar')}
        </button>`
      : `<button class="btn-agregar btn-sin-stock" disabled>
          <i class="fas fa-times"></i> ${t('cat.no.disponible')}
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
    lista.innerHTML = `<p class="carrito-vacio">${t('carrito.vacio')}</p>`;
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

  const nombre  = (document.getElementById('carrito-nombre')?.value || '').trim();
  const email   = (document.getElementById('carrito-email')?.value || '').trim();
  const celular = (document.getElementById('carrito-celular')?.value || '').trim();

  // Validación básica
  if (!nombre) {
    mostrarNotificacion('⚠️ Por favor, ingresá tu nombre y apellido');
    document.getElementById('carrito-nombre')?.focus();
    return;
  }
  if (!email) {
    mostrarNotificacion('⚠️ Por favor, ingresá tu email');
    document.getElementById('carrito-email')?.focus();
    return;
  }
  // Validación simple de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarNotificacion('⚠️ El email no parece válido');
    document.getElementById('carrito-email')?.focus();
    return;
  }
  if (!celular) {
    mostrarNotificacion('⚠️ Por favor, ingresá tu celular');
    document.getElementById('carrito-celular')?.focus();
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
  mensaje += `  • Nombre y apellido: ${nombre}\n`;
  mensaje += `  • Email: ${email}\n`;
  mensaje += `  • Celular: ${celular}\n`;
  mensaje += '  • Método de pago preferido: \n\n';
  mensaje += '📝 OBSERVACIONES:\n  • \n\n';
  mensaje += '═'.repeat(40) + '\n';
  mensaje += '🌿 Gracias por elegir Espacio Timbó\n';
  mensaje += '📍 Santa Ana, Colonia, Uruguay\n';
  mensaje += '📧 espaciotimbo.uy@gmail.com\n';
  mensaje += '📱 +598 97 328 615';

  const asunto = encodeURIComponent('📦 Nuevo pedido de productos - Espacio Timbó');
  const cuerpo = encodeURIComponent(mensaje);
  const emailDestino = 'espaciotimbo.uy@gmail.com';

  window.location.href = `mailto:${emailDestino}?subject=${asunto}&body=${cuerpo}`;

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

/* ═══════════════════════════════════════════════════════════════
   17. SCROLL SUAVE CON INERCIA (VERSIÓN AJUSTADA)
   ═══════════════════════════════════════════════════════════════ */
(function initLenisScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Evitar doble inicialización
  if (window.__lenisInitialized) return;
  window.__lenisInitialized = true;

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lenis@1.1.14/dist/lenis.min.js';
  script.onload = () => {
    // Desactivar el scroll-behavior smooth del CSS si existe
    document.documentElement.style.scrollBehavior = 'auto';

    const lenis = new Lenis({
      duration: 1.0,            // 🔽 Más bajo = menos "frenado", más respuesta directa
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.4,      // 🔼 Más sensibilidad: la rueda responde mejor
      touchMultiplier: 1.8,
      infinite: false,
      autoResize: true,
      lerp: 0.12,                // 🔽 Un poco más directo que el default (0.1)
      syncTouch: false,          // En táctil, dejar el scroll nativo
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;

    // ── Integrar anclas del nav ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      });
    });

    // ── Sincronizar el nav con Lenis SIN forzar repintados ──
    let navRaf = null;
    let lastScroll = 0;
    lenis.on('scroll', ({ scroll }) => {
      lastScroll = scroll;
      if (navRaf) return;
      navRaf = requestAnimationFrame(() => {
        navRaf = null;
        if (window.nav) {
          window.nav.style.background = lastScroll > 60
            ? 'rgba(242,234,216,0.97)'
            : 'rgba(242,234,216,0.92)';
        }
      });
    });
  };
  document.head.appendChild(script);
})();

/* ═══════════════════════════════════════════════════════════════
   18. SISTEMA DE IDIOMAS (ES / EN) — VERSIÓN CON URL
   ═══════════════════════════════════════════════════════════════ */

// ⚠️ GLOBAL: fuera de IIFE para que aplicarIdioma sea accesible
var TRADUCCIONES = {
  es: {
    "nav.proyecto": "El Proyecto",
    "nav.glamping": "Glamping",
    "nav.servicios": "Servicios",
    "nav.talleres": "Talleres",
    "nav.catalogo": "Catálogo",
    "nav.quienes": "Quiénes somos",
    "nav.reservar": "Reservar",
    "hero.quote": '"Regenerar la tierra es también regenerar nuestra forma de habitarla."',
    "hero.cta1": "Reservar estadía",
    "hero.cta2": "Conocer el proyecto",
    "que.eyebrow": "— Qué es",
    "que.title": "Un proyecto<br><em>regenerativo</em>",
    "que.p1": "Espacio Timbó es un proyecto regenerativo ubicado en la costa de Colonia, Uruguay, que integra alojamiento, educación, arte, permacultura y diseño ecológico. Nació con el propósito de contribuir a la regeneración ecosocial del territorio que habitamos, promoviendo formas de vida en armonía con la naturaleza.",
    "que.p2": "Nuestro espacio está diseñado bajo principios de permacultura y regeneración, incorporando bioconstrucción, huerta orgánica, sistemas de saneamiento ecológico, manejo responsable de residuos y jardines que promueven la biodiversidad.",
    "que.p3": "Cada elemento del lugar busca demostrar que es posible habitar de manera consciente, reduciendo impactos y generando beneficios para la tierra y la comunidad.",
    "frase": '"Ponemos la vida en el centro para regenerar el territorio que habitamos y el vínculo que tenemos con él."',
    "glamping.eyebrow": "- Habitar la naturaleza",
    "glamping.title": " Glamping<br><em>Regenerativo</em>",
    "glamping.p1": "Entre el bosque, el río y la playa de Santa Ana, ofrecemos experiencias de alojamiento en yurtas construidas artesanalmente con materiales naturales y reciclables.",
    "glamping.p2": "Contamos con dos yurtas equipadas con cocina y baño privado, calefacción, ventilación y espacios exteriores para descansar, contemplar la naturaleza y compartir alrededor del fuego.",
    "glamping.p3": "La experiencia incluye recorrer el bosque y el río de Santa Ana, disfrutar de la playa, visitar la huerta agroecológica y participar en talleres de prácticas regenerativas.",
    "glamping.cta": "Ver disponibilidad",
    "glamping.yurta1.title": "Yurta Ceibo",
    "glamping.yurta1.p1": "Una experiencia de alojamiento más abierta y luminosa, ideal para compartir momentos de pausa y observación.",
    "glamping.yurta1.p2": "Su diseño favorece la ventilación, el descanso y el encuentro con el entorno natural que la rodea.",
    "glamping.yurta1.li1": "Diseño acogedor con ventilación natural",
    "glamping.yurta1.li2": "Zona de descanso y lectura en entorno tranquilo",
    "glamping.yurta1.li3": "Baño privado con atención al detalle",
    "glamping.yurta1.li4": "Vista al conjunto de huerta y bosque cercano",
    "glamping.yurta2.title": "Yurta Canelón",
    "glamping.yurta2.p1": "Un refugio cálido y sereno pensado para dos personas, con un ritmo pausado y una mirada hacia el bosque.",
    "glamping.yurta2.p2": "La propuesta combina descanso, lectura y conexión directa con la naturaleza desde una base sencilla y elegante.",
    "glamping.yurta2.li1": "Cocina compacta con equipamiento esencial",
    "glamping.yurta2.li2": "Baño privado y calefacción para noches frescas",
    "glamping.yurta2.li3": "Espacio exterior para contemplar el paisaje",
    "glamping.yurta2.li4": "Ambiente íntimo para una estadía tranquila",
    "serv.eyebrow": "— Servicios & Experiencias",
    "serv.title": "Un espacio vivo de<br><em>aprendizaje y cultura</em>",
    "serv.p": "Desarrollamos propuestas que integran naturaleza, regeneración, aprendizaje, cultura y bienestar, fortaleciendo el vínculo entre las personas y el territorio.",
    "serv.1.t": "Talleres & Experiencias Regenerativas",
    "serv.1.d": "Talleres y recorridos vinculados a la permacultura, bioconstrucción, huerta agroecológica, plantas medicinales y regeneración de ecosistemas.",
    "serv.2.t": "Actividades Culturales y Artísticas",
    "serv.2.d": "Encuentros culturales, exposiciones, conversatorios y talleres creativos que fortalecen el tejido comunitario y el intercambio de saberes.",
    "serv.3.t": "Bosque-Huerta Agroecológica",
    "serv.3.d": "Espacio de encuentro con productos artesanales, alimentos locales y emprendimientos de economía local y consumo consciente.",
    "serv.4.t": "Voluntariado",
    "serv.4.d": "Espacio de encuentro con productos artesanales, alimentos locales y emprendimientos de economía local y consumo consciente.",
    "serv.5.t": "Visitas guiadas",
    "serv.5.d": "Espacio de encuentro con productos artesanales, alimentos locales y emprendimientos de economía local y consumo consciente.",
    "serv.6.t": "Café & Tienda Consciente",
    "serv.6.d": "Espacio de encuentro con productos artesanales, alimentos locales y emprendimientos de economía local y consumo consciente.",
    "tall.eyebrow": "— Talleres & Eventos",
    "tall.title": "Próximas<br><em>experiencias</em>",
    "tall.p": "Talleres, encuentros y experiencias para conectar con la tierra, los saberes y la comunidad. Cupos limitados.",
    "tall.filtro.todos": "Todos",
    "tall.filtro.taller": "Talleres",
    "tall.filtro.evento": "Eventos",
    "tall.filtro.experiencia": "Experiencias",
    "tall.empty": "Por el momento no hay talleres ni eventos programados. Seguinos en Instagram para enterarte de las próximas actividades.",
    "tall.empty.cat": "No hay actividades programadas en esta categoría por el momento.",
    "cat.eyebrow": "— Productos",
    "cat.title": "Nuestro<br><em>catálogo</em>",
    "cat.p": "Productos elaborados con amor y respeto por la naturaleza. <br> Hechos a mano con ingredientes naturales y procesos artesanales.",
    "cat.buscar": "Buscar:",
    "cat.buscar.ph": "Nombre o descripción...",
    "cat.categoria": "Categoría:",
    "cat.cat.todos": "Todas las categorías",
    "cat.cat.aceites": "Aceites",
    "cat.cat.pomadas": "Pomadas",
    "cat.cat.jabones": "Jabones",
    "cat.cat.tinturas": "Tinturas",
    "cat.cat.sahunos": "Sahúmos",
    "cat.cat.hierbas": "Hierbas Medicinales",
    "cat.cat.semillas": "Semillas y Plantines",
    "cat.orden": "Ordenar por:",
    "cat.orden.relevancia": "Relevancia",
    "cat.orden.nombre-asc": "Nombre (A–Z)",
    "cat.orden.nombre-desc": "Nombre (Z–A)",
    "cat.orden.precio-asc": "Precio (menor a mayor)",
    "cat.orden.precio-desc": "Precio (mayor a menor)",
    "cat.reset": "Limpiar filtros",
    "cat.contador": "Mostrando {n} productos",
    "cat.contador.1": "Mostrando 1 producto",
    "cat.vacio.t": "No encontramos productos",
    "cat.vacio.p": "Probá con otros filtros o limpiá la búsqueda.",
    "cat.vacio.btn": "Ver todos los productos",
    "cat.stock": "Sin stock",
    "cat.agregar": "Agregar",
    "cat.no.disponible": "No disponible",
    "quienes.eyebrow": "— Quiénes somos",
    "quienes.title": "Julia &<br><em>Martín</em>",
    "quienes.p1": "Espacio Timbó nació en 2019 como un proyecto de vida familiar impulsado por el deseo de encontrar formas más conscientes y regenerativas de habitar el mundo. Desde entonces, hemos dedicado nuestro tiempo y energía a diseñar, construir y cuidar este territorio.",
    "quienes.p2": "Creemos en una forma de vida basada en la simplicidad, la autosuficiencia, la recuperación de saberes y oficios tradicionales, y el aprendizaje continuo junto a la naturaleza.",
    "quienes.quote": '"Un proyecto de vida que nace del deseo de vivir en coherencia con nuestros valores."',
    "res.eyebrow": "— Reseñas",
    "res.title": " Lo que dicen nuestros <br><em>huéspedes</em>",
    "res.btn": "Ver todas las reseñas",
    "reservas.eyebrow": "— Reservas",
    "reservas.title": "Planificá<br><em>tu experiencia</em>",
    "reservas.checkin": "Check-in / Check-out",
    "reservas.min": "Estadía mínima",
    "reservas.p": "Verificá la disponibilidad de las yurtas y envianos tu solicitud.<br> Te respondemos en menos de 24 horas.",
    "reservas.yurta.eyebrow": "— Elegí tu yurta y fechas",
    "reservas.yurta1": "Yurta Ceibo",
    "reservas.yurta2": "Yurta Canelón",
    "reservas.personas": "2 personas",
    "reservas.sync": "Sincronizado",
    "reservas.leyenda.libre": "Disponible",
    "reservas.leyenda.ocupado": "Ocupado",
    "reservas.leyenda.sel": "Seleccionado",
    "reservas.llegada": "Llegada",
    "reservas.salida": "Salida",
    "reservas.noches": "Noches",
    "reservas.form.eyebrow": "— Solicitud de reserva",
    "reservas.form.nombre": "Nombre completo *",
    "reservas.form.nombre.ph": "Tu nombre",
    "reservas.form.email": "Correo electrónico *",
    "reservas.form.email.ph": "tu@correo.com",
    "reservas.form.whatsapp": "WhatsApp / Teléfono",
    "reservas.form.personas": "Cantidad de personas",
    "reservas.form.personas.sel": "Seleccionar",
    "reservas.form.personas.1": "1 persona",
    "reservas.form.personas.2": "2 personas",
    "reservas.form.personas.3": "3–4 personas (2 yurtas)",
    "reservas.form.yurta": "Yurta seleccionada",
    "reservas.form.yurta.ph": "Elegí una yurta →",
    "reservas.form.noches": "Cantidad de noches",
    "reservas.form.llegada": "Fecha de llegada",
    "reservas.form.llegada.ph": "Seleccioná en el calendario",
    "reservas.form.salida": "Fecha de salida",
    "reservas.form.pago": "Método de pago para la seña",
    "reservas.form.mensaje": "Mensaje",
    "reservas.form.mensaje.ph": "Contanos sobre tu visita, preguntas o lo que necesites saber…",
    "reservas.form.submit": "Enviar reserva",
    "reservas.form.note": "Respondemos en menos de 24 horas por correo o WhatsApp.",
    "reservas.pago.t": "Seña para confirmar reserva",
    "reservas.pago.p": "Para confirmar tu reserva se requiere abonar el <strong>50% del total por adelantado</strong>. El saldo restante se abona al momento del check-in. Una vez recibida tu consulta te enviamos el monto y el link de pago correspondiente.",
    "reservas.pago.nota": "Podés indicar tu método preferido en el mensaje o seleccionarlo arriba, antes de enviar la solicitud.",
    "reservas.success": "¡Gracias por tu reserva! Te responderemos pronto para confirmar disponibilidad.",
    "contacto.eyebrow": "— Contacto",
    "contacto.title": "Hablemos",
    "carrito.t": "🛒 Tu Carrito",
    "carrito.vacio": "El carrito está vacío",
    "carrito.total": "Total:",
    "carrito.enviar": "Enviar pedido por email",
    "footer.copy": "© 2025 Espacio Timbó · Santa Ana, Colonia, Uruguay"
  },
  en: {
    "nav.proyecto": "The Project",
    "nav.glamping": "Glamping",
    "nav.servicios": "Services",
    "nav.talleres": "Workshops",
    "nav.catalogo": "Catalog",
    "nav.quienes": "About us",
    "nav.reservar": "Book now",
    "hero.quote": '"Regenerating the land is also regenerating the way we inhabit it."',
    "hero.cta1": "Book your stay",
    "hero.cta2": "Discover the project",
    "que.eyebrow": "— What is it",
    "que.title": "A <em>regenerative</em><br>project",
    "que.p1": "Espacio Timbó is a regenerative project located on the coast of Colonia, Uruguay, that integrates lodging, education, art, permaculture and ecological design. It was born with the purpose of contributing to the ecosocial regeneration of the territory we inhabit, promoting ways of life in harmony with nature.",
    "que.p2": "Our space is designed under permaculture and regeneration principles, incorporating natural building, organic farming, ecological sanitation systems, responsible waste management and gardens that promote biodiversity.",
    "que.p3": "Every element of the place seeks to demonstrate that it is possible to inhabit consciously, reducing impacts and generating benefits for the land and the community.",
    "frase": '"We put life at the center to regenerate the territory we inhabit and the bond we have with it."',
    "glamping.eyebrow": "— Inhabiting nature",
    "glamping.title": "Regenerative<br><em>Glamping</em>",
    "glamping.p1": "Between the forest, the river and Santa Ana beach, we offer lodging experiences in yurts handcrafted with natural and recyclable materials.",
    "glamping.p2": "We have two yurts equipped with a kitchen and private bathroom, heating, ventilation and outdoor spaces to rest, contemplate nature and share around the fire.",
    "glamping.p3": "The experience includes exploring the forest and river of Santa Ana, enjoying the beach, visiting the agroecological garden and participating in regenerative practice workshops.",
    "glamping.cta": "Check availability",
    "glamping.yurta1.title": "Ceibo Yurt",
    "glamping.yurta1.p1": "A more open and luminous lodging experience, ideal for sharing moments of pause and observation.",
    "glamping.yurta1.p2": "Its design favors ventilation, rest and connection with the natural surroundings.",
    "glamping.yurta1.li1": "Cozy design with natural ventilation",
    "glamping.yurta1.li2": "Rest and reading area in a quiet environment",
    "glamping.yurta1.li3": "Private bathroom with attention to detail",
    "glamping.yurta1.li4": "View of the garden and nearby forest",
    "glamping.yurta2.title": "Canelón Yurt",
    "glamping.yurta2.p1": "A warm and serene refuge designed for two people, with a slow rhythm and a view towards the forest.",
    "glamping.yurta2.p2": "The proposal combines rest, reading and direct connection with nature from a simple and elegant base.",
    "glamping.yurta2.li1": "Compact kitchen with essential equipment",
    "glamping.yurta2.li2": "Private bathroom and heating for cool nights",
    "glamping.yurta2.li3": "Outdoor space to contemplate the landscape",
    "glamping.yurta2.li4": "Intimate atmosphere for a quiet stay",
    "serv.eyebrow": "— Services & Experiences",
    "serv.title": "A living space of<br><em>learning and culture</em>",
    "serv.p": "We develop proposals that integrate nature, regeneration, learning, culture and well-being, strengthening the bond between people and the territory.",
    "serv.1.t": "Regenerative Workshops & Experiences",
    "serv.1.d": "Workshops and tours related to permaculture, natural building, agroecological gardening, medicinal plants and ecosystem regeneration.",
    "serv.2.t": "Cultural and Artistic Activities",
    "serv.2.d": "Cultural gatherings, exhibitions, talks and creative workshops that strengthen the community fabric and the exchange of knowledge.",
    "serv.3.t": "Agroecological Forest-Garden",
    "serv.3.d": "A meeting space with artisanal products, local food and local economy and conscious consumption ventures.",
    "serv.4.t": "Volunteering",
    "serv.4.d": "A meeting space with artisanal products, local food and local economy and conscious consumption ventures.",
    "serv.5.t": "Guided visits",
    "serv.5.d": "A meeting space with artisanal products, local food and local economy and conscious consumption ventures.",
    "serv.6.t": "Conscious Café & Shop",
    "serv.6.d": "A meeting space with artisanal products, local food and local economy and conscious consumption ventures.",
    "tall.eyebrow": "— Workshops & Events",
    "tall.title": "Upcoming<br><em>experiences</em>",
    "tall.p": "Workshops, gatherings and experiences to connect with the land, knowledge and community. Limited spots.",
    "tall.filtro.todos": "All",
    "tall.filtro.taller": "Workshops",
    "tall.filtro.evento": "Events",
    "tall.filtro.experiencia": "Experiences",
    "tall.empty": "There are no workshops or events scheduled at the moment. Follow us on Instagram to find out about upcoming activities.",
    "tall.empty.cat": "No activities scheduled in this category at the moment.",
    "cat.eyebrow": "— Products",
    "cat.title": "Our<br><em>catalog</em>",
    "cat.p": "Products made with love and respect for nature. <br> Handmade with natural ingredients and artisanal processes.",
    "cat.buscar": "Search:",
    "cat.buscar.ph": "Name or description...",
    "cat.categoria": "Category:",
    "cat.cat.todos": "All categories",
    "cat.cat.aceites": "Oils",
    "cat.cat.pomadas": "Ointments",
    "cat.cat.jabones": "Soaps",
    "cat.cat.tinturas": "Tinctures",
    "cat.cat.sahunos": "Smudge sticks",
    "cat.cat.hierbas": "Medicinal Herbs",
    "cat.cat.semillas": "Seeds and Seedlings",
    "cat.orden": "Sort by:",
    "cat.orden.relevancia": "Relevance",
    "cat.orden.nombre-asc": "Name (A–Z)",
    "cat.orden.nombre-desc": "Name (Z–A)",
    "cat.orden.precio-asc": "Price (low to high)",
    "cat.orden.precio-desc": "Price (high to low)",
    "cat.reset": "Clear filters",
    "cat.contador": "Showing {n} products",
    "cat.contador.1": "Showing 1 product",
    "cat.vacio.t": "No products found",
    "cat.vacio.p": "Try other filters or clear the search.",
    "cat.vacio.btn": "See all products",
    "cat.stock": "Out of stock",
    "cat.agregar": "Add",
    "cat.no.disponible": "Not available",
    "quienes.eyebrow": "— About us",
    "quienes.title": "Julia &<br><em>Martín</em>",
    "quienes.p1": "Espacio Timbó was born in 2019 as a family life project driven by the desire to find more conscious and regenerative ways of inhabiting the world. Since then, we have dedicated our time and energy to designing, building and caring for this territory.",
    "quienes.p2": "We believe in a way of life based on simplicity, self-sufficiency, the recovery of traditional knowledge and crafts, and continuous learning alongside nature.",
    "quienes.quote": '"A life project born from the desire to live in coherence with our values."',
    "res.eyebrow": "— Reviews",
    "res.title": "What our<br><em>guests</em> say",
    "res.btn": "See all reviews",
    "reservas.eyebrow": "— Bookings",
    "reservas.title": "Plan<br><em>your experience</em>",
    "reservas.checkin": "Check-in / Check-out",
    "reservas.min": "Minimum stay",
    "reservas.p": "Check yurt availability and send us your request.<br> We reply in less than 24 hours.",
    "reservas.yurta.eyebrow": "— Choose your yurt and dates",
    "reservas.yurta1": "Ceibo Yurt",
    "reservas.yurta2": "Canelón Yurt",
    "reservas.personas": "2 people",
    "reservas.sync": "Synced",
    "reservas.leyenda.libre": "Available",
    "reservas.leyenda.ocupado": "Booked",
    "reservas.leyenda.sel": "Selected",
    "reservas.llegada": "Arrival",
    "reservas.salida": "Departure",
    "reservas.noches": "Nights",
    "reservas.form.eyebrow": "— Booking request",
    "reservas.form.nombre": "Full name *",
    "reservas.form.nombre.ph": "Your name",
    "reservas.form.email": "Email *",
    "reservas.form.email.ph": "you@email.com",
    "reservas.form.whatsapp": "WhatsApp / Phone",
    "reservas.form.personas": "Number of guests",
    "reservas.form.personas.sel": "Select",
    "reservas.form.personas.1": "1 person",
    "reservas.form.personas.2": "2 people",
    "reservas.form.personas.3": "3–4 people (2 yurts)",
    "reservas.form.yurta": "Selected yurt",
    "reservas.form.yurta.ph": "Choose a yurt →",
    "reservas.form.noches": "Number of nights",
    "reservas.form.llegada": "Arrival date",
    "reservas.form.llegada.ph": "Select on the calendar",
    "reservas.form.salida": "Departure date",
    "reservas.form.pago": "Payment method for the deposit",
    "reservas.form.mensaje": "Message",
    "reservas.form.mensaje.ph": "Tell us about your visit, questions or anything you need to know…",
    "reservas.form.submit": "Send booking",
    "reservas.form.note": "We reply in less than 24 hours by email or WhatsApp.",
    "reservas.pago.t": "Deposit to confirm booking",
    "reservas.pago.p": "To confirm your booking, a <strong>50% deposit in advance</strong> is required. The remaining balance is paid at check-in. Once we receive your request, we will send you the amount and the corresponding payment link.",
    "reservas.pago.nota": "You can indicate your preferred method in the message or select it above, before sending the request.",
    "reservas.success": "Thank you for your booking! We will reply soon to confirm availability.",
    "contacto.eyebrow": "— Contact",
    "contacto.title": "Let's talk",
    "carrito.t": "🛒 Your Cart",
    "carrito.vacio": "Your cart is empty",
    "carrito.total": "Total:",
    "carrito.enviar": "Send order by email",
    "footer.copy": "© 2025 Espacio Timbó · Santa Ana, Colonia, Uruguay"
  }
};

var idiomaActual = localStorage.getItem('timbo_idioma') || 'es';

function t(key) {
  return (TRADUCCIONES[idiomaActual] && TRADUCCIONES[idiomaActual][key]) || TRADUCCIONES.es[key] || key;
}

function detectarIdiomaPorURL() {
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/es')) return 'es';
  return null;
}

function aplicarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem('timbo_idioma', lang);

  document.documentElement.lang = lang;

  // Cambiar la URL para que sea compartible
  let basePath = window.location.pathname
    .replace(/\/en\/?$/, '')
    .replace(/\/es\/?$/, '')
    .replace(/\/$/, ''); // quitar slash final si quedó uno

  const newPath = lang === 'en' ? `${basePath}/en` : (basePath || '/');

  if (window.location.pathname !== newPath) {
    window.history.pushState({ lang }, '', newPath);
  }

  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) el.innerHTML = translation;
  });

  // Actualizar placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) el.placeholder = translation;
  });

  // Actualizar el botón del selector
  const langBtn = document.getElementById('navLangCurrent');
  if (langBtn) langBtn.textContent = lang.toUpperCase();

  // Actualizar opciones activas del menú
  document.querySelectorAll('.nav-lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-renderizar componentes dinámicos
  if (typeof renderEventos === 'function') renderEventos('todos');
  if (typeof renderizarProductos === 'function') renderizarProductos();
  if (typeof actualizarCarrito === 'function') actualizarCarrito();
  if (typeof renderCalendario === 'function') renderCalendario();

  // Cerrar menú
  const langWrapper = document.getElementById('navLang');
  if (langWrapper) langWrapper.classList.remove('open');
}

function initLangSelector() {
  const langWrapper = document.getElementById('navLang');
  const langBtn = document.getElementById('navLangBtn');
  const langMenu = document.getElementById('navLangMenu');
  if (!langWrapper || !langBtn || !langMenu) return;

  // Toggle del menú de idiomas — independiente del hamburger
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isOpen = langWrapper.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Selección de idioma
  langMenu.querySelectorAll('.nav-lang-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const lang = btn.dataset.lang;
      langWrapper.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      aplicarIdioma(lang);
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!langWrapper.contains(e.target)) {
      langWrapper.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      langWrapper.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Prioridad: URL > localStorage > español
  const urlLang = detectarIdiomaPorURL();
  const langFinal = urlLang || localStorage.getItem('timbo_idioma') || 'es';
  aplicarIdioma(langFinal);

  // Botón atrás del navegador
  window.addEventListener('popstate', () => {
    const urlLang = detectarIdiomaPorURL();
    if (urlLang) aplicarIdioma(urlLang);
  });
}

// Exponer globalmente por si se llama desde HTML
window.aplicarIdioma = aplicarIdioma;
window.t = t;
window.initLangSelector = initLangSelector;
window.detectarIdiomaPorURL = detectarIdiomaPorURL;

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initLangSelector);