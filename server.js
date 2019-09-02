const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const mongoose = require('mongoose');


mongoose.connect("mongodb://api:tw1l1o@ds245240.mlab.com:45240/text-message-to-do", {useNewUrlParser: true});

const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.post('/sms', async (req, res) => {
  var command = req.body.Body.toString().toUpperCase().split(" ")[0];

  switch(command) {
    case 'CREATE':
      addTodo(req.body.Body).then((doc) => {
        sendMessage(doc.toString(), res);
      })
      break;
    default:
      sendMessage('not a valid command', res);
  }
});

function sendMessage(message, res) {
  const twiml = new MessagingResponse();
  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

async function addTodo(text) {
  var todo = new Todo({
		text,
    completed: false
  });

	return todo.save()
}

http.createServer(app).listen(process.env.PORT || 1337, () => {
  console.log('Express server listening on port 1337');
});