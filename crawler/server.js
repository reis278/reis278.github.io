const http = require('http')
const port = 3000
const ip = 'localhost'

const server = http.createServer((req, res) => {
    const responses = []
    responses['/'] = '<h1>Home</h1>'
    responses['/inscreva-se'] = '<h1>Inscreva-se</h1>'
    responses['/local'] = '<h1>Local</h1>'
    responses['/contato'] = '<h1>Contato</h1>'
    responses['/naoExiste'] = '<h1>URL sem resposta definida!</h1>'
  
    res.end(responses[req.url] || responses['/naoExiste'])
})

server.listen(port, ip, () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
})

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