var json;

// navbar acompanhando o scroll
var navbar = document.getElementById('navbar');
var sticky = navbar.offsetTop;

//função ativa na rolagem do scroll

window.onscroll = function () {
    myfunction();
    scrollFunction();
}

// verificando a posicao fa navbar em relação a tela e mandando seguir a rolagem
function myfunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

var div_ap = document.getElementById('limite');
var pa = div_ap.offsetTop;

var mybutton = document.getElementById("topBtn");

function scrollFunction() {
  if (document.body.scrollTop >= pa|| document.documentElement.scrollTop >= pa) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
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

function carregaInformatica() {

    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/info', true);


    http.onload = function () {

        json = JSON.parse(http.responseText);
    }

    http.send();

    carregarVetor(data.informatica);
}

function carregaJogos() {

    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/jogos', true);


    http.onload = function () {

        json = JSON.parse(http.responseText);
    }

    http.send();
}


function carregaCiencia() {

    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/ciencia', true);


    http.onload = function () {

        json = JSON.parse(http.responseText);
    }

    http.send();
}


function carregarVetorIncial(vetorN, vetorJ, vetorC) {
    div_n1.innerHTML = '';
    div_n2.innerHTML = '';
    div_n3.innerHTML = '';
    div_noticia.innerHTML = '';

    noticias_bl.style.display = 'block';
    feed.style.display = 'block';

    var contador = 0;

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
    while (contador < json.length) {

        var cImagem = json[contador].imagem;
        var cTitulo = json[contador].titulo;
        var cTexto = json[contador].materia;
        var cFonte = json[contador].fonte;

        if (contador < 3) {

            if (contador == 0) {
                div_n1.innerHTML = `<div class="div_img_noticia" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('${cImagem}')"></div>
            <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p><p class='fonte'>${cFonte}</p>`;
            }

            if (contador == 1) {
                div_n2.innerHTML = `<div class="div_img_noticia2" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('${cImagem}')"></div>
            <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p><p class='fonte'>${cFonte}</p>`;
            }

            if (contador == 2) {
                div_n3.innerHTML = `<div class="div_img_noticia3" idnoticia="${contador}" onclick="noticia(this)" style="background-image: url('${cImagem}')"></div>
                <p idnoticia="${contador}" onclick="noticia(this)">${cTitulo}</p><p class='fonte'>${cFonte}</p>`;
            }

        } else {

            // setando informações de noticias na tela
            div_noticia.innerHTML += `<div class="noticia1_1" destaque="a" idnoticia="${contador}" onclick="noticia(this)">
            <div><img class="div_img1" src="${cImagem}" alt=""></div>
            <div class="noticia_page1"><p class='fonte_n'>${cFonte}</p>
            <p class="p_titulo">${cTitulo}</p>
            <p class="p_texto">${cTexto}</p>
            <div class="seta"><img src='img/icones/next.png' height="50px"></div></div>`;
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

    window.location.href = !idUrl.startsWith('#i') ? `html/noticias/noticia.html${idUrl}${idnoticia}` : `html/noticias/noticia.html${idnoticia}`;
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
        carregaInformatica();
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
        carregarVetorIncial(data.informatica, data.jogos, data.ciencia);
        document.title = 'Tela Inicial';
    }

}

startUp();

