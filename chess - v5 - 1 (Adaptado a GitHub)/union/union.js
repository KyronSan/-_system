const chessFrame = document.getElementById("chessFrame");
const animationFrame = document.getElementById("animationFrame");

/* ===============================
   CAJA DE MENSAJE EN UNION.HTML
   =============================== */
const infoBox = document.createElement("div");
infoBox.id = "unionInfo";
infoBox.textContent = "Esperando selección de dificultad…";

Object.assign(infoBox.style, {
    margin: "10px",
    padding: "10px",
    background: "#111",
    color: "rgb(255, 255, 255)",
    border: "2px solid rgb(30, 42, 151)",
    fontFamily: "monospace",
    textAlign: "center",
    display: "none"   // 👈 oculto pero vivo
});

document.body.appendChild(infoBox);

/* ===============================
   RECIBIR MENSAJES DEL IFRAME
   =============================== */
window.addEventListener("message", (e) => {
    if (!e.data || e.data.type !== "difficulty") return;

    const nombres = {
        facil: "FÁCIL",
        intermedio: "INTERMEDIA",
        dificil: "DIFÍCIL"
    };

    infoBox.textContent = `Se seleccionó: ${nombres[e.data.value]}`;
});

/* ===============================
   INYECTAR ESCUCHA CORRECTAMENTE
   =============================== */
animationFrame.addEventListener("load", () => {
    animationFrame.contentWindow.eval(`
        document.addEventListener("DOMContentLoaded", () => {
            const buttons = document.querySelectorAll("#difficultyBox button");

            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    parent.postMessage({
                        type: "difficulty",
                        value: btn.dataset.level
                    }, "*");
                });
            });
        });
    `);
});

/* ===============================
   ENVIAR DIFICULTAD AL CHESS
   =============================== */

window.addEventListener("message", (e) => {
    if (!e.data || e.data.type !== "difficulty") return;

    // Traducción animation → chess
    const map = {
        facil: "facil",
        intermedio: "medio",
        dificil: "dificil"
    };

    const difficultyForChess = map[e.data.value];
    if (!difficultyForChess) return;

    // Enviar mensaje al iframe de ajedrez
    chessFrame.contentWindow.postMessage({
        type: "setDifficulty",
        value: difficultyForChess
    }, "*");

    /* ===============================
    OCULTAR Y DESACTIVAR blueBox
    =============================== */

    const blueBox = document.getElementById("blueBox");

    blueBox.style.display = "none";      // desaparece
    blueBox.style.pointerEvents = "none"; // no clickeable
    
});

/* ===============================
    PRUEBA CLICK CUADRADO AZUL
   =============================== */

    const blueBox = document.getElementById("blueBox");

    blueBox.addEventListener("click", () => {

        // evitar duplicar mensajes
        if (blueBox.querySelector(".blueMessage")) return;

        const msg = document.createElement("div");
        msg.className = "blueMessage";
        msg.textContent = "Selecciona una dificultad.";

        // estilo SOLO del mensaje
        Object.assign(msg.style, {
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "32px",
            padding: "210px 120px",
            border: "3px solid #ffffff",
            borderRadius: "6px",
            background: "rgba(0, 0, 0, 0.55)",
            textAlign: "center"
        });

        // centrar el mensaje dentro del cuadrado
        blueBox.style.display = "flex";
        blueBox.style.alignItems = "center";
        blueBox.style.justifyContent = "center";

        blueBox.appendChild(msg);

        // ⏱ eliminar mensaje después de 2.5 segundos
        setTimeout(() => {
            msg.remove();
        }, 2500);
    });
