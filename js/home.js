
// navbar acompanhando o scroll
var navbar = document.getElementById('navbar');
var sticky = navbar.offsetTop;

//função ativa na rolagem do scroll

window.onscroll = function () {
    myfunction();
}

// verificando a posicao fa navbar em relação a tela e mandando seguir a rolagem
function myfunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}


// -----------

function oneFunction(e) {

    var links = document.getElementsByClassName('l');
    var idUrl = window.location.hash;

    for (var i = 0; i < links.length; i++) {

        links[i].classList.remove('active');
    }
    if (!idUrl.startsWith('#i')) {
        e.classList.add('active');
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function pesquisar() {

    if (search_active.checked == false) {
        pesquisa_div.classList.add('active');
    } else {
        pesquisa_div.classList.remove('active');
    }
    
}

// document.onclick = function(e){
//     if(!pesquisa_div.contains(e.target)){
//         pesquisa_div.classList.remove('active');
//     }
// };
// pegando o vetor do arquivos noticias.js

function carregarVetorIncial(vetorN, vetorJ, vetorC) {
    div_n1.innerHTML = '';
    div_n2.innerHTML = '';
    div_n3.innerHTML = '';
    div_noticia.innerHTML = '';

    noticias_bl.style.display = 'block';
    feed.style.display = 'block';

    var contador = 0;

    // Math.random

    var nImagem = vetorN[contador].img;
    var jImagem = vetorJ[contador].img;
    var cImagem = vetorC[contador].img;
    var nTitulo = vetorN[contador].titulo;
    var jTitulo = vetorJ[contador].titulo;
    var cTitulo = vetorC[contador].titulo;

    div_n1.innerHTML = `<div class="div_img_noticia" idnoticia="#n0" onclick="noticia(this)" style="background-image: url('img/noticias/${nImagem}')"></div>
    <span onclick="noticia(this)" class='cFeed1'>Informática</span><p idnoticia="#n0" onclick="noticia(this)">${nTitulo}</p>`;

    div_n2.innerHTML = `<div class="div_img_noticia2" idnoticia="#j0" onclick="noticia(this)" style="background-image: url('img/noticias/${jImagem}')"></div>
    <span onclick="noticia(this)" class='cFeed'>Jogos</span><p idnoticia="#j0" onclick="noticia(this)">${jTitulo}</p>`;

    div_n3.innerHTML = `<div class="div_img_noticia3" idnoticia="#c0" onclick="noticia(this)" style="background-image: url('img/noticias/${cImagem}')"></div>
    <span onclick="noticia(this)" class='cFeed'>Ciência</span><p idnoticia="#c0" onclick="noticia(this)">${cTitulo}</p>`;

}

function carregarVetor(vetor) {

    div_n1.innerHTML = '';
    div_n2.innerHTML = '';
    div_n3.innerHTML = '';
    div_noticia.innerHTML = '';

    noticias_bl.style.display = 'block';
    feed.style.display = 'none';

    var contador = 0;
    // verificando em qual página está para trazer a noticia
    while (contador < vetor.length) {

        var cImagem = vetor[contador].img;
        var cTitulo = vetor[contador].titulo;
        var cTexto = vetor[contador].texto;

        if (contador < 3) {

            if (contador == 0) {
                div_n1.innerHTML = `<div class="div_img_noticia" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('img/noticias/${cImagem}')"></div>
            <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p>`;
            }

            if (contador == 1) {
                div_n2.innerHTML = `<div class="div_img_noticia2" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('img/noticias/${cImagem}')"></div>
            <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p>`;
            }

            if (contador == 2) {
                div_n3.innerHTML = `<div class="div_img_noticia3" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('img/noticias/${cImagem}')"></div>
                <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p>`;
            }

        } else {

            // setando informações de noticias na tela
            div_noticia.innerHTML += `<div class="noticia1_1" destaque="a" idnoticia="${contador}" onclick="noticia(this)">
            <div><img class="div_img1" src="img/noticias/${cImagem}" alt=""></div>
            <div class="noticia_page1"><p class="p_titulo">${cTitulo}</p>
            <p class="p_texto">${cTexto}</p>
            <div class="seta"><img src='img/icones/next.png' height="50px"></div></div >`;
        }
        contador++;
    }

}

//---------------------------------

function noticia(e) {
    var idUrl = window.location.hash;
    
    // ao clicar numa noticia, pegar o atributo da div com o vetor e guardar
    var idnoticia = e.getAttribute('idnoticia');
    // var destaque = e.getAttribute('destaque');

        window.location.href = !idUrl.startsWith('#i')? `html/noticias/noticia.html${idUrl}${idnoticia}`: `html/noticias/noticia.html${idnoticia}`;
    // atribuir a posição do vetor a URL
}

function startUp() {

    var idUrl = window.location.hash;
    var link = document.querySelector(`[href="${idUrl}"]`);

    if (idUrl == '') {
        document.location.href = '#i';
    }

    oneFunction(link);

    if (idUrl == '#n') {
        carregarVetor(data.informatica);
        document.title = 'Informática';
    }
    if (idUrl == '#j') {
        carregarVetor(data.jogos);
        document.title = 'Jogos';
    }
    if (idUrl == '#c') {
        carregarVetor(data.ciencia);
        document.title = 'Ciencia';
    }
    if (idUrl == '#i') {
        // ativo_inicio();
        carregarVetorIncial(data.informatica, data.jogos, data.ciencia)
        document.title = 'Tela Inicial';
    }

}

startUp();