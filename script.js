var game = document.querySelector(".game");
var player = document.querySelector(".persona");
var itemLixo = document.querySelector(".itemLixo");
var chao = document.querySelector(".chao");
var start = document.querySelector(".start");
var restart = document.querySelector(".restart");
var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
var chaoBottom = parseInt(window.getComputedStyle(chao).getPropertyValue("bottom"));
let placar = document.querySelector('.placarNomes');

start.style.backgroundImage = "";
restart.style.backgroundImage = "url(botao-do-ryan-verdadeiro/NewPiskelRestart-2.png.png);";

var score = document.getElementById("score");
var pontos = 95;
var life = document.getElementById("life");
var vida = 3;
life.textContent = vida;

var jogoAtivo = true; // Variável para controlar se o jogo está ativo
var bossAtivo = true;
var eventoJaAcionado = false;

function teleport() {
    var teleportRandomico = Math.floor(Math.random() * 770);
    player.style.left = teleportRandomico + 'px';
    playerLeft = teleportRandomico;
}

function movePlayerLeft() {
    if (playerLeft > 0) {
        playerLeft -= 20; //padrao é 20
        player.style.left = playerLeft + 'px';
    }
}

function movePlayerRight() {
    if (playerLeft < 745) {
        playerLeft += 20; //padrao é 20
        player.style.left = playerLeft + 'px';
    }
}
function Lose(){
    vida = 0
    life.textContent = vida;
}
function control(e) {
    if (e.key == "e" || e.key == "" || e.key == "Shift") {
        teleport();
    }
    if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        movePlayerLeft();
    }
    if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        movePlayerRight();
    }
    if(e.key == "p"){
        Lose();
    }
    if (e.keyCode == 32 && !eventoJaAcionado){
        gerarLixo();
        if(jogoAtivo == false){
            location.reload();
        }
        eventoJaAcionado = true;
    }
    
}

var gameOver = document.createElement('div');
gameOver.setAttribute("class", "gameOver");
gameOver.style.left = '50%';
gameOver.style.textAlign = 'center';
gameOver.style.fontSize = '4em';
gameOver.style.width = '600px';
gameOver.style.height = '80px';
gameOver.style.position = 'absolute';
gameOver.style.top = '50%';
gameOver.style.transform = 'translate(-50%,-140%)';
gameOver.style.color = "white";
gameOver.style.textShadow = '2px 2px 3px black';
gameOver.textContent = "GARIPOW";
game.appendChild(gameOver);
let i = 0


function spawnBoss() {
    if (!bossAtivo) return;
    jogoAtivo = false;
    var bossLeft = Math.floor(Math.random() * 770);
    var boss = document.createElement('div');
    boss.setAttribute("class", "boss");
    itemLixo.appendChild(boss);
    boss.style.backgroundImage = "url('img/gato-recycle.png')";
    boss.style.width = "100px";
    boss.style.height = "100px";
    boss.style.backgroundSize = "100px";
    boss.style.backgroundPosition = "center";
    boss.style.backgroundRepeat = "no-repeat";
    boss.style.position = "absolute";
    boss.style.left = bossLeft + 'px';
    boss.style.bottom = '0px';

    function perder() {
        gameOver.textContent = "GAME OVER";
        game.appendChild(gameOver);
        restart.style = "background-image: url(botao-do-ryan-verdadeiro/NewPiskelRestart-2.png.png)";
        game.appendChild(restart);
        jogoAtivo = false;
        bossAtivo = false;
        eventoJaAcionado = false;     
    }

    function cairBoss() {
        var bossBottom = parseInt(window.getComputedStyle(boss).getPropertyValue("bottom"));
        if (bossBottom < -381) {
            itemLixo.removeChild(boss);
            jogoAtivo = false;
            vida -= 1;
            life.textContent = vida;
        }  

        if(vida == 0){
            perder()
        }
        bossBottom -= 5;
        boss.style.bottom = bossBottom + 'px';
    }

   

    setInterval(cairBoss, 20);
    setTimeout(spawnBoss, 2);
   
}

function criaLi(){
    const li = document.createElement('li');
    return li;
}


function criaNome(textoPrompt){ //tarefa que recebe o texto do input
    const li = criaLi();
    li.innerText = textoPrompt;
    placar.appendChild(li);
    console.log(textoPrompt)
    salvarNome();
}





function salvarNome() {
    const liNome = document.querySelectorAll('li'); //pega todos os 'li' dentro de 'tarefa'.
    const listaDeNomes = [];

    for (let nomes of liNome) {
        let nomeTexto = nomes.innerText; 
        nomeTexto.trim();
        listaDeNomes.push(nomeTexto) 
    }

    const nomeJSON = JSON.stringify(listaDeNomes) 
    localStorage.setItem('nomes', nomeJSON); 
}

function adicionaNomesSalvas() {  //adiciona as nomes salvas no local storage de volta á web
    const nomes = localStorage.getItem('nomes');
    const listaDeNomes = JSON.parse(nomes); //convertendo uma string, criada com JSON novamente para um elemento Array.
  
    for (let nome of listaDeNomes) {
      criaNome(nome);
    } //cria tarefa novamente.
  }


function gerarLixo() {
    if (pontos >= 100) {
        spawnBoss();
        setTimeout(function(){
            let nome = prompt('Parábens! Você chegou ao final do jogo! Digite o seu nome para você ser incluso no "Placar de vencedores!!!"')
            criaNome(nome)
            alert(`Parabéns ${nome}! O seu nome ja foi adicionado ao placar :)\nPara ver, role a página para baixo.`)
            
            
        }, 5000);
        
    }
    if (pontos == 50) {
        alert("Aperte Shift ou 'e' para usar um teleport aleatorio!!");
    }
    if (!jogoAtivo) return;

    var lixoBottom = 0;
    var lixoLeft = Math.floor(Math.random() * 770);
    var lixo = document.createElement('div');
    lixo.setAttribute("class", "lixo");
    itemLixo.appendChild(lixo);

    function randomizar() {
        var valorRandomico = Math.floor(Math.random() * 10);
        switch (valorRandomico) {
            case 0:
                return lixo.style.backgroundImage = "url('img/caixadepapelão.png')";
            case 1:
                return lixo.style.backgroundImage = "url('img/Garrafapet.png')";
            case 2:
                return lixo.style.backgroundImage = "url('img/cascadebanana.png')";
            case 3:
                return lixo.style.backgroundImage = "url('img/lampada.png')";
            case 4:
                return lixo.style.backgroundImage = "url('img/Latinha.png')";
            case 5:
                return lixo.style.backgroundImage = "url('img/maçapodre.png')";
            case 6:
                return lixo.style.backgroundImage = "url('img/celular.png')";
            case 7:
                return lixo.style.backgroundImage = "url('img/computador.png')";
            case 8:
                return lixo.style.backgroundImage = "url('img/Papel.png')";
            case 9:
                return lixo.style.backgroundImage = "url('img/Vidro.png')";
            default:
                return lixo.style.backgroundImage = "gray";
        }
    }

    function perder() {
        gameOver.textContent = "GAME OVER";
        game.appendChild(gameOver);
        restart.style.backgroundImage = "url(botao-do-ryan-verdadeiro/NewPiskelRestart-2.png.png)";
        game.appendChild(restart);
        jogoAtivo = false;
        eventoJaAcionado = false;
        return;
    }

    function cairLixo() {
        if (!jogoAtivo) return;

        if (lixoBottom < -381) {
            itemLixo.removeChild(lixo);
            vida -= 1;
            life.textContent = vida;
        }
        if (vida == 0) {
            perder();
        }
        var playerRight = playerLeft + 50;
        var lixoRight = lixoLeft + 60;
        if (playerLeft < lixoRight && playerRight > lixoLeft && lixoBottom < -301) {
            itemLixo.removeChild(lixo);
            pontos++;
            score.textContent = pontos;
        }
        lixoBottom -= 5;
        lixo.style.bottom = lixoBottom + 'px';
        lixo.style.left = lixoLeft + 'px';

         ////////////////////////
    if(pontos > 101){
        vida = -1
        life.textContent = vida
        }
        ///////////////////
    }

    setInterval(cairLixo, 28);
    setTimeout(gerarLixo, 1200);
    setTimeout(randomizar, 0);
    game.removeChild(start);
    game.removeChild(gameOver);

   
}

game.removeChild(restart);
document.addEventListener("keydown", control);
restart.addEventListener("click", function () {
    location.reload();
});
adicionaNomesSalvas();

// setTimeout(function(){
        
//     while(i !== 1){
//         i++
//         console.log(i)
//      }

//     if (i === 1){
//         let nome = prompt('Parábens! Você chegou ao final do jogo! Digite o seu nome para você ser incluso no "Placar de vencedores!!!"')   
        
//         console.log(nome);}
// }, 2000);