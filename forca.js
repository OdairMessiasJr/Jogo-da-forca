let palavraSecreta = "";
let erros = 0;
let acertos = 0;
let letrasTentadas = [];

const canvas = document.getElementById('canvas-forca');
const ctx = canvas.getContext('2d');

function desenharLava(offsetAnimacao = 0) {
    // Fundo da lava
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(0, 215, 200, 35);
    
    // Camada de ondas quentes animadas por offset
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.moveTo(0, 215);
    for(let i=0; i<=200; i+=20) {
        let ondaOffset = Math.sin((i + offsetAnimacao) * 0.1) * 3;
        ctx.quadraticCurveTo(i - 10, 210 + ondaOffset, i, 215);
    }
    ctx.lineTo(200, 250);
    ctx.lineTo(0, 250);
    ctx.fill();
}

function desenharGrama() {
    // Fundo da grama
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(0, 215, 200, 35);
    
    // Folhas de grama
    ctx.fillStyle = "#2ecc71";
    for(let i=0; i<200; i+=10) {
        ctx.beginPath();
        ctx.moveTo(i, 215);
        ctx.lineTo(i+5, 200);
        ctx.lineTo(i+10, 215);
        ctx.fill();
    }
}

function desenharCenaInteira(quedaY = 0, hideRope = false, splashY = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Desenha Poste e Corda
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, 220); ctx.lineTo(50, 20);   
    ctx.lineTo(130, 20); 
    if (!hideRope) {
        ctx.lineTo(130, 50);  
    } else {
        ctx.lineTo(130, 30);  // Corda arrebentada
    }
    ctx.stroke();

    // Desenha o boneco nas coordenadas certas, com o offset de queda se houver
    ctx.save();
    ctx.translate(0, quedaY);
    for (let i = 1; i <= erros; i++) {
        desenharBoneco(i);
    }
    ctx.restore();

    // Desenha o texto SPLASH! que vai subir da lava
    if (splashY !== null) {
        ctx.fillStyle = "#e67e22";
        ctx.font = "bold 26px 'Segoe UI'";
        ctx.textAlign = "center";
        ctx.fillText("SPLASH!", 130, splashY);
    }

    // A lava é desenhada por cima do boneco para ele afundar nela
    desenharLava(quedaY);
}

function desenharCenaVitoria() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha o boneco completo sorridente em pé
    desenharBonecoVitoria();
    
    // Desenha a grama
    desenharGrama();
}

function desenharBoneco(parte) {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;

    switch (parte) {
        case 1: // Cabeça, rosto e cabelo
            // Cabelo (fundo)
            ctx.fillStyle = "#5c3a21";
            ctx.beginPath();
            ctx.arc(130, 65, 22, 0, Math.PI * 2);
            ctx.fill();
            
            // Rosto
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.arc(130, 70, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Olhinhos
            ctx.fillStyle = "#333";
            ctx.beginPath();
            ctx.arc(124, 66, 2.5, 0, Math.PI * 2);
            ctx.arc(136, 66, 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Bochechas
            ctx.fillStyle = "#ffb3c6";
            ctx.beginPath();
            ctx.arc(119, 71, 3, 0, Math.PI * 2);
            ctx.arc(141, 71, 3, 0, Math.PI * 2);
            ctx.fill();

            // Boquinha triste
            ctx.beginPath();
            ctx.arc(130, 78, 4, Math.PI, 0);
            ctx.stroke();
            
            // Franjinha
            ctx.fillStyle = "#5c3a21";
            ctx.beginPath();
            ctx.arc(130, 56, 18, Math.PI, 0);
            ctx.fill();
            
            // Marias-chiquinhas
            ctx.beginPath();
            ctx.arc(106, 65, 10, 0, Math.PI * 2);
            ctx.arc(154, 65, 10, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 2: // Corpo (Vestidinho rosa)
            ctx.fillStyle = "#ff9a9e";
            ctx.beginPath();
            ctx.moveTo(122, 88);
            ctx.lineTo(138, 88); 
            ctx.lineTo(148, 150); 
            ctx.lineTo(112, 150); 
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;

        case 3: // Braço Esquerdo + Mão
            ctx.fillStyle = "#ff9a9e";
            ctx.beginPath();
            ctx.moveTo(122, 90);
            ctx.lineTo(105, 110);
            ctx.lineTo(115, 115);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(110, 112);
            ctx.lineTo(95, 130);
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            ctx.lineWidth = 1.5;
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.arc(95, 132, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;

        case 4: // Braço Direito + Mão
            ctx.fillStyle = "#ff9a9e";
            ctx.beginPath();
            ctx.moveTo(138, 90);
            ctx.lineTo(155, 110);
            ctx.lineTo(145, 115);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(150, 112);
            ctx.lineTo(165, 130);
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            ctx.lineWidth = 1.5;
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.arc(165, 132, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;

        case 5: // Perna Esquerda + Sapato
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.rect(116, 150, 6, 30);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = "#d81b60";
            ctx.beginPath();
            ctx.ellipse(116, 180, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;

        case 6: // Perna Direita + Sapato
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.rect(138, 150, 6, 30);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = "#d81b60";
            ctx.beginPath();
            ctx.ellipse(144, 180, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
    }
}

function desenharBonecoVitoria() {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;

    // Cabeça, rosto e cabelo sorridente
    // Cabelo (fundo)
    ctx.fillStyle = "#5c3a21";
    ctx.beginPath();
    ctx.arc(100, 70, 22, 0, Math.PI * 2);
    ctx.fill();
    
    // Rosto
    ctx.fillStyle = "#ffe0bd";
    ctx.beginPath();
    ctx.arc(100, 75, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Olhinhos felizes
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(94, 66, 2.5, 0, Math.PI * 2);
    ctx.arc(106, 66, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Bochechas rosadas
    ctx.fillStyle = "#ffb3c6";
    ctx.beginPath();
    ctx.arc(89, 71, 3, 0, Math.PI * 2);
    ctx.arc(111, 71, 3, 0, Math.PI * 2);
    ctx.fill();

    // Boquinha sorridente
    ctx.beginPath();
    ctx.arc(100, 78, 4, 0, Math.PI);
    ctx.stroke();
    
    // Franjinha
    ctx.fillStyle = "#5c3a21";
    ctx.beginPath();
    ctx.arc(100, 56, 18, Math.PI, 0);
    ctx.fill();
    
    // Marias-chiquinhas
    ctx.beginPath();
    ctx.arc(76, 65, 10, 0, Math.PI * 2);
    ctx.arc(124, 65, 10, 0, Math.PI * 2);
    ctx.fill();

    // Corpo (Vestidinho rosa)
    ctx.fillStyle = "#ff9a9e";
    ctx.beginPath();
    ctx.moveTo(92, 93);
    ctx.lineTo(108, 93); 
    ctx.lineTo(118, 155); 
    ctx.lineTo(82, 155); 
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Braços
    ctx.fillStyle = "#ff9a9e";
    ctx.beginPath();
    ctx.moveTo(92, 95);
    ctx.lineTo(75, 115);
    ctx.lineTo(85, 120);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(108, 95);
    ctx.lineTo(125, 115);
    ctx.lineTo(115, 120);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(80, 117);
    ctx.lineTo(65, 135);
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(120, 117);
    ctx.lineTo(135, 135);
    ctx.stroke();
    
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#ffe0bd";
    ctx.beginPath();
    ctx.arc(65, 137, 4, 0, Math.PI * 2);
    ctx.arc(135, 137, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pernas + Sapatos
    ctx.fillStyle = "#ffe0bd";
    ctx.beginPath();
    ctx.rect(88, 155, 6, 30);
    ctx.rect(106, 155, 6, 30);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = "#d81b60";
    ctx.beginPath();
    ctx.ellipse(88, 185, 9, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(112, 185, 9, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function iniciarJogo() {
    palavraSecreta = document.getElementById('inputPalavra').value.toUpperCase().trim();
    if (palavraSecreta.length < 1) return alert("Digite uma palavra!");

    erros = 0;
    acertos = 0;
    letrasTentadas = [];

    document.getElementById('setup').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';

    desenharCenaInteira();
    atualizarDisplay();
    gerarTeclado();
}

function gerarTeclado() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const tecladoDiv = document.getElementById('teclado');
    tecladoDiv.innerHTML = '';
    letras.split('').forEach(letra => {
        const btn = document.createElement('button');
        btn.innerText = letra;
        btn.onclick = () => verificarLetra(letra, btn);
        tecladoDiv.appendChild(btn);
    });
}

function verificarLetra(letra, botao) {
    botao.disabled = true;
    if (palavraSecreta.includes(letra)) {
        letrasTentadas.push(letra);
        atualizarDisplay();
        verificarVitoria();
    } else {
        erros++;
        desenharCenaInteira();
        if (erros === 6) terminarJogo(false);
    }
}

function atualizarDisplay() {
    const display = palavraSecreta.split('').map(l => letrasTentadas.includes(l) ? l : "_").join("");
    document.getElementById('displayPalavra').innerText = display;
}

function verificarVitoria() {
    const atual = document.getElementById('displayPalavra').innerText.replace(/\s/g, '');
    if (atual === palavraSecreta) terminarJogo(true);
}

let yCaida = 0;
let splashTextY = 220;

function animarQueda() {
    yCaida += 5;
    let currentSplashY = null;

    if (yCaida > 60) { // Boneco tocando a lava
        splashTextY -= 2;
        currentSplashY = splashTextY;
    }

    desenharCenaInteira(yCaida, true, currentSplashY);

    if (splashTextY > 120) {
        requestAnimationFrame(animarQueda);
    } else {
        mostrarMensagemFim(false);
    }
}

function mostrarMensagemFim(venceu) {
    const msg = document.getElementById('mensagem');
    msg.innerText = venceu ? "🎉 Você Venceu!" : `💀 Game Over! A palavra era: ${palavraSecreta}`;
    msg.style.color = venceu ? "#27ae60" : "#c0392b";
    document.querySelectorAll('.teclado button').forEach(b => b.disabled = true);
}

function terminarJogo(venceu) {
    document.querySelectorAll('.teclado button').forEach(b => b.disabled = true);
    if (!venceu) {
        yCaida = 0;
        splashTextY = 220;
        animarQueda();
    } else {
        desenharCenaVitoria();
        mostrarMensagemFim(true);
    }
}