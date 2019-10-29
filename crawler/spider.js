var request = require('request');
var cheerio = require('cheerio');

request('https://www.techtudo.com.br/', function(err, res, body){
    if(err) console.log('Erro' + err);

    var $ = cheerio.load(body);

    $('.bastian-page div').each(function(){
        var title = $(this).find('.bastian-feed-item  a').text().trim();
        var feedpost = $(this).find('.feed-post-body-resumo ._s').text().trim();

        console.log('Titulo: ' + title);
        console.log('Matéria: ' + feedpost);
    });
});