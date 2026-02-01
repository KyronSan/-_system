(function(){

    /* ======================================================
       IA NEGRA — STOCKFISH (WASM)
       Usa stockfish.js + stockfish.wasm
       ====================================================== */

    let engine = null;
    let isThinking = false;

    // 🔹 Inicializar Stockfish
    function initStockfish(){
        if(engine) return;

        engine = new Worker("stockfish/stockfish.js");

        engine.onmessage = function(e){
            const line = e.data;

            // console.log("SF:", line);

            if(line.startsWith("bestmove")){
                const move = line.split(" ")[1];
                isThinking = false;

                if(move && move !== "(none)"){
                    playStockfishMove(move);
                } else {
                    reportBlackAIStatus("sin movimientos");
                }
            }
        };

        engine.postMessage("uci");
        engine.postMessage("isready");
    }

    // 🔹 Convertir tu board a FEN
    function boardToFEN(){
        let fen = "";
        for(let r=0;r<8;r++){
            let empty = 0;
            for(let c=0;c<8;c++){
                const p = board[r][c];
                if(!p){
                    empty++;
                } else {
                    if(empty){
                        fen += empty;
                        empty = 0;
                    }
                    fen += pieceToFEN(p);
                }
            }
            if(empty) fen += empty;
            if(r !== 7) fen += "/";
        }

        fen += " b ";                // turno negras
        fen += "- - 0 1";             // castling y en-passant simplificados
        return fen;
    }

    function pieceToFEN(p){
        const map = {
            "w_pawn":"P", "w_rook":"R", "w_knight":"N", "w_bishop":"B", "w_queen":"Q", "w_king":"K",
            "b_pawn":"p", "b_rook":"r", "b_knight":"n", "b_bishop":"b", "b_queen":"q", "b_king":"k"
        };
        return map[p] || "";
    }

    // 🔹 Ejecutar movimiento de Stockfish
    function playStockfishMove(move){
        const fromFile = move.charCodeAt(0) - 97;
        const fromRank = 8 - parseInt(move[1]);
        const toFile   = move.charCodeAt(2) - 97;
        const toRank   = 8 - parseInt(move[3]);

        selected = { r: fromRank, c: fromFile };
        possibleMoves = getValidMoves(fromRank, fromFile);

        const ok = movePiece(fromRank, fromFile, toRank, toFile);

        selected = null;
        possibleMoves = [];

        if(!ok){
            reportBlackAIStatus("movimiento inválido");
            return;
        }

        reportBlackAIStatus("movió (Stockfish)");
    }

    // 🔹 Pedir jugada a Stockfish
    window.requestBlackMove = function(){

        if(gameOver) return;
        if(turn !== 'b') return;
        if(isThinking) return;

        initStockfish();
        isThinking = true;

        reportBlackAIStatus("pensando…");

        const fen = boardToFEN();

        engine.postMessage("position fen " + fen);
        engine.postMessage("go depth 12"); // 🔥 puedes subir/bajar fuerza
    };

    function reportBlackAIStatus(text){
        const box = document.getElementById("aiStatus");
        if(box){
            box.textContent = "IA Negra: " + text;
        }
    }

})();
