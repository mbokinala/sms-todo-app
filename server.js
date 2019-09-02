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
  console.log(command);
  switch(command) {
    case 'ADD':
      var chunks = req.body.Body.toString().split(" ");
      chunks.shift();

      addTodo(chunks.join(' ')).then((doc) => {
        console.log(doc.toString());
        sendMessage('Created item ' + doc.text, res);
      });
      return;
    case 'LIST':
      getTodos().then((todos) => {
        sendMessage(formatList(todos), res);
      }).catch((err) => {
        sendMessage('Error: ' + err.toString());
      });
      return;
    default:
      sendMessage('not a valid command', res);
      return;
  }
  return;
});

function formatList(list) {
  if(!list || list.length == 0) {
    return 'There are no items in your list';
  }

  var s = "Your list: \n";
  for(var i = 0; i < list.length; i++) {
    s = s + list[i].text + '\n';
  }

  return s;
}

function sendMessage(message, res) {
  const twiml = new MessagingResponse();
  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  console.log('header written');
  res.end(twiml.toString());
}

async function addTodo(text) {
  var todo = new Todo({
		text,
    completed: false
  });

	return todo.save()
}

function getTodos() {
  return Todo.find();
}

http.createServer(app).listen(process.env.PORT || 1337, () => {
  console.log('Express server listening on port 1337');
});