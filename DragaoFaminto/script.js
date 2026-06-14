let numeroSorteado;
let quantidadeSelecionada = 0;

let numerosDisponiveis = [];

let questaoAtual = 0;
let estrelas = 0;
let faseAtual = 1;

const numero = document.getElementById("numero");
const macas = document.getElementById("macas");
const mensagem = document.getElementById("mensagem");
const contadorMacas = document.getElementById("contadorMacas");
const dragao = document.getElementById("dragao");
const alvoDragao = document.getElementById("alvoDragao");

const progressoTexto =
document.getElementById("progressoTexto");

const barra =
document.getElementById("barra");

const estrelasElemento =
document.getElementById("estrelas");

const telaVitoria =
document.getElementById("telaVitoria");

const btnProximaFase =
document.getElementById("btnProximaFase");

const faseTexto =
document.getElementById("faseAtual");

const textoMedalha =
document.getElementById("textoMedalha");

function configurarFase() {

    questaoAtual = 0;

    if (faseAtual === 1) {

        faseTexto.innerHTML =
        "🥉 FASE 1 - BRONZE";

        numerosDisponiveis =
        [1, 2, 3, 4, 5];
    }

    else if (faseAtual === 2) {

        faseTexto.innerHTML =
        "🥈 FASE 2 - PRATA";

        numerosDisponiveis =
        [1,2,3,4,5,6,7,8,9,10];
    }

    else {

        faseTexto.innerHTML =
        "🥇 FASE 3 - OURO";

        numerosDisponiveis =
        [
            1,2,3,4,5,
            6,7,8,9,10,
            11,12,13,14,15,
            16,17,18,19,20
        ];
    }

    embaralharNumeros();

    atualizarProgresso();
}

function embaralharNumeros() {

    for (let i = numerosDisponiveis.length - 1; i > 0; i--) {

        const j =
        Math.floor(Math.random() * (i + 1));

        [
            numerosDisponiveis[i],
            numerosDisponiveis[j]
        ] =
        [
            numerosDisponiveis[j],
            numerosDisponiveis[i]
        ];
    }
}

function atualizarEstrelas() {

    let texto = "";

    for (let i = 0; i < estrelas; i++) {
        texto += "⭐ ";
    }

    for (let i = estrelas; i < 5; i++) {
        texto += "☆ ";
    }

    estrelasElemento.innerHTML = texto;
}

function atualizarProgresso() {

    let totalQuestoes =
    numerosDisponiveis.length +
    questaoAtual;

    progressoTexto.innerHTML =
    "Questão " +
    questaoAtual +
    " de " +
    totalQuestoes;

    let porcentagem =
    (questaoAtual / totalQuestoes) * 100;

    barra.style.width =
    porcentagem + "%";
}

function mostrarTelaFase() {

    document.getElementById("numero")
    .style.display = "none";

    document.getElementById("contadorMacas")
    .style.display = "none";

    document.getElementById("macas")
    .style.display = "none";

    document.getElementById("areaDragao")
    .style.display = "none";

    telaVitoria.style.display =
    "block";

    if (faseAtual === 1) {

        textoMedalha.innerHTML =
        "🥉 Você ganhou a Medalha Bronze!";
    }

    else if (faseAtual === 2) {

        textoMedalha.innerHTML =
        "🥈 Você ganhou a Medalha Prata!";
    }

    else {

        textoMedalha.innerHTML =
        "🥇 Você ganhou a Medalha Ouro!<br><br>🏆 Jogo Concluído!";
        
        btnProximaFase.innerHTML =
        "Jogar Novamente";
    }
}

function novaRodada() {

    quantidadeSelecionada = 0;

    contadorMacas.innerHTML =
    "Maçãs dadas: 0";

    macas.innerHTML = "";

    mensagem.innerHTML = "";

    if (numerosDisponiveis.length === 0) {

        mostrarTelaFase();

        return;
    }

    numeroSorteado =
    numerosDisponiveis.pop();

    questaoAtual++;

    atualizarProgresso();

    numero.innerHTML =
    numeroSorteado;

    let totalMacas =
    Math.max(20, numeroSorteado);

    for (let i = 0; i < totalMacas; i++) {

        const maca =
        document.createElement("img");

        maca.src = "img/maca.png";

        maca.classList.add("maca");

        maca.draggable = true;

        macas.appendChild(maca);
    }
}

alvoDragao.addEventListener(
    "dragover",
    (e) => {

        e.preventDefault();

        alvoDragao.classList.add(
            "alvoAtivo"
        );
    }
);

alvoDragao.addEventListener(
    "dragleave",
    () => {

        alvoDragao.classList.remove(
            "alvoAtivo"
        );
    }
);

alvoDragao.addEventListener(
    "drop",
    (e) => {

        e.preventDefault();

        alvoDragao.classList.remove(
            "alvoAtivo"
        );

        alimentarDragao();
    }
);

alvoDragao.addEventListener(
    "touchend",
    () => {

        alimentarDragao();
    }
);

function alimentarDragao() {

    const maca =
    document.querySelector(".maca");

    if (!maca) return;

    maca.remove();

    quantidadeSelecionada++;

    contadorMacas.innerHTML =
    "Maçãs dadas: " +
    quantidadeSelecionada +
    " de " +
    numeroSorteado;

    const somNhac =
    document.getElementById(
        "somNhac"
    );

    somNhac.currentTime = 0;

    somNhac.play();

    dragao.classList.add("feliz");

    setTimeout(() => {

        dragao.classList.remove("feliz");

    }, 300);

    verificarResultado();
}

function verificarResultado() {

    if (
        quantidadeSelecionada ===
        numeroSorteado
    ) {

        mensagem.innerHTML =
        "🎉 Muito Bem! 🎉";

        document
        .getElementById("somAcerto")
        .play();

        if (
            estrelas < 5
        ) {

            estrelas++;

            atualizarEstrelas();
        }

        setTimeout(() => {

            novaRodada();

        }, 1800);
    }

    else if (
        quantidadeSelecionada >
        numeroSorteado
    ) {

        mensagem.innerHTML =
        "😢 Tente novamente!";

        document
        .getElementById("somErro")
        .play();

        setTimeout(() => {

            novaRodada();

        }, 1800);
    }
}

btnProximaFase.addEventListener(
    "click",
    () => {

        if (faseAtual < 3) {

            faseAtual++;

            telaVitoria.style.display =
            "none";

            document.getElementById("numero")
            .style.display = "block";

            document.getElementById("contadorMacas")
            .style.display = "block";

            document.getElementById("macas")
            .style.display = "flex";

            document.getElementById("areaDragao")
            .style.display = "flex";

            configurarFase();

            novaRodada();
        }

        else {

            faseAtual = 1;
            estrelas = 0;

            atualizarEstrelas();

            btnProximaFase.innerHTML =
            "Próxima Fase ➡️";

            telaVitoria.style.display =
            "none";

            document.getElementById("numero")
            .style.display = "block";

            document.getElementById("contadorMacas")
            .style.display = "block";

            document.getElementById("macas")
            .style.display = "flex";

            document.getElementById("areaDragao")
            .style.display = "flex";

            configurarFase();

            novaRodada();
        }
    }
);

document.body.addEventListener(
    "click",
    () => {

        const musica =
        document.getElementById(
            "musicaFundo"
        );

        if (musica.paused) {

            musica.volume = 0.25;

            musica.play();
        }

    },
    { once: true }
);

configurarFase();

atualizarEstrelas();

novaRodada();