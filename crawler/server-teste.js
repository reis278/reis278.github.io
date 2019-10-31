var express = require('express');
var app = express();

// liberar a passagem dos dados 
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

// pegar as noticias de um site externo que existe

var request = require('request');
var cheerio = require('cheerio');
const bodyParser = require('body-parser');


var materias = "";
var data = [];

request('https://g1.globo.com/economia/tecnologia/', function(err, res, body){
    if(err) console.log('Erro' + err);
    
    var $ = cheerio.load(body);
    
    var contador = 0;
    
    $('.feed-root .feed-post-body').each(function(){
        var img = $(this).find('.bstn-fd-picture-image').attr('src');
        var title = $(this).find('.feed-post-body-title').text().trim();
        var feedpost = $(this).find('.feed-post-body-resumo').text().trim();
        
        data.push({"imagem": img, "titulo": title, "materia": feedpost});
        console.log(data[contador].titulo);
        
        materias += `<img src="${img}">`;
        materias += '<h2>Titulo: ' + title + '</h2>';
        materias += '<p>Matéria: ' + feedpost + '</p>';
        
        contador++;
    });
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// enviar a resposta do servidor
app.get('/api', function (req, res) {
    
    res.json(data);
})
// exibir qual porta está localizado
app.listen(3000, function () {
    console.log('porta 3000')
})