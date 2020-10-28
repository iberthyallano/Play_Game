let posicaoY = parseInt(Math.random() * 334);

let direction = " ";
let disparo = false;
let podeAtirar = true;
let fimdejogo = false;
var velocidade = 5;
let pontos = 0;
let salvos = 0;
let perdidos = 0;
let energiaAtual = 3;

let somDisparo = document.getElementById("somDisparo");
let somExplosao = document.getElementById("somExplosao");
let musica = document.getElementById("musica");
let somGameover = document.getElementById("somGameover");
let somPerdido = document.getElementById("somPerdido");
let somResgate = document.getElementById("somResgate");


function atualiza(event){
    if(event.keyCode == 38){
        direction = "up";
    }else if(event.keyCode == 40){
        direction = "down";
    }else if(event.keyCode == 68){
        disparo = true
    }
}

function tiro(){
    if(podeAtirar){
        somDisparo.play();
        podeAtirar=false;
        topo = parseInt($("#jogador").css("top"));
        posicaoX= parseInt($("#jogador").css("left"));
        tiroX = posicaoX + 190;
        topoTiro=topo+37;
        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);    
        let tempoDisparo=window.setInterval(() => {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
            if (posicaoX>900) { 
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;
                $("#disparo").remove();
                podeAtirar=true;
            }
        }, 30);
    }
}

function movejogador(){   
    if(direction === "up"){
        let topo = parseInt($("#jogador").css("top"));
        if (topo > 0) {
            $("#jogador").css("top",topo-10);
        }
        direction = " ";
    }else if(direction === "down") {
        let topo = parseInt($("#jogador").css("top"));
        if (topo < 434) {	
            $("#jogador").css("top",topo+10);  
        }
        direction = " ";	
    }else if(disparo){
        tiro();
        disparo = false;
    }
} 

function moveinimigo1() {
	posicaoX = parseInt($("#inimigo1").css("left"));
	$("#inimigo1").css("left",posicaoX-velocidade);
	$("#inimigo1").css("top",posicaoY);
    if (posicaoX<=0) {
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);	
	}
}

function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);		
    if (posicaoX<=0) {
        $("#inimigo2").css("left",775);			
    }
}

function moveamigo() {
	posicaoX = parseInt($("#amigo").css("left"));
	$("#amigo").css("left",posicaoX+1);			
    if (posicaoX>906) {	
		$("#amigo").css("left",0);			
	}
}

function explosao(inimigoX,inimigoY) {
    somExplosao.play();
    $("#fundoGame").append("<div id='explosao'></div>");
    $("#explosao").css("background-image", "url(../images/explosao.png)");
    let div=$("#explosao");
    div.css("top", inimigoY);
    div.css("left", inimigoX);
    div.animate({width:200, opacity:0}, "slow");
    let tempoExplosao = window.setInterval(() =>{
        div.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao = null; 
    }, 1000);
} 

function reposicionaInimigo2(){
    let tempoColisao4 = window.setInterval(() => {
        window.clearInterval(tempoColisao4);
        tempoColisao4 = null;
        if (fimdejogo == false) {
            $("#fundoGame").append("<div id='inimigo2'></div>");
        }
    } , 5000);
}

function reposicionaAmigo() {
	let tempoAmigo = window.setInterval(() => {
        window.clearInterval(tempoAmigo);
		tempoAmigo = null;
		if (fimdejogo == false) {
		    $("#fundoGame").append("<div id='amigo' class='amigo'></div>");
		}
    }, 6000);	
}

function explosaoAmigo(amigoX,amigoY) {
    somPerdido.play();
    $("#fundoGame").append("<div id='explosaoAmigo' class='amigoMorre'></div>");
    $("#explosaoAmigo").css("top",amigoY);
    $("#explosaoAmigo").css("left",amigoX);
    let tempoExplosao = window.setInterval(() => {
        $("#explosaoAmigo").remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao = null;
    } , 1000);
}

function colisao() {
    let colisao_inimigo1 = ($("#jogador").collision($("#inimigo1")));
    let colisao_inimigo2 = ($("#jogador").collision($("#inimigo2")));
    let colisao_disparo_inimigo1 = ($("#disparo").collision($("#inimigo1")));
    let colisao_disparo_inimigo2 = ($("#disparo").collision($("#inimigo2")));
    let colisao_jogador_amigo = ($("#jogador").collision($("#amigo")));
    let colisao_amigo_inimigo2 = ($("#inimigo2").collision($("#amigo")));
    
    if(colisao_inimigo1.length > 0){
        energiaAtual--;
        inimigoX = parseInt($("#inimigo1").css("left"));
        inimigoY = parseInt($("#inimigo1").css("top"));
        explosao(inimigoX,inimigoY);
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
    }
    if(colisao_inimigo2 .length > 0){
        energiaAtual--;
        inimigoX = parseInt($("#inimigo2").css("left"));
        inimigoY = parseInt($("#inimigo2").css("top"));
        explosao(inimigoX,inimigoY);     
        $("#inimigo2").remove();
        reposicionaInimigo2();
    }	
    if(colisao_disparo_inimigo1.length > 0){
        pontos += 100;
        velocidade += 0.3;
        inimigoX = parseInt($("#inimigo1").css("left"));
        inimigoY = parseInt($("#inimigo1").css("top"));
        explosao(inimigoX,inimigoY);
        $("#disparo").css("left",950);  
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
    }
    if(colisao_disparo_inimigo2.length > 0){
        pontos += 50;
        inimigoX = parseInt($("#inimigo2").css("left"));
        inimigoY = parseInt($("#inimigo2").css("top"));
        $("#inimigo2").remove();
        explosao(inimigoX,inimigoY);
        $("#disparo").css("left",950);
        reposicionaInimigo2();
    }
    if(colisao_jogador_amigo.length > 0){
        salvos++;
        somResgate.play();
        reposicionaAmigo();
        $("#amigo").remove();
    }
    if(colisao_amigo_inimigo2.length > 0){
        perdidos++;
        amigoX = parseInt($("#amigo").css("left"));
        amigoY = parseInt($("#amigo").css("top"));
        explosaoAmigo(amigoX,amigoY);
        $("#amigo").remove();
        reposicionaAmigo();    
    }
} 

function start(){
 
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='jogador'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='inimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='amigo'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    document.addEventListener('keydown', atualiza);

    let jogo = {};

    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    jogo.timer = setInterval(loop,20);

	function loop() {
        (() => {
            esquerda = parseInt($("#fundoGame").css("background-position"));
	        $("#fundoGame").css("background-position",esquerda-1);
        })()
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        (() => {
            $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        })()
        if (energiaAtual==3) {
            $("#energia").css("background-image", "url(../images/energia3.png)");
        }
        if (energiaAtual==2) {   
            $("#energia").css("background-image", "url(../images/energia2.png)");
        }
        if (energiaAtual==1) {   
            $("#energia").css("background-image", "url(../images/energia1.png)");
        }
        if (energiaAtual==0) {   
            $("#energia").css("background-image", "url(../images/energia0.png)");
            fimdejogo=true;
            musica.pause();
            somGameover.play();
            
            window.clearInterval(jogo.timer);
            jogo.timer = null;
            
            $("#jogador").remove();
            $("#inimigo1").remove();
            $("#inimigo2").remove();
            $("#amigo").remove();
            
            $("#fundoGame").append("<div id='fim'></div>");
            
            $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick='document.location.reload(true);'><h3>Jogar Novamente</h3></div>");
        }
	}
} 