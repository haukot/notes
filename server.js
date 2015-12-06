import {createServer} from 'http';

var server = createServer((req, res) => {
    res.end('hello');
});

server.listen(8080);
console.log("Server is listening");
