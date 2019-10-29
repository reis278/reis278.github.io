var request = require('request');
var cheerio = require('cheerio');

request('https://g1.globo.com/economia/tecnologia/', function(err, res, body){
    if(err) console.log('Erro' + err);

    var $ = cheerio.load(body);

    $('.bastian-page div').each(function(){
        var title = $(this).find('._b  a').text().trim();
        var feedpost = $(this).find('.feed-post-body-resumo').text().trim();

        console.log('Titulo: ' + title);
        console.log('Matéria: ' + feedpost);
    });
});