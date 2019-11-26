var informatica = data.informatica;
var jogos = data.jogos;
var ciencia = data.ciencia;

// pegando a posicao do vetor de noticias pela url da página
var idUrl = window.location.hash;

// verificando a url para trazer o vetor de acordo

if (idUrl.startsWith('#n')) {
    
    carregarNoticia(informatica);
}

if (idUrl.startsWith('#j')) {
    
    carregarNoticia(jogos);
}

if (idUrl.startsWith('#c')) {
    
    carregarNoticia(ciencia);
}

// função para exibir a noticia do vetor selecionado

function carregarNoticia(vetor) {
    
    var nImg = vetor[idUrl.substr(2)].img;
    var nTitulo = vetor[idUrl.substr(2)].titulo;
    var nData = vetor[idUrl.substr(2)].data
    var nTexto = vetor[idUrl.substr(2)].texto;
    var nConteudo = vetor[idUrl.substr(2)].conteudo;
    img.style.backgroundImage = `url("../../img/noticias/${nImg}")`;
    
    // setando texto na tela 
    p_titulo.innerHTML = nTitulo;
    p_data.innerHTML = nData;
    p_texto.innerHTML = nTexto;
    p_conteudo.innerHTML = nConteudo;

    document.title = nTitulo;
}

// marcando um elemento da navbar 

function oneFunction(e) {

    var links = document.getElementsByClassName('l');

    for (var i = 0; i < links.length; i++) {
        
        links[i].classList.remove('active');
    }
    e.classList.add('active');
}

// verificando a url que está na barra de endereços e chamando a função de marcação que irá deixar a navbar ativa de acordo com a categoria da noticia

function startUp() {
    
    var idUrl = window.location.hash.substr(0, 2);
    var link = document.querySelector(`[href="../../index.html${idUrl}"]`);
    
    oneFunction(link);
}

// botão de pesquisar máteria

function pesquisar() {
    
    if(search_active.checked == false){
        pesquisa_div.classList.add('active');
    }else{
        pesquisa_div.classList.remove('active');
    }

}

//  pegando o id da flecha e do botão para ir ao topo

var topbutton = document.getElementById("topBtn");
var arrow = document.getElementById("arrow");

window.onscroll = function () { scrollFunction() };

var titulo = document.getElementById('p_titulo_div');

// verificando a posição dos elementos em relação ao body
var position = titulo.offsetTop;
var position_arrow = arrow.offsetTop;

// funcao chamada pelo scroll do mouse que verifica a posição para mudar o sentido da flecha

function scrollFunction() {
    if (document.body.scrollTop > position || document.documentElement.scrollTop > position) {
        topbutton.style.display = "block";
        arrow.classList.add('down');
        arrow.classList.remove('up');
    } else {
        topbutton.style.display = "none";
        arrow.classList.add('up');
        arrow.classList.remove('down');
    }
}

// função para se clicar na flecha com a classe ativa down ele subirá para o 0 da página

function downFunction() {
    if(arrow.classList.contains('down')){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }else{
        // vai descer em relação ao titulo mais um pouco para poder parar relativo
        document.body.scrollTop = position + 180;
        document.documentElement.scrollTop = position + 180;
    }
}

// botão para voltar ao topo

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// função que executa na tela automáticamente
startUp();