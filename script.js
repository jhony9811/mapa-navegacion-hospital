// ==========================================================
// MAPA DE NAVEGACIÓN – HOSPITAL
// SCRIPT.JS COMPLETO
// ==========================================================


// ==========================================================
// 1. ELEMENTOS PRINCIPALES
// ==========================================================

const tituloInfo =
    document.getElementById("titulo-info");

const textoInfo =
    document.getElementById("texto-info");

const panelInfo =
    document.getElementById("panel-info");

const pacienteMuletas =
    document.getElementById("persona-muletas");

const pacienteSentado =
    document.getElementById("persona-sentado");

const pacienteSilla =
    document.getElementById("persona-silla");


// ==========================================================
// 2. VARIABLES DE CONTROL
// ==========================================================

let sillaEnMovimiento = false;

let pasoActual = 0;

let temporizadorMuletas = null;


// ==========================================================
// 3. MOSTRAR INFORMACIÓN
// ==========================================================

function mostrarInfo(titulo, texto) {

    if (tituloInfo) {
        tituloInfo.textContent = titulo;
    }

    if (textoInfo) {
        textoInfo.textContent = texto;
    }

    if (panelInfo) {

        panelInfo.classList.remove("activo");

        void panelInfo.offsetWidth;

        panelInfo.classList.add("activo");
    }
}


// ==========================================================
// 4. FUNCIÓN DE ESPERA
// ==========================================================

function esperar(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


// ==========================================================
// 5. POSICIONES DEL PACIENTE CON MULETAS
// ==========================================================

const rutaMuletas = {

    1: {
        left: "10.5%",
        top: "42.7%"
    },

    2: {
        left: "25%",
        top: "42.7%"
    },

    3: {
        left: "39%",
        top: "42.7%"
    },

    4: {
        left: "53%",
        top: "42.2%"
    },

    5: {
        left: "68%",
        top: "42.2%"
    },

    6: {
        left: "89%",
        top: "42.7%"
    }

};


// ==========================================================
// 6. INFORMACIÓN DE LOS PASOS
// ==========================================================

const informacionPasos = {

    1: {
        titulo:
            "Paso 1 – Entrada principal",

        texto:
            "El paciente inicia su recorrido en el Punto A, ubicado en la entrada principal del hospital."
    },

    2: {
        titulo:
            "Paso 2 – Información / Recepción",

        texto:
            "El paciente se dirige al punto de información para recibir orientación."
    },

    3: {
        titulo:
            "Paso 3 – Admisiones / Registro",

        texto:
            "El paciente continúa hacia Admisiones para realizar su registro."
    },

    4: {
        titulo:
            "Paso 4 – Sala de espera",

        texto:
            "El paciente llega a la sala de espera, toma asiento y espera su turno de atención."
    },

    5: {
        titulo:
            "Paso 5 – Consulta externa",

        texto:
            "El paciente se levanta y continúa por el pasillo de Consulta Externa."
    },

    6: {
        titulo:
            "Paso 6 – Medicina General",

        texto:
            "El paciente completa el recorrido y llega al Punto B: Consultorio de Medicina General."
    }

};


// ==========================================================
// 7. MOSTRAR PACIENTE CAMINANDO
// ==========================================================

function mostrarPacienteMuletas() {

    if (!pacienteMuletas) {
        return;
    }

    pacienteMuletas.classList.add("activo");

    pacienteMuletas.style.display = "block";

    pacienteMuletas.style.opacity = "1";

    pacienteMuletas.style.visibility = "visible";
}


// ==========================================================
// 8. OCULTAR PACIENTE CAMINANDO
// ==========================================================

function ocultarPacienteMuletas() {

    if (!pacienteMuletas) {
        return;
    }

    pacienteMuletas.classList.remove(
        "activo",
        "caminando"
    );

    pacienteMuletas.style.opacity = "0";

    pacienteMuletas.style.visibility = "hidden";

    pacienteMuletas.style.display = "none";
}


// ==========================================================
// 9. MOSTRAR PACIENTE SENTADO
// ==========================================================

function mostrarPacienteSentado() {

    if (!pacienteSentado) {
        return;
    }

    pacienteSentado.classList.add("visible");

    pacienteSentado.style.display = "block";

    pacienteSentado.style.opacity = "1";

    pacienteSentado.style.visibility = "visible";
}


// ==========================================================
// 10. OCULTAR PACIENTE SENTADO
// ==========================================================

function ocultarPacienteSentado() {

    if (!pacienteSentado) {
        return;
    }

    pacienteSentado.classList.remove("visible");

    pacienteSentado.style.opacity = "0";

    pacienteSentado.style.visibility = "hidden";

    pacienteSentado.style.display = "none";
}


// ==========================================================
// 11. RESALTAR RUTA PRINCIPAL
// ==========================================================

function resaltarRutaHasta(paso) {

    for (let i = 1; i <= 6; i++) {

        const tramo =
            document.getElementById(`tramo-${i}`);

        if (!tramo) {
            continue;
        }

        if (i <= paso) {

            tramo.classList.add("recorrido");

        } else {

            tramo.classList.remove("recorrido");
        }
    }
}


// ==========================================================
// 12. RESALTAR TARJETA DEL PASO
// ==========================================================

function resaltarTarjetaPaso(paso) {

    document
        .querySelectorAll(".paso")
        .forEach(elemento => {

            elemento.classList.remove(
                "paso-activo"
            );
        });


    const tarjeta =
        document.querySelector(`.paso${paso}`);


    if (tarjeta) {

        tarjeta.classList.add(
            "paso-activo"
        );
    }
}


// ==========================================================
// 13. ACTIVAR PASO DEL RECORRIDO PRINCIPAL
// ==========================================================

function activarPaso(paso) {

    const posicion =
        rutaMuletas[paso];

    const informacion =
        informacionPasos[paso];


    if (!pacienteMuletas || !posicion) {
        return;
    }


    pasoActual = paso;


    if (temporizadorMuletas) {

        clearTimeout(
            temporizadorMuletas
        );
    }


    // ======================================================
    // PASO 4 – SALA DE ESPERA
    // ======================================================

    if (paso === 4) {

        ocultarPacienteSentado();

        mostrarPacienteMuletas();


        pacienteMuletas.classList.add(
            "caminando"
        );


        pacienteMuletas.style.transition =
            "left 1.05s ease-in-out, top 1.05s ease-in-out";


        pacienteMuletas.style.left =
            posicion.left;


        pacienteMuletas.style.top =
            posicion.top;


        resaltarRutaHasta(4);

        resaltarTarjetaPaso(4);


        mostrarInfo(
            informacion.titulo,
            informacion.texto
        );


        temporizadorMuletas =
            setTimeout(() => {

                ocultarPacienteMuletas();

                mostrarPacienteSentado();

            }, 1100);


        return;
    }


    // ======================================================
    // DEMÁS PASOS
    // ======================================================

    ocultarPacienteSentado();

    mostrarPacienteMuletas();


    pacienteMuletas.classList.add(
        "caminando"
    );


    pacienteMuletas.style.transition =
        "left 1.05s ease-in-out, top 1.05s ease-in-out";


    pacienteMuletas.style.left =
        posicion.left;


    pacienteMuletas.style.top =
        posicion.top;


    resaltarRutaHasta(paso);

    resaltarTarjetaPaso(paso);


    if (informacion) {

        mostrarInfo(
            informacion.titulo,
            informacion.texto
        );
    }


    temporizadorMuletas =
        setTimeout(() => {

            pacienteMuletas.classList.remove(
                "caminando"
            );

        }, 1050);
}


// ==========================================================
// 14. RECORRIDO AUTOMÁTICO PRINCIPAL
// ==========================================================

async function iniciarRecorrido() {

    reiniciar();


    mostrarInfo(
        "Recorrido principal iniciado",
        "El paciente iniciará en la Entrada principal y llegará hasta Medicina General."
    );


    await esperar(300);


    activarPaso(1);

    await esperar(1300);


    activarPaso(2);

    // Esperar a que el paciente llegue a Recepción
await esperar(1300);

// Mostrar el asesor y escuchar las indicaciones
mostrarBienvenidaAsesor();

// Esperar a que el usuario pulse "Continuar recorrido"
await new Promise(resolve => {
    continuarDespuesDelAsesor = resolve;
});

// Continuar hacia Admisiones

    activarPaso(3);

// Esperar a que el paciente llegue a Admisiones
await esperar(1300);

// Cambiar el título de la ventana
const tituloAsesor = document.querySelector(
    "#dialogo-asesor .asesor-informacion h3"
);

const mensajeAsesor = document.getElementById("mensaje-asesor");

if (tituloAsesor) {
    tituloAsesor.textContent = "🏥 Admisiones y Registro";
}

if (mensajeAsesor) {
    mensajeAsesor.textContent =
        "¡Bienvenido al área de Admisiones! " +
        "Presenta tu documento de identidad al personal encargado " +
        "para verificar tu cita y completar el registro. " +
        "Cuando finalices, dirígete a la sala de espera de Medicina General, " +
        "toma asiento y permanece atento hasta que el médico o el personal " +
        "de salud te llame por tu nombre.";
}

// Cargar nuevamente el avatar de Sofía
const videoAdmisiones = document.getElementById("video-enfermera-admisiones");

const videoRecepcion = document.getElementById("video-enfermera");

if (videoRecepcion && videoAdmisiones) {
    videoRecepcion.style.display = "none";
    videoAdmisiones.style.display = "block";
}

if (videoAdmisiones) {
    videoAdmisiones.src =
        "https://app.heygen.com/embeds/60a72ad20bff462587487297ca55f9a0?autoplay=1";

    videoAdmisiones.style.display = "block";
}

// Mostrar la ventana
document.getElementById("dialogo-asesor").hidden = false;

// Esperar a que el usuario pulse Continuar recorrido
await new Promise(resolve => {
    continuarDespuesDelAsesor = resolve;
});

// Avanzar hacia la sala de espera
activarPaso(4);

// Esperar a que el paciente llegue a la sala de espera
await esperar(1300);

// El paciente se sienta
ocultarPacienteMuletas();
mostrarPacienteSentado();

// Permanece sentado esperando al médico
await esperar(5000);

// Abrir la puerta del consultorio
const escenaConsultorio = document.getElementById("escena-consultorio");

if (escenaConsultorio) {
    escenaConsultorio.classList.add("puerta-abierta");
}

// Esperar a que termine la animación de apertura
await esperar(1300);

// El médico llama al paciente desde el consultorio
const llamadoMedico = new SpeechSynthesisUtterance(
    "Buenos días. Paciente de Medicina General, por favor, puede acercarse al consultorio. Es su turno de atención."
);

llamadoMedico.lang = "es-CO";
llamadoMedico.rate = 0.9;
llamadoMedico.pitch = 0.85;

// Esperar a que el médico termine de llamar al paciente
await new Promise(resolve => {
    llamadoMedico.onend = resolve;
    llamadoMedico.onerror = resolve;

    window.speechSynthesis.speak(llamadoMedico);
});


    activarPaso(5);

    await esperar(1400);


    activarPaso(6);

    await esperar(1200);


    mostrarInfo(
        "Recorrido principal completado",
        "El paciente llegó correctamente al Consultorio de Medicina General."
    );
}


// ==========================================================
// 15. MOSTRAR RUTA COMPLETA
// ==========================================================

function mostrarRuta() {

    resaltarRutaHasta(6);


    mostrarInfo(
        "Ruta principal resaltada",
        "Se encuentra resaltado todo el recorrido desde el Punto A hasta el Punto B."
    );
}


// ==========================================================
// 16. RUTA DEL USUARIO EN SILLA DE RUEDAS
//
// RAMPA → BAÑO ACCESIBLE → ASCENSOR
// ==========================================================

const rutaSilla = [

    // 1. RAMPA
    {
        left: "7%",
        top: "67%"
    },

    // 2. SALIDA DE RAMPA
    {
        left: "11%",
        top: "67%"
    },

    // 3. BAÑO ACCESIBLE
    {
        left: "18%",
        top: "67%"
    },

    // 4. CAMINO AL ASCENSOR
    {
        left: "24%",
        top: "67%"
    },

    // 5. ASCENSOR
    {
        left: "30%",
        top: "67%"
    }

];


// ==========================================================
// 17. MOSTRAR USUARIO EN SILLA
// ==========================================================

function mostrarPacienteSilla() {

    if (!pacienteSilla) {

        console.error(
            "No se encontró el elemento #persona-silla"
        );

        return;
    }


    pacienteSilla.classList.add(
        "activo"
    );


    pacienteSilla.style.display =
        "block";


    pacienteSilla.style.opacity =
        "1";


    pacienteSilla.style.visibility =
        "visible";
}


// ==========================================================
// 18. OCULTAR USUARIO EN SILLA
// ==========================================================

function ocultarPacienteSilla() {

    if (!pacienteSilla) {
        return;
    }


    pacienteSilla.classList.remove(
        "activo",
        "moviendo"
    );


    pacienteSilla.style.opacity =
        "0";


    pacienteSilla.style.visibility =
        "hidden";


    pacienteSilla.style.display =
        "none";
}


// ==========================================================
// 19. RESALTAR ELEMENTO ACCESIBLE
// ==========================================================

function resaltarAccesible(selector) {

    document
        .querySelectorAll(
            ".hotspot.rampa, .hotspot.bano-accesible, .hotspot.ascensor"
        )
        .forEach(elemento => {

            elemento.classList.remove(
                "accesible-activo"
            );
        });


    const elemento =
        document.querySelector(selector);


    if (elemento) {

        elemento.classList.add(
            "accesible-activo"
        );
    }
}


// ==========================================================
// 20. RECORRIDO COMPLETO DE SILLA DE RUEDAS
// ==========================================================

async function iniciarRecorridoSilla() {

    if (!pacienteSilla) {

        console.error(
            "No se encontró usuario-silla.png o #persona-silla."
        );

        return;
    }


    // Evita que se inicien varias animaciones simultáneas

    if (sillaEnMovimiento) {
        return;
    }


    sillaEnMovimiento = true;


    mostrarPacienteSilla();


    // ======================================================
    // PASO 1 – RAMPA ACCESIBLE
    // ======================================================

    pacienteSilla.style.transition =
        "none";


    pacienteSilla.style.left =
        rutaSilla[0].left;


    pacienteSilla.style.top =
        rutaSilla[0].top;


    resaltarAccesible(
        ".hotspot.rampa"
    );


    mostrarInfo(
        "Ruta accesible – Rampa accesible",
        "El usuario en silla de ruedas inicia el recorrido utilizando la rampa accesible."
    );


    await esperar(650);


    pacienteSilla.classList.add(
        "moviendo"
    );


    // ======================================================
    // PASO INTERMEDIO – SALIDA DE LA RAMPA
    // ======================================================

    pacienteSilla.style.transition =
        "left 0.9s ease-in-out, top 0.9s ease-in-out";


    pacienteSilla.style.left =
        rutaSilla[1].left;


    pacienteSilla.style.top =
        rutaSilla[1].top;


    await esperar(950);


    // ======================================================
    // PASO 2 – BAÑO ACCESIBLE
    // ======================================================

    pacienteSilla.style.left =
        rutaSilla[2].left;


    pacienteSilla.style.top =
        rutaSilla[2].top;


    resaltarAccesible(
        ".hotspot.bano-accesible"
    );


    mostrarInfo(
        "Ruta accesible – Baño accesible",
        "El usuario continúa hacia el baño accesible, diseñado para personas con movilidad reducida."
    );


    await esperar(1500);


    // ======================================================
    // PASO INTERMEDIO HACIA ASCENSOR
    // ======================================================

    pacienteSilla.style.left =
        rutaSilla[3].left;


    pacienteSilla.style.top =
        rutaSilla[3].top;


    await esperar(950);


    // ======================================================
    // PASO 3 – ASCENSOR
    // ======================================================

    pacienteSilla.style.left =
        rutaSilla[4].left;


    pacienteSilla.style.top =
        rutaSilla[4].top;


    resaltarAccesible(
        ".hotspot.ascensor"
    );


    mostrarInfo(
        "Ruta accesible – Ascensor",
        "El usuario finaliza su recorrido accesible frente al ascensor."
    );


    await esperar(1300);


    pacienteSilla.classList.remove(
        "moviendo"
    );


    sillaEnMovimiento = false;
}


// ==========================================================
// 21. OCULTAR TODO EL RECORRIDO
// ==========================================================

function ocultarRuta() {

    ocultarPacienteMuletas();

    ocultarPacienteSentado();

    ocultarPacienteSilla();


    for (let i = 1; i <= 6; i++) {

        const tramo =
            document.getElementById(
                `tramo-${i}`
            );


        if (tramo) {

            tramo.classList.remove(
                "recorrido"
            );
        }
    }


    document
        .querySelectorAll(".paso")
        .forEach(elemento => {

            elemento.classList.remove(
                "paso-activo"
            );
        });


    document
        .querySelectorAll(
            ".accesible-activo"
        )
        .forEach(elemento => {

            elemento.classList.remove(
                "accesible-activo"
            );
        });


    sillaEnMovimiento = false;


    mostrarInfo(
        "Recorridos ocultados",
        "Los personajes y los resaltados dinámicos fueron ocultados."
    );
}


// ==========================================================
// 22. REINICIAR MAPA
// ==========================================================

function reiniciar() {

    pasoActual = 0;

    sillaEnMovimiento = false;


    if (temporizadorMuletas) {

        clearTimeout(
            temporizadorMuletas
        );
    }


    // ======================================================
    // PACIENTE CON MULETAS
    // ======================================================

    if (pacienteMuletas) {

        pacienteMuletas.classList.remove(
            "activo",
            "caminando"
        );


        pacienteMuletas.style.transition =
            "none";


        pacienteMuletas.style.left =
            rutaMuletas[1].left;


        pacienteMuletas.style.top =
            rutaMuletas[1].top;


        pacienteMuletas.style.opacity =
            "0";


        pacienteMuletas.style.visibility =
            "hidden";


        pacienteMuletas.style.display =
            "none";
    }


    // ======================================================
    // PACIENTE SENTADO
    // ======================================================

    ocultarPacienteSentado();


    // ======================================================
    // SILLA DE RUEDAS
    // ======================================================

    if (pacienteSilla) {

        pacienteSilla.classList.remove(
            "activo",
            "moviendo"
        );


        pacienteSilla.style.transition =
            "none";


        pacienteSilla.style.left =
            rutaSilla[0].left;


        pacienteSilla.style.top =
            rutaSilla[0].top;


        pacienteSilla.style.opacity =
            "0";


        pacienteSilla.style.visibility =
            "hidden";


        pacienteSilla.style.display =
            "none";
    }


    // ======================================================
    // QUITAR RUTA PRINCIPAL
    // ======================================================

    for (let i = 1; i <= 6; i++) {

        const tramo =
            document.getElementById(
                `tramo-${i}`
            );


        if (tramo) {

            tramo.classList.remove(
                "recorrido"
            );
        }
    }


    // ======================================================
    // QUITAR PASOS ACTIVOS
    // ======================================================

    document
        .querySelectorAll(".paso")
        .forEach(elemento => {

            elemento.classList.remove(
                "paso-activo"
            );
        });


    // ======================================================
    // QUITAR RESALTADOS ACCESIBLES
    // ======================================================

    document
        .querySelectorAll(
            ".accesible-activo"
        )
        .forEach(elemento => {

            elemento.classList.remove(
                "accesible-activo"
            );
        });


    // ======================================================
    // REINICIAR PANEL
    // ======================================================

    if (tituloInfo) {

        tituloInfo.textContent =
            "Selecciona una zona del mapa";
    }


    if (textoInfo) {

        textoInfo.textContent =
            "Pasa el mouse por los puntos del recorrido o utiliza los botones para iniciar las demostraciones.";
    }


    if (panelInfo) {

        panelInfo.classList.remove(
            "activo"
        );
    }
}


// ==========================================================
// 23. INICIALIZACIÓN DE LA PÁGINA
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        reiniciar();


        // ==================================================
        // RECORRIDO ACCESIBLE DESDE LA RAMPA
        // ==================================================

        const zonaRampa =
            document.querySelector(
                ".hotspot.rampa"
            );


        if (zonaRampa) {

            // Al pasar el mouse por la rampa

            zonaRampa.addEventListener(
                "mouseenter",
                () => {

                    iniciarRecorridoSilla();

                }
            );


            // También al hacer clic

            zonaRampa.addEventListener(
                "click",
                () => {

                    iniciarRecorridoSilla();

                }
            );

        } else {

            console.warn(
                "No se encontró .hotspot.rampa"
            );
        }


        // ==================================================
        // SOPORTE CON TECLADO
        // ==================================================

        document
            .querySelectorAll(".hotspot")
            .forEach(hotspot => {

                hotspot.addEventListener(
                    "keydown",
                    evento => {

                        if (
                            evento.key === "Enter" ||
                            evento.key === " "
                        ) {

                            evento.preventDefault();

                            hotspot.click();
                        }

                    }
                );

            });


        console.log(
            "Mapa de navegación cargado correctamente."
        );

        console.log(
            "Recorrido accesible listo: Rampa → Baño accesible → Ascensor."
        );

    }
);


/* ==========================================
   ASESOR VIRTUAL - INFORMACIÓN Y RECEPCIÓN
========================================== */
let continuarDespuesDelAsesor = null;
const textoBienvenida =
  "¡Bienvenido a nuestro hospital! Es un gusto atenderle. " +
  "Si se dirige al consultorio de medicina general, " +
  "primero debe acercarse al área de Admisiones " +
  "para realizar su registro. " +
  "Después, continúe hacia la sala de espera " +
  "y siga la señalización hasta el consultorio. " +
  "Si necesita apoyo para desplazarse, contamos " +
  "con rutas accesibles. ¡Estamos aquí para ayudarle!";

function hablarAsesor() {
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no admite lectura de voz.");
    return;
  }

  window.speechSynthesis.cancel();

  const mensaje = new SpeechSynthesisUtterance(textoBienvenida);
  mensaje.lang = "es-CO";
  mensaje.rate = 0.9;
  mensaje.pitch = 1;
  mensaje.volume = 1;

  const voces = window.speechSynthesis.getVoices();

  const vozEspanol =
    voces.find(v => v.lang.toLowerCase() === "es-co") ||
    voces.find(v => v.lang.toLowerCase().startsWith("es"));

  if (vozEspanol) {
    mensaje.voice = vozEspanol;
  }

const avatarEnfermera = document.querySelector(".asesor-avatar");

mensaje.onstart = function () {
    if (avatarEnfermera) {
        avatarEnfermera.classList.add("hablando");
    }
};

mensaje.onend = function () {
    if (avatarEnfermera) {
        avatarEnfermera.classList.remove("hablando");
    }
};

mensaje.onerror = function () {
    if (avatarEnfermera) {
        avatarEnfermera.classList.remove("hablando");
    }
};

  window.speechSynthesis.speak(mensaje);
}

function mostrarBienvenidaAsesor() {
  const dialogo = document.getElementById("dialogo-asesor");
  const texto = document.getElementById("mensaje-asesor");

  if (!dialogo || !texto) return;

  texto.textContent = textoBienvenida;
  dialogo.hidden = false;

  const videoRecepcion = document.getElementById("video-enfermera");
const videoAdmisiones = document.getElementById("video-enfermera-admisiones");

videoRecepcion.style.display = "block";
videoAdmisiones.style.display = "none";

 // hablarAsesor();
}

function repetirIndicaciones() {
    const videoAnterior = document.getElementById("video-enfermera");

    if (!videoAnterior) return;

    const videoNuevo = document.createElement("iframe");

    videoNuevo.id = "video-enfermera";
    videoNuevo.src = "https://app.heygen.com/embeds/72b30711bdb74aa286b24da040761a06?autoplay=1";
    videoNuevo.title = "Sofía - Enfermera virtual hospitalaria";
    videoNuevo.width = "220";
    videoNuevo.height = "280";
    videoNuevo.style.cssText = "border:0; border-radius:14px; max-width:100%;";
    videoNuevo.allow = "autoplay; encrypted-media; fullscreen";
    videoNuevo.allowFullscreen = true;

    videoAnterior.replaceWith(videoNuevo);
}


function cerrarDialogoAsesor() {
   // Detener los videos de la enfermera al cerrar la ventana
const videosEnfermera = [
    document.getElementById("video-enfermera"),
    document.getElementById("video-enfermera-admisiones")
];

videosEnfermera.forEach(video => {
    if (video) {
        video.src = "about:blank";
    }
});
   
    // Detener la voz anterior, si existe
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    // Detener el video de Sofía
    const video = document.getElementById("video-enfermera");

    if (video) {
        video.src = "about:blank";
    }

    // Cerrar la ventana de recepción
    const dialogo = document.getElementById("dialogo-asesor");

    if (dialogo) {
        dialogo.hidden = true;
    }

    // Permitir que el paciente continúe caminando
    if (continuarDespuesDelAsesor) {
        const continuar = continuarDespuesDelAsesor;
        continuarDespuesDelAsesor = null;
        continuar();
    }
}
