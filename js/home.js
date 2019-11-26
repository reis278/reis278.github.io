
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

var mybutton = document.getElementById("topBtn");

// exibindo botão para subir após uma posição da tela

function scrollFunction() {
    if (document.body.scrollTop >= 400 || document.documentElement.scrollTop >= 400) {
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

// função para marcar na navbar como ativa a sessão em que o usuário está

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

// barra de pesquisa onde o usuário pesquisará as noticias

function pesquisar() {

    if (search_active.checked == false) {
        pesquisa_div.classList.add('active');
    } else {
        pesquisa_div.classList.remove('active');
    }
}



// função para pegar a resposta do servidor que traz as noticias e guardar em um vetor
var json;

function carregaInformatica() {
    // pegando a resposta do servidor
    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/info', true);

    // assim que chegar ele pega e carrega a função que chama o vetor com as noticias
    http.onload = function () {

        json = JSON.parse(http.responseText);
        carregarVetor();
    }

    http.send();

}

function carregaMateriaInformatica(nId) {

    var idnoticia = nId.getAttribute('idnoticia');

    var http = new XMLHttpRequest();
    http.open('post', 'http://localhost:3000/minfo', true);
    http.send("link=" + idnoticia);

    window.location.href = idnoticia;
}


// função para pegar a resposta do servidor que traz as noticias e guardar em um vetor
function carregaJogos() {

    // pegando a resposta do servidor
    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/jogos', true);

    // assim que chegar ele pega e carrega a função que chama o vetor com as noticias
    http.onload = function () {

        json = JSON.parse(http.responseText);
    }

    http.send();
}

// função para pegar a resposta do servidor que traz as noticias e guardar em um vetor
function carregaCiencia() {
    // pegando a resposta do servidor
    var http = new XMLHttpRequest();
    http.open('get', 'http://techdigital-reis278-com-br.umbler.net/ciencia', true);

    // assim que chegar ele pega e carrega a função que chama o vetor com as noticias
    http.onload = function () {

        json = JSON.parse(http.responseText);
    }

    http.send();
}

// função para carregar noticias pré cadastradas como destaque 
function carregarVetorIncial(vetorN, vetorJ, vetorC) {
    // limpando o contéudo na tela para alterar o vetor
    div_n1.innerHTML = '';
    div_n2.innerHTML = '';
    div_n3.innerHTML = '';
    div_noticia.innerHTML = '';

    noticias_bl.style.display = 'block';
    feed.style.display = 'block';

    contador = 0;
    var n = vetorN.length + vetorC.length + vetorJ.length;

    while (contador < n) {
        // pegando noticias de um vetor pré cadastrado
        if (contador < 4) {
            var nImagem = vetorN[contador].img;
        }
        if (contador < 2) {
            var jImagem = vetorJ[contador].img;
        }
        if (contador == 0) {
            var cImagem = vetorC[contador].img;
        }

        if (contador < 4) {
            var nTitulo = vetorN[contador].titulo;
        }
        if (contador < 2) {
            var jTitulo = vetorJ[contador].titulo;
        }
        if (contador == 0) {
            var cTitulo = vetorC[contador].titulo;
        }

        if (contador < 4) {
            var nTexto = vetorN[contador].texto;
        }
        if (contador < 2) {
            var jTexto = vetorJ[contador].texto;
        }
        if (contador == 0) {
            var cTexto = vetorC[contador].texto;
        }

        if (contador < 1) {

            // mostrando as noticias na tela

            div_n1.innerHTML = `<div class="div_img_noticia" idnoticia="#n0" onclick="noticia(this)" style="background-image: url('img/noticias/${nImagem}')"></div>
            <span onclick="noticia(this)" idnoticia="#n0" class='cFeed1'>Informática</span><p idnoticia="#n0" onclick="noticia(this)">${nTitulo}</p>`;


            div_n2.innerHTML = `<div class="div_img_noticia2" idnoticia="#j0" onclick="noticia(this)" style="background-image: url('img/noticias/${jImagem}')"></div>
            <span onclick="noticia(this)" idnoticia="#j0" class='cFeed'>Jogos</span><p idnoticia="#j0" onclick="noticia(this)">${jTitulo}</p>`;

            div_n3.innerHTML = `<div class="div_img_noticia3" idnoticia="#c0" onclick="noticia(this)" style="background-image: url('img/noticias/${cImagem}')"></div>
            <span onclick="noticia(this)" idnoticia="#c0" class='cFeed'>Ciência</span><p idnoticia="#c0" onclick="noticia(this)">${cTitulo}</p>`;
        }
        else {
            if (contador < vetorN.length) {
                div_noticia.innerHTML += `<div class="noticia1_1" idnoticia="#n${contador}" onclick="noticia(this)">
            <div><img class="div_img1" src="img/noticias/${nImagem}" alt=""></div>
            <div class="noticia_page1">
            <p class="p_titulo">${nTitulo}</p>
            <p class="p_texto">${nTexto}</p>
            <div class="seta"><img src='img/icones/next.png' height="50px"></div></div>`;

            }


            if (contador < vetorJ.length) {
                div_noticia.innerHTML += `<div class="noticia1_1"  idnoticia="#j${contador}" onclick="noticia(this)">
            <div><img class="div_img1" src="img/noticias/${jImagem}" alt=""></div>
            <div class="noticia_page1">
            <p class="p_titulo">${jTitulo}</p>
            <p class="p_texto">${jTexto}</p>
            <div class="seta"><img src='img/icones/next.png' height="50px"></div></div>`;
            }


            if (contador < vetorC.length) {
                div_noticia.innerHTML += `<div class="noticia1_1" idnoticia="#c${contador}" onclick="noticia(this)">
            <div><img class="div_img1" src="img/noticias/${cImagem}" alt=""></div>
            <div class="noticia_page1">
            <p class="p_titulo">${cTitulo}</p>
            <p class="p_texto">${cTexto}</p>
            <div class="seta"><img src='img/icones/next.png' height="50px"></div></div>`;

            }
        }

        contador++;
    }
}


// função para assim que receber a resposta do servidor
function carregarVetor() {

    div_n1.innerHTML = '';
    div_n2.innerHTML = '';
    div_n3.innerHTML = '';
    div_noticia.innerHTML = '';

    noticias_bl.style.display = 'block';
    feed.style.display = 'none';

    var contador = 0;
    // verificando em qual página está para trazer a noticia
    while (contador < json.length) {

        // pegando a posição do vetor onde inicia em 0 e trazendo a noticia de acordo para setar na tela 
        var cImagem = json[contador].imagem;
        var cTitulo = json[contador].titulo;
        var cTexto = json[contador].materia;
        var cFonte = json[contador].fonte;
        var nPage = json[contador].pagina;

        // se for até 3 noticias, setar nas 3 primeiras principais

        if (contador < 3) {

            if (contador == 0) {
                div_n1.innerHTML = `<div class="div_img_noticia" idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" style="background-image: url('${cImagem}')"></div>
            <p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)">${cTitulo}</p><p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" class='fonte'>${cFonte}</p>`;
            }

            if (contador == 1) {
                div_n2.innerHTML = `<div class="div_img_noticia2" idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" style="background-image: url('${cImagem}')"></div>
            <p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)">${cTitulo}</p><p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" class='fonte'>${cFonte}</p>`;
            }

            if (contador == 2) {
                div_n3.innerHTML = `<div class="div_img_noticia3" idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" style="background-image: url('${cImagem}')"></div>
                <p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)">${cTitulo}</p><p idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)" class='fonte'>${cFonte}</p>`;
            }

        } else {

            // setando informações de noticias na tela
            div_noticia.innerHTML += `<div class="noticia1_1" destaque="a" idnoticia="${nPage}" onclick="carregaMateriaInformatica(this)">
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

// se clicar em alguma noticia do destaque
function noticia(e) {

    // ao clicar numa noticia, pegar o atributo da div com o vetor e guardar
    var idnoticia = e.getAttribute('idnoticia');

    window.location.href = `html/noticias/noticia.html${idnoticia}`;
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
        alert('outra coisa');
        div_n1.innerHTML = '';
        div_n2.innerHTML = '';
        div_n3.innerHTML = '';
        div_noticia.innerHTML = '';

        // carregarVetor(data.jogos);
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

// window.onload = () => {
//     startUp();
//     carregaInformatica();
// }

startUp();



