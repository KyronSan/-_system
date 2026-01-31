(function(){

const AI_STATE={
mirrorChecked:false,
lastMoves:[],
fiftyRuleWarnedSelf:false,
fiftyRuleMockedEnemy:false
};

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function speakFrom(a){
if(!window.loadedCharacter)return;
const d=pick(a);
window.loadedCharacter.dialogos=[d];
if(typeof window.typeText==="function")window.typeText(d);
}

const START=[
{texto:"Bien.\nVeamos qué tan sólido es tu juego.",emocion:"hablar"},
{texto:"Empezamos.\nAnalizaré cada detalle.",emocion:"hablar"},
{texto:"Una nueva partida.\nAquí ya no basta improvisar.",emocion:"hablar"},
{texto:"Prepárate.\nBuscaré errores.",emocion:"hablar"},
{texto:"Juguemos.\nLa estrategia importa.",emocion:"hablar"},
{texto:"Interesante elección.\nObservemos.",emocion:"hablar"},
{texto:"Estoy listo.\nNo será tan sencillo.",emocion:"hablar"},
{texto:"Comencemos.\nCada jugada cuenta.",emocion:"hablar"},
{texto:"Veamos tu nivel real.",emocion:"hablar"},
{texto:"Partida iniciada.\nConcéntrate.",emocion:"hablar"}
];

window.registerCharacter({codigo:"intermedio",dialogos:[pick(START)]});

const PAWN=[
{texto:"Avance correcto.",emocion:"hablar"},
{texto:"El peón gana espacio.",emocion:"hablar"},
{texto:"Eso define la estructura.",emocion:"hablar"},
{texto:"Peón bien usado.",emocion:"hablar"},
{texto:"Movimiento lógico.",emocion:"hablar"},
{texto:"Así se construye posición.",emocion:"hablar"},
{texto:"Buen empuje.",emocion:"hablar"},
{texto:"Los peones deciden finales.",emocion:"hablar"},
{texto:"Avance estratégico.",emocion:"hablar"},
{texto:"Estructura alterada.",emocion:"hablar"}
];

const KNIGHT=[
{texto:"Buen salto.",emocion:"sorprendido"},
{texto:"El caballo mejora.",emocion:"sorprendido"},
{texto:"Movimiento activo.",emocion:"sorprendido"},
{texto:"Eso crea amenazas.",emocion:"sorprendido"},
{texto:"Caballo bien centralizado.",emocion:"sorprendido"},
{texto:"Buen cálculo.",emocion:"sorprendido"},
{texto:"El caballo presiona.",emocion:"sorprendido"},
{texto:"Movimiento táctico.",emocion:"sorprendido"},
{texto:"Interesante ruta.",emocion:"sorprendido"},
{texto:"Caballo peligroso.",emocion:"sorprendido"}
];

const BISHOP=[
{texto:"Diagonal fuerte.",emocion:"hablar"},
{texto:"Buen alfil.",emocion:"hablar"},
{texto:"Control a largo plazo.",emocion:"hablar"},
{texto:"Eso molesta bastante.",emocion:"hablar"},
{texto:"Alfil activo.",emocion:"hablar"},
{texto:"Buena presión.",emocion:"hablar"},
{texto:"Diagonal dominante.",emocion:"hablar"},
{texto:"Movimiento preciso.",emocion:"hablar"},
{texto:"Alfil bien colocado.",emocion:"hablar"},
{texto:"Buen concepto.",emocion:"hablar"}
];

const ROOK=[
{texto:"La torre entra con fuerza.",emocion:"hablar"},
{texto:"Columna importante.",emocion:"hablar"},
{texto:"Buena coordinación.",emocion:"hablar"},
{texto:"Eso pesa.",emocion:"hablar"},
{texto:"Torre activa.",emocion:"hablar"},
{texto:"Buena colocación.",emocion:"hablar"},
{texto:"La torre manda.",emocion:"hablar"},
{texto:"Columna controlada.",emocion:"hablar"},
{texto:"Buen momento.",emocion:"hablar"},
{texto:"Movimiento sólido.",emocion:"hablar"}
];

const QUEEN=[
{texto:"La dama entra en escena.",emocion:"sorprendido"},
{texto:"Movimiento delicado.",emocion:"sorprendido"},
{texto:"Eso puede ser peligroso.",emocion:"sorprendido"},
{texto:"La dama presiona.",emocion:"sorprendido"},
{texto:"Buen uso de la dama.",emocion:"sorprendido"},
{texto:"Movimiento ambicioso.",emocion:"sorprendido"},
{texto:"La dama apunta fuerte.",emocion:"sorprendido"},
{texto:"Eso crea amenazas.",emocion:"sorprendido"},
{texto:"Cuidado con la dama.",emocion:"sorprendido"},
{texto:"Juego agresivo.",emocion:"sorprendido"}
];

const KING=[
{texto:"El rey se mueve.\nRiesgoso.",emocion:"triste"},
{texto:"Eso puede costar caro.",emocion:"triste"},
{texto:"El rey queda expuesto.",emocion:"triste"},
{texto:"Movimiento delicado.",emocion:"triste"},
{texto:"No me convence.",emocion:"triste"},
{texto:"El rey pierde seguridad.",emocion:"triste"},
{texto:"Decisión peligrosa.",emocion:"triste"},
{texto:"El rey sale demasiado pronto.",emocion:"triste"},
{texto:"Eso abre líneas.",emocion:"triste"},
{texto:"Atención al rey.",emocion:"triste"}
];

const CAP_LIGHT=[
{texto:"Intercambio menor.",emocion:"hablar"},
{texto:"Ganancia pequeña.",emocion:"hablar"},
{texto:"Nada decisivo.",emocion:"hablar"},
{texto:"Captura aceptable.",emocion:"hablar"},
{texto:"Eso suma.",emocion:"hablar"},
{texto:"Pequeña ventaja.",emocion:"hablar"},
{texto:"Cambio leve.",emocion:"hablar"},
{texto:"Intercambio lógico.",emocion:"hablar"},
{texto:"Movimiento normal.",emocion:"hablar"},
{texto:"Nada crítico.",emocion:"hablar"}
];

const CAP_MED=[
{texto:"Eso ya se siente.",emocion:"sorprendido"},
{texto:"Intercambio importante.",emocion:"sorprendido"},
{texto:"Pieza relevante fuera.",emocion:"sorprendido"},
{texto:"Eso cambia planes.",emocion:"sorprendido"},
{texto:"Captura fuerte.",emocion:"sorprendido"},
{texto:"Buen golpe.",emocion:"sorprendido"},
{texto:"Eso pesa.",emocion:"sorprendido"},
{texto:"Ventaja clara.",emocion:"sorprendido"},
{texto:"Intercambio serio.",emocion:"sorprendido"},
{texto:"Movimiento clave.",emocion:"sorprendido"}
];

const CAP_HEAVY=[
{texto:"Eso duele mucho.",emocion:"llorando"},
{texto:"Golpe decisivo.",emocion:"llorando"},
{texto:"Difícil de compensar.",emocion:"llorando"},
{texto:"Pérdida grave.",emocion:"llorando"},
{texto:"Eso inclina la balanza.",emocion:"llorando"},
{texto:"Momento crítico.",emocion:"llorando"},
{texto:"Muy costoso.",emocion:"llorando"},
{texto:"Gran ventaja obtenida.",emocion:"llorando"},
{texto:"Eso marca la partida.",emocion:"llorando"},
{texto:"Situación complicada.",emocion:"llorando"}
];

const CHECK=Array.from({length:10},(_,i)=>({texto:`Jaque.\nPrecisión requerida (${i+1}).`,emocion:"sorprendido"}));
const MATE_WIN=Array.from({length:10},(_,i)=>({texto:`Jaque mate.\nBuen cálculo (${i+1}).`,emocion:"triste"}));
const MATE_LOSE=Array.from({length:10},(_,i)=>({texto:`Jaque mate.\nError decisivo (${i+1}).`,emocion:"hablar"}));
const CASTLE=Array.from({length:10},(_,i)=>({texto:`Enroque correcto (${i+1}).`,emocion:"hablar"}));
const PROMO_P=Array.from({length:10},(_,i)=>({texto:`Coronación merecida (${i+1}).`,emocion:"sorprendido"}));
const PROMO_A=Array.from({length:10},(_,i)=>({texto:`He coronado.\nVentaja (${i+1}).`,emocion:"hablar"}));
const ENP=Array.from({length:10},(_,i)=>({texto:`Captura al paso.\nBuena visión (${i+1}).`,emocion:"sorprendido"}));
const MIRROR=Array.from({length:10},(_,i)=>({texto:`Partida espejo.\nInteresante (${i+1}).`,emocion:"sorprendido"}));
const FIFTY_S=Array.from({length:10},(_,i)=>({texto:`Demasiadas jugadas sin progreso (${i+1}).`,emocion:"triste"}));
const FIFTY_E=Array.from({length:10},(_,i)=>({texto:`Tu juego se estanca (${i+1}).`,emocion:"hablar"}));

window.AI_INTERMEDIO={
onMove(p){
const m={pawn:PAWN,knight:KNIGHT,bishop:BISHOP,rook:ROOK,queen:QUEEN,king:KING}[p];
if(m)speakFrom(m);
},
onCapture(p){
const s={pawn:1,knight:2,bishop:2,rook:3,queen:4}[p]||1;
speakFrom(s<=1?CAP_LIGHT:s<=3?CAP_MED:CAP_HEAVY);
},
onCheck(){speakFrom(CHECK);},
onCheckMate(w){speakFrom(w==="player"?MATE_WIN:MATE_LOSE);},
onCastle(){speakFrom(CASTLE);},
onPromotion(w){speakFrom(w==="player"?PROMO_P:PROMO_A);},
onEnPassant(){speakFrom(ENP);},
onMoveHistory(m){
if(AI_STATE.mirrorChecked)return;
AI_STATE.lastMoves.push(m);
if(AI_STATE.lastMoves.length===6){
const[a,b,c,d,e,f]=AI_STATE.lastMoves;
if(a===b&&c===d&&e===f)speakFrom(MIRROR);
AI_STATE.mirrorChecked=true;
}
},
onFiftyRule(_,a){
if(a==="self"&&!AI_STATE.fiftyRuleWarnedSelf){speakFrom(FIFTY_S);AI_STATE.fiftyRuleWarnedSelf=true;}
if(a==="enemy"&&!AI_STATE.fiftyRuleMockedEnemy){speakFrom(FIFTY_E);AI_STATE.fiftyRuleMockedEnemy=true;}
}
};

})();
