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


request('https://g1.globo.com/economia/tecnologia/', function (err, res, body) {
    if (err) console.log('Erro' + err);

    var $ = cheerio.load(body);

    $('.feed-root .feed-post-body').each(function () {
        var img = $(this).find('.bstn-fd-picture-image').attr('src');
        var title = $(this).find('.feed-post-body-title').text().trim();
        var feedpost = $(this).find('.feed-post-body-resumo').text().trim();
        var nPage = $(this).find('.feed-post-figure-link').attr('href');
        var font = 'G1 Globo Tecnologia';

        info.push({ "imagem": img, "titulo": title, "materia": feedpost, "fonte": font, "pagina": nPage});
    });

    console.log('Rodando...');
});

app.post('/minfo', function(request, response){
    console.log(request.link);
});

// request(/* site de jogos */, function (err, res, body) {
//     if (err) console.log('Erro' + err);

//     var $ = cheerio.load(body);

//     $('.feed-root .feed-post-body').each(function () {
//         var img = $(this).find('.bstn-fd-picture-image').attr('src');
//         var title = $(this).find('.feed-post-body-title').text().trim();
//         var feedpost = $(this).find('.feed-post-body-resumo').text().trim();

//         jogos.push({ "imagem": img, "titulo": title, "materia": feedpost });
//     });
//     console.log('Rodando...');
// });


// request(/* site de ciencia */, function (err, res, body) {
//     if (err) console.log('Erro' + err);

//     var $ = cheerio.load(body);

//     $('.feed-root .feed-post-body').each(function () {
//         var img = $(this).find('.bstn-fd-picture-image').attr('src');
//         var title = $(this).find('.feed-post-body-title').text().trim();
//         var feedpost = $(this).find('.feed-post-body-resumo').text().trim();

//         info.push({ "imagem": img, "titulo": title, "materia": feedpost });
//     });
//     console.log('Rodando...');
// });


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