// create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const comments = [];

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('服务器错误');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.end(data);
            }
        });
    } else if (pathname === '/comments') {
        const method = req.method;
        if (method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(JSON.stringify(comments));
        } else if (method === 'POST') {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                const comment = qs.parse(data);
                comment.dateTime = new Date();
                comments.push(comment);
                res.writeHead(201, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('发表成功');
            });
        }
    } else {
        fs.readFile(path.join(__dirname, pathname), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('文件未找到');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end(data);
            }
        });
    }
});

server.listen(3000, ' localhost', () => {
    console.log(' http://localhost:3000 访问');
} );