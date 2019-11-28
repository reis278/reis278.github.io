var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// liberar a passagem dos dados 
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// pegar as noticias de um site externo que existe

var request = require('request');
var cheerio = require('cheerio');

var info = [];
var jogos = [];
var ciencia = [];

refresh_info();

function refresh_info() {

    info = [];

    request('https://g1.globo.com/economia/tecnologia/', function (err, res, body) {
        if (err) console.log('Erro' + err);

        var $ = cheerio.load(body);

        $('.feed-root .feed-post-body').each(function () {
            var img = $(this).find('.bstn-fd-picture-image').attr('src');
            var title = $(this).find('.feed-post-body-title').text().trim();
            var feedpost = $(this).find('.feed-post-body-resumo').text().trim();
            var nPage = $(this).find('.feed-post-figure-link').attr('href');
            var font = 'G1 Globo Tecnologia';

            info.push({ "imagem": img, "titulo": title, "materia": feedpost, "fonte": font, "pagina": nPage });
        });

        console.log('Rodando... /info');
    });
}

setInterval(() => {
    refresh_info();
}, 60000 * 60);

app.post('/minfo', function (request, response) {
    console.log(request.link);
});


refresh_jogos();

function refresh_jogos() {

    jogos = [];

    request('https://br.ign.com/', function (err, res, body) {
        if (err) console.log('Erro' + err);

        var $ = cheerio.load(body);

        $('.tbl .article').each(function () {
            var img = $(this).find('.score-wrapper img').attr('src');
            var title = $(this).find('.m h3').text().trim();
            var feedpost = $(this).find('.m p').text().trim();
            var nPage = $(this).find('.score-wrapper').attr('href');
            var font = 'IGN Brasil';

            jogos.push({ "imagem": img, "titulo": title, "materia": feedpost, "fonte": font, "pagina": nPage });
        });

        console.log('Rodando... /jogos');
    });
}

setInterval(() => {
    refresh_jogos();
}, 60000 * 60);


refresh_ciencia();

function refresh_ciencia() {

    jogos = [];

    request('https://www.tecmundo.com.br/ciencia', function (err, res, body) {
        if (err) console.log('Erro' + err);

        var $ = cheerio.load(body);

        $('.tec--list .tec--list__item').each(function () {
            var img = $(this).find('.tec--card__thumb__image').attr('data-src');
            var title = $(this).find('.tec--card__title__link').text().trim();
            var feedpost = /* $(this).find('.m p').text().trim(); */ '.';
            var nPage = $(this).find('.tec--card__title__link').attr('href');
            var font = 'TECMUNDO';

            ciencia.push({ "imagem": img, "titulo": title, "materia": feedpost, "fonte": font, "pagina": nPage });
        });

        console.log('Rodando... /ciencia');
    });
}

setInterval(() => {
    refresh_ciencia();
}, 60000 * 60);



// enviar a resposta do servidor
app.get('/info', function (req, res) {

    res.json(info);
})
app.get('/jogos', function (req, res) {

    res.json(jogos);
})
app.get('/ciencia', function (req, res) {

    res.json(ciencia);
})

// exibir qual porta está localizado
app.listen(3000, function () {
    console.log('porta 3000')
})