const http = require('http')


// créer un server web
const server = http.createServer((req, res) => {
    console.log(req);
    //res.writeHead(200, {'Content-Type' : 'text/plan'});
    //res.end('Hello World\n');
    const {url, method} = req;
    if (url === '/'){
        res.setHeader('Content-Type', 'txt/html');
        res.write('<html>');
        res.write('<body> <form action = "/message"> <input type = "text" name ="message"> <button type ="submit">send</button> </form></body>');
        res.write('</html>');
        res.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = []
        req.on('dara', (chunk)=> {
            console.log(chunk)
            body.push(chunk)
        }).on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        }).on('error', (err)=> {
            console.log(err);
        });
    }
})

//Executer le code : node app.js

server.listen(3000);