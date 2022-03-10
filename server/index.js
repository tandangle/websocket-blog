const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ws = require('ws');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const server = http.createServer(app);
const wsServer = new ws.Server({ server, path: '/websocket' });
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

wsServer.on('connection', ws => {
  ws.on('message', message => {
      const parsedMessage = JSON.parse(message);
      wsServer.clients.forEach(client => {
        client.send(JSON.stringify(parsedMessage))
      })
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));