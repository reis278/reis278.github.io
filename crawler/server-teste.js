var express = require('express');
var app = express();


app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

var request = require('request');
var cheerio = require('cheerio');

var materias = "";
var data = "";

request('https://g1.globo.com/economia/tecnologia/', function(err, res, body){
    if(err) console.log('Erro' + err);

    var $ = cheerio.load(body);

    $('.feed-root .feed-post-body').each(function(){
        var img = $(this).find('.bstn-fd-picture-image').attr('src');
        var title = $(this).find('.feed-post-body-title').text().trim();
        var feedpost = $(this).find('.feed-post-body-resumo').text().trim();

        console.log('titulo ' + title);
        console.log('MATERIA ' + feedpost);

        data = {"imagem": img, "titulo": title, "materia": feedpost}
        
        materias += `<img src="${img}">`;
        materias += '<h2>Titulo: ' + title + '</h2>';
        materias += '<p>Matéria: ' + feedpost + '</p>';
    });
});


app.get('/api', function (req, res) {

    res.send(data);
})

app.listen(3000, function () {
    console.log('porta 3000')
})