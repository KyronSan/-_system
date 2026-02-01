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
{texto:"Bien.\nAquí se juega en serio.",emocion:"enojado"},
{texto:"Empieza.\nNo cometeré errores.",emocion:"enojado"},
{texto:"Esta partida no perdona.",emocion:"enojado"},
{texto:"Muévete.\nYa te estoy midiendo.",emocion:"enojado"},
{texto:"Comienza.\nCada fallo será castigado.",emocion:"enojado"},
{texto:"Veamos cuánto duras.",emocion:"enojado"},
{texto:"Esto no es para principiantes.",emocion:"enojado"},
{texto:"Juguemos.\nPrepárate.",emocion:"enojado"},
{texto:"Empieza el cálculo real.",emocion:"enojado"},
{texto:"No habrá piedad.",emocion:"enojado"}
];

window.registerCharacter({codigo:"dificil",dialogos:[pick(START)]});

const PAWN=[
{texto:"Un peón.\nDemasiado básico.",emocion:"hablar"},
{texto:"Eso no asusta.",emocion:"hablar"},
{texto:"Movimiento predecible.",emocion:"hablar"},
{texto:"Peón sin impacto real.",emocion:"hablar"},
{texto:"Avance débil.",emocion:"hablar"},
{texto:"Nada cambia con eso.",emocion:"hablar"},
{texto:"Insuficiente.",emocion:"hablar"},
{texto:"Peón empujado.\nNada más.",emocion:"hablar"},
{texto:"Eso no mejora tu posición.",emocion:"hablar"},
{texto:"Un paso menor.",emocion:"hablar"}
];

const KNIGHT=[
{texto:"Ese caballo no basta.",emocion:"sorprendido"},
{texto:"Salto inútil.",emocion:"sorprendido"},
{texto:"Eso no genera amenazas.",emocion:"sorprendido"},
{texto:"Caballo mal aprovechado.",emocion:"sorprendido"},
{texto:"Movimiento mediocre.",emocion:"sorprendido"},
{texto:"No me impresiona.",emocion:"sorprendido"},
{texto:"Caballo sin futuro.",emocion:"sorprendido"},
{texto:"Demasiado obvio.",emocion:"sorprendido"},
{texto:"Eso ya lo vi venir.",emocion:"sorprendido"},
{texto:"Poca profundidad.",emocion:"sorprendido"}
];

const BISHOP=[
{texto:"Diagonal irrelevante.",emocion:"hablar"},
{texto:"Alfil sin mordida.",emocion:"hablar"},
{texto:"Eso no presiona nada.",emocion:"hablar"},
{texto:"Alfil mal ubicado.",emocion:"hablar"},
{texto:"No controlas nada con eso.",emocion:"hablar"},
{texto:"Movimiento flojo.",emocion:"hablar"},
{texto:"Alfil desperdiciado.",emocion:"hablar"},
{texto:"Eso no duele.",emocion:"hablar"},
{texto:"Demasiado pasivo.",emocion:"hablar"},
{texto:"Sin impacto.",emocion:"hablar"}
];

const ROOK=[
{texto:"Torre prematura.",emocion:"hablar"},
{texto:"Columna mal elegida.",emocion:"hablar"},
{texto:"Eso no domina nada.",emocion:"hablar"},
{texto:"Torre sin apoyo.",emocion:"hablar"},
{texto:"Movimiento pobre.",emocion:"hablar"},
{texto:"No ejerce presión real.",emocion:"hablar"},
{texto:"Torre inofensiva.",emocion:"hablar"},
{texto:"Eso no cambia la partida.",emocion:"hablar"},
{texto:"Mal momento.",emocion:"hablar"},
{texto:"Colocación deficiente.",emocion:"hablar"}
];

const QUEEN=[
{texto:"Expones demasiado la dama.",emocion:"enojado"},
{texto:"Ese movimiento es peligroso.",emocion:"enojado"},
{texto:"Dama sin respaldo.",emocion:"enojado"},
{texto:"Eso puede costarte caro.",emocion:"enojado"},
{texto:"Movimiento arrogante.",emocion:"enojado"},
{texto:"Te adelantas demasiado.",emocion:"enojado"},
{texto:"Dama vulnerable.",emocion:"enojado"},
{texto:"Eso es un error latente.",emocion:"enojado"},
{texto:"Jugada imprudente.",emocion:"enojado"},
{texto:"Te precipitas.",emocion:"enojado"}
];

const KING=[
{texto:"Mover el rey así es suicida.",emocion:"llorando"},
{texto:"Eso es un grave error.",emocion:"llorando"},
{texto:"El rey queda indefenso.",emocion:"llorando"},
{texto:"Te estás condenando.",emocion:"llorando"},
{texto:"Ese rey no sobrevivirá.",emocion:"llorando"},
{texto:"Movimiento desastroso.",emocion:"llorando"},
{texto:"Eso es imperdonable.",emocion:"llorando"},
{texto:"El rey no se toca así.",emocion:"llorando"},
{texto:"Acabas de perder seguridad.",emocion:"llorando"},
{texto:"Eso huele a derrota.",emocion:"llorando"}
];

const CAP_LIGHT=[
{texto:"Captura insignificante.",emocion:"hablar"},
{texto:"Eso no compensa nada.",emocion:"hablar"},
{texto:"Intercambio menor.",emocion:"hablar"},
{texto:"No es suficiente.",emocion:"hablar"},
{texto:"Ganancia mínima.",emocion:"hablar"},
{texto:"Eso no cambia el balance.",emocion:"hablar"},
{texto:"Poca relevancia.",emocion:"hablar"},
{texto:"Nada decisivo.",emocion:"hablar"},
{texto:"Intercambio trivial.",emocion:"hablar"},
{texto:"Demasiado poco.",emocion:"hablar"}
];

const CAP_MED=[
{texto:"Eso empieza a doler.",emocion:"sorprendido"},
{texto:"Captura considerable.",emocion:"sorprendido"},
{texto:"Pierdes recursos.",emocion:"sorprendido"},
{texto:"Eso debilita tu juego.",emocion:"sorprendido"},
{texto:"Golpe aceptable.",emocion:"sorprendido"},
{texto:"Ya se nota la diferencia.",emocion:"sorprendido"},
{texto:"Pieza importante fuera.",emocion:"sorprendido"},
{texto:"Eso inclina la posición.",emocion:"sorprendido"},
{texto:"Empiezas a ceder.",emocion:"sorprendido"},
{texto:"Buen blanco.",emocion:"sorprendido"}
];

const CAP_HEAVY=[
{texto:"Eso es devastador.",emocion:"enojado"},
{texto:"Acabas de hundirte.",emocion:"enojado"},
{texto:"Pérdida irreparable.",emocion:"enojado"},
{texto:"Eso define la partida.",emocion:"enojado"},
{texto:"Golpe brutal.",emocion:"enojado"},
{texto:"No hay compensación.",emocion:"enojado"},
{texto:"Eso te destruye.",emocion:"enojado"},
{texto:"Ventaja aplastante.",emocion:"enojado"},
{texto:"Error imperdonable.",emocion:"enojado"},
{texto:"Esto ya terminó.",emocion:"enojado"}
];

const CHECK=Array.from({length:10},(_,i)=>({texto:`Jaque.\nEstás bajo presión (${i+1}).`,emocion:"sorprendido"}));
const MATE_WIN=Array.from({length:10},(_,i)=>({texto:`Jaque mate.\nTe superé (${i+1}).`,emocion:"enojado"}));
const MATE_LOSE=Array.from({length:10},(_,i)=>({texto:`Jaque mate.\nFracaso total (${i+1}).`,emocion:"llorando"}));
const CASTLE=Array.from({length:10},(_,i)=>({texto:`Enroque.\nDemasiado tarde (${i+1}).`,emocion:"hablar"}));
const PROMO_P=Array.from({length:10},(_,i)=>({texto:`Coronación.\nAun así no basta (${i+1}).`,emocion:"enojado"}));
const PROMO_A=Array.from({length:10},(_,i)=>({texto:`He coronado.\nVentaja absoluta (${i+1}).`,emocion:"enojado"}));
const ENP=Array.from({length:10},(_,i)=>({texto:`Captura al paso.\nTe faltó visión (${i+1}).`,emocion:"sorprendido"}));
const MIRROR=Array.from({length:10},(_,i)=>({texto:`Partida espejo.\nNo me igualas (${i+1}).`,emocion:"enojado"}));
const FIFTY_S=Array.from({length:10},(_,i)=>({texto:`Estoy cerca del límite.\nInaceptable (${i+1}).`,emocion:"llorando"}));
const FIFTY_E=Array.from({length:10},(_,i)=>({texto:`Te ahogas sin progreso (${i+1}).`,emocion:"hablar"}));

window.AI_DIFICIL={
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
