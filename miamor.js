/* =========================================
   LÓGICA INTERACTIVA - TEMA CARS
   =========================================
   Solamente inicia el contador desde que arranca la página, tienes el derecho a reiniciarlo 
   no hay una fecha específica de lo nuestro, cuando haya una la pondré mi amor
   ========================================= */

// ---------- CONFIGURACIÓN ----------
const CLAVE = 'inicio_mi_amor';

function obtenerInicio() {
    let inicio = localStorage.getItem(CLAVE);
    if (!inicio) {
        inicio = Date.now();                 // Primer arranque: "desde ahora"
        localStorage.setItem(CLAVE, inicio);
    }
    return new Date(Number(inicio));
}

const INICIO = obtenerInicio();

// Frases para mi rayomcqueen
const FRASES = [
    "“Ka-chow! Eres lo mejor que me ha pasado”",
    "“McQueen ganó desde que conoció a sally, y yo gané desde que te conocí a ti”",
    "“Eres todo para mí”",
    "“El rayo de luz en mi vida eres tú, mi 95🗲”",
    "“Como Rayo a Radiador Springs: contigo encontré mi hogar”",
    "“Tantas razones para poder decirte que sí y no desaprovecharé ninguna”",
    "“95 razones tengo para amarte, una por cada día”",
    "“Contigo, todo es bonito”",
    "“Mi corazón es solo para ti”",
    "“Eres todo lo que está bien en la vida, te amo❤️”"
];

// Mensajes de mi corazón
const MENSAJES_CORAZON = [
    "¡Te mereces la copa pistón, amor, por ser el mejor! 🏆",
    "¡KACHOW! Dirías tú mi niño  ⚡",
    "TEAmo autista (te gustan los autos) y a mí me gustas tú🏎️",
    "Seamos felices Diego💓",
    "Contigo sí a todo ❤️"
    ];

// ---------- CONTADOR DE TIEMPO JUNTOS ----------
function actualizarContador() {
    const ahora = new Date();
    const diff = Math.max(0, ahora - INICIO);

    const dias     = Math.floor(diff / 86400000);
    const horas    = Math.floor(diff / 3600000) % 24;
    const minutos  = Math.floor(diff / 60000) % 60;
    const segundos = Math.floor(diff / 1000) % 60;

    document.getElementById('dias').textContent     = dias;
    document.getElementById('horas').textContent    = horas;
    document.getElementById('minutos').textContent  = minutos;
    document.getElementById('segundos').textContent = segundos;
}

// ---------- DÍAS QUE FALTAN PARA LOS 365 DEL AÑO ----------
function actualizarDiasDelAno() {
    const hoy = new Date();
    const finDeAno = new Date(hoy.getFullYear(), 11, 31, 23, 59, 59);
    const restantes = Math.ceil((finDeAno - hoy) / 86400000);

    document.getElementById('dias-restantes').textContent = restantes;

    // El 31 de diciembre cambia sola la frase
    if (restantes === 1) {
        document.getElementById('frase-anual').innerHTML =
            'Último día del año y te amé cada segundo de los 365 ❤️';
    }
}
// ---------- BOTÓN: REINICIAR TIEMPO ----------
document.getElementById('boton-reinicio').addEventListener('click', () => {
    const confirmar = confirm(
        "¿Seguro que quieres reiniciar el contador del amor? 🏎️\n" +
        "Empezará a contar desde cero en este momento."
    );

    if (confirmar) {
        // Borrar la fecha guardada y arrancar desde ahora
        localStorage.removeItem(CLAVE);
        localStorage.setItem(CLAVE, Date.now());

        // Actualizar la variable de inicio sin recargar la página
       let INICIO = obtenerInicio();

        actualizarContador();
        mostrarMensaje("⏱️ ¡Contador reiniciado! El amor va de nuevo a fondo ⚡");
        lanzarCorazones(10);
    }
});

setInterval(actualizarContador, 1000);
actualizarContador();
actualizarDiasDelAno();
setInterval(actualizarDiasDelAno, 60000);

// ---------- FRASE ROMÁNTICA ROTATIVA ----------
const fraseEl = document.getElementById('frase-romantica');
let indiceFrase = 0;

function cambiarFrase() {
    fraseEl.style.opacity = 0;
    setTimeout(() => {
        indiceFrase = (indiceFrase + 1) % FRASES.length;
        fraseEl.textContent = FRASES[indiceFrase];
        fraseEl.style.opacity = 1;
    }, 400);
}
setInterval(cambiarFrase, 8000);

// ---------- BOTÓN: SORPRÉNDEME ----------
document.getElementById('boton-fAmor').addEventListener('click', () => {
    cambiarFrase();
    lanzarCorazones(6);
});

// ---------- BOTÓN: MÚSICA ----------
const musica = document.getElementById('musica');
document.getElementById('boton-musica').addEventListener('click', function () {
    if (musica.paused) {
        musica.play().catch(() => {
            mostrarMensaje("🎵 Coloca un archivo 'te-amo-diego.gg' en la carpeta para la música");
        });
        this.textContent = "⏸️ Pausar";
    } else {
        musica.pause();
        this.textContent = "🎵 Música";
    }
});

// ---------- BOTÓN: DALE CORAZÓN ----------
document.getElementById('boton-corazon').addEventListener('click', () => {
    const msg = MENSAJES_CORAZON[Math.floor(Math.random() * MENSAJES_CORAZON.length)];
    mostrarMensaje(msg);
    lanzarCorazones(12);
});

// El corazón también responde al clic
document.querySelector('.heart').addEventListener('click', () => {
    mostrarMensaje("¡Mi corazón es solo para ti! ❤️");
    lanzarCorazones(8);
});

// ---------- MENSAJE SECRETO ----------
let timerMensaje = null;
function mostrarMensaje(texto) {
    const el = document.getElementById('mensaje-secreto');
    el.textContent = texto;
    el.classList.add('visible');
    clearTimeout(timerMensaje);
    timerMensaje = setTimeout(() => el.classList.remove('visible'), 4000);
}

// ---------- CORAZONES FLOTANTES (por clics) ----------
function lanzarCorazones(cantidad) {
    const iconos = ['❤️', '💛', '⚡', '🏎️', '🏆', '💖'];
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'corazon-flotante';
            c.textContent = iconos[Math.floor(Math.random() * iconos.length)];
            c.style.left = Math.random() * 95 + 'vw';
            c.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            c.style.animationDuration = (3 + Math.random() * 2) + 's';
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 5000);
        }, i * 150);
    }
}

// ---------- VELOCÍMETRO DEL AMOR ----------
const barra = document.getElementById('barra-relleno');
const velocidadEl = document.getElementById('velocidad');
let direccion = 1, velocidad = 20;

setInterval(() => {
    velocidad += direccion * 2;
    if (velocidad >= 100) { velocidad = 100; direccion = -1; }
    if (velocidad <= 20)  { velocidad = 20;  direccion = 1; }
    barra.style.width = velocidad + '%';
    velocidadEl.textContent = velocidad * 9; // hasta 810 km/h, jeje
}, 150);

// ---------- CARTA DE AMOR ----------
const overlay = document.getElementById('carta-overlay');
const botonCarta = document.getElementById('boton-carta');
const botonCerrar = document.getElementById('carta-cerrar');

botonCarta.addEventListener('click', () => {
    overlay.classList.add('abierta');
    lanzarCorazones(10);
});

botonCerrar.addEventListener('click', () => overlay.classList.remove('abierta'));

// Cerrar haciendo clic fuera de la carta
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('abierta');
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('abierta');
});

// ---------- CORAZONES EN EL FONDO (canvas) ----------
const canvas = document.getElementById('corazones');
const ctx = canvas.getContext('2d');
let corazones = [];

// Paleta: rojos y rosas
const PALETA = ['#ff1e56', '#ff4d6d', '#ff85a1', '#ffb3c6', '#e10600', '#ff6b8a'];

function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionar);
redimensionar();

// Dibuja un corazón en la posición (x, y) con el tamaño indicado
function dibujarCorazon(x, y, size, color, opacidad) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.globalAlpha = opacidad;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.bezierCurveTo(0, 1, -2, -2, -4, -2);   // lóbulo izquierdo
    ctx.bezierCurveTo(-8, -2, -8, 3, -8, 3);
    ctx.bezierCurveTo(-8, 6, -4, 9, 0, 12);    // punta inferior
    ctx.bezierCurveTo(4, 9, 8, 6, 8, 3);
    ctx.bezierCurveTo(8, 3, 8, -2, 4, -2);     // lóbulo derecho
    ctx.bezierCurveTo(2, -2, 0, 1, 0, 3);
    ctx.fill();
    ctx.restore();
}

function crearCorazon() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 30,                       // nacen abajo
        vy: -(0.6 + Math.random() * 1.4),            // suben lento
        vx: (Math.random() - 0.5) * 0.8,             // deriva lateral
        size: 0.4 + Math.random() * 1.1,             // tamaños variados
        vida: 1,
        color: PALETA[Math.floor(Math.random() * PALETA.length)],
        pulso: Math.random() * Math.PI * 2           // fase de latido
    };
}

function animarCorazones() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mantener entre 40 y 60 corazones en pantalla
    if (corazones.length < 55) corazones.push(crearCorazon());

    corazones = corazones.filter(c => c.vida > 0 && c.y > -60);

    for (const c of corazones) {
        c.pulso += 0.05;
        c.x += c.vx + Math.sin(c.pulso) * 0.4;       // balanceo suave
        c.y += c.vy;
        c.vida -= 0.002;                             // se desvanecen al subir

        // Efecto latido: escala oscila ligeramente
        const escala = c.size * (1 + Math.sin(c.pulso) * 0.1);
        dibujarCorazon(c.x, c.y, escala, c.color, Math.max(0, Math.min(1, c.vida)));
    }
    requestAnimationFrame(animarCorazones);
}
animarCorazones();

// ---------- MENSAJE DE BIENVENIDA ----------
window.addEventListener('load', () => {
    setTimeout(() => mostrarMensaje("⚡ ¡Ka-chow! Esto es solo para ti, por ti, te amo ⚡"), 1200);
});
// ---------- ÁLBUM DE AMOR ----------
// Las fotos se guardan en el navegador (localStorage) para que persistan
const CLAVE_FOTOS = 'album_mi_amor';
const MAX_FOTOS = 24; // límite por espacio de almacenamiento del navegador

let fotos = JSON.parse(localStorage.getItem(CLAVE_FOTOS) || '[]');

const inputFotos   = document.getElementById('input-fotos');
const botonSubir   = document.getElementById('boton-subir');
const pieFotoInput = document.getElementById('pie-foto');
const albumGrid    = document.getElementById('album-grid');
const albumVacio   = document.getElementById('album-vacio');

function guardarFotos() {
    try {
        localStorage.setItem(CLAVE_FOTOS, JSON.stringify(fotos));
    } catch (e) {
        mostrarMensaje("📸 El álbum está lleno (espacio del navegador). Borra alguna foto.");
    }
}

function renderizarAlbum() {
    albumGrid.innerHTML = '';
    albumVacio.style.display = fotos.length === 0 ? 'block' : 'none';

    fotos.forEach((foto, indice) => {
        const div = document.createElement('div');
        div.className = 'album-foto';

        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.pie || 'Nuestra foto';

        const pie = document.createElement('div');
        pie.className = 'pie';
        pie.textContent = foto.pie || 'Te amo ❤️';

        const borrar = document.createElement('button');
        borrar.className = 'borrar-foto';
        borrar.textContent = '🗑';
        borrar.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('¿Borrar esta foto del álbum?')) {
                fotos.splice(indice, 1);
                guardarFotos();
                renderizarAlbum();
            }
        });

        div.appendChild(img);
        div.appendChild(pie);
        div.appendChild(borrar);

        // Al hacer clic: abrir la foto ampliada
        div.addEventListener('click', () => abrirFoto(indice));

        albumGrid.appendChild(div);
    });
}

// Subir fotos (una o varias a la vez)
botonSubir.addEventListener('click', () => inputFotos.click());

inputFotos.addEventListener('change', () => {
    const archivos = Array.from(inputFotos.files);
    if (archivos.length === 0) return;

    let pendientes = archivos.length;

    archivos.forEach(archivo => {
        if (fotos.length >= MAX_FOTOS) {
            pendientes--;
            if (pendientes === 0) {
                mostrarMensaje(`📸 Máximo ${MAX_FOTOS} fotos por el espacio del navegador`);
                return;
            }
        }

        const lector = new FileReader();
        lector.onload = (e) => {
            fotos.push({
                src: e.target.result,
                pie: pieFotoInput.value.trim()
            });
            pendientes--;
            if (pendientes === 0) {
                guardarFotos();
                renderizarAlbum();
                mostrarMensaje("📸 ¡Foto guardada en nuestros momentos! ❤️");
                lanzarCorazones(8);
                pieFotoInput.value = '';
                inputFotos.value = '';
            }
        };
        lector.readAsDataURL(archivo);
    });
});

// ---------- VISOR AMPLIADO ----------
const fotoOverlay  = document.getElementById('foto-overlay');
const fotoGrande   = document.getElementById('foto-grande');
const pieGrande    = document.getElementById('pie-grande');
let fotoActual = 0;

function abrirFoto(indice) {
    fotoActual = indice;
    fotoGrande.src = fotos[indice].src;
    pieGrande.textContent = fotos[indice].pie || 'Acá subiré cada autistada tuya ❤️';
    fotoOverlay.classList.add('abierta');
    lanzarCorazones(5);
}

document.getElementById('cerrar-foto').addEventListener('click', () =>
    fotoOverlay.classList.remove('abierta')
);

fotoOverlay.addEventListener('click', (e) => {
    if (e.target === fotoOverlay) fotoOverlay.classList.remove('abierta');
});

document.addEventListener('keydown', (e) => {
    if (!fotoOverlay.classList.contains('abierta')) return;
    if (e.key === 'Escape') fotoOverlay.classList.remove('abierta');
    if (e.key === 'ArrowRight') siguienteFoto();
    if (e.key === 'ArrowLeft')  anteriorFoto();
});

function siguienteFoto() {
    if (fotos.length === 0) return;
    fotoActual = (fotoActual + 1) % fotos.length;
    abrirFoto(fotoActual);
}

function anteriorFoto() {
    if (fotos.length === 0) return;
    fotoActual = (fotoActual - 1 + fotos.length) % fotos.length;
    abrirFoto(fotoActual);
}

document.getElementById('foto-siguiente').addEventListener('click', siguienteFoto);
document.getElementById('foto-anterior').addEventListener('click', anteriorFoto);

// Renderizar el álbum al cargar la página
renderizarAlbum();