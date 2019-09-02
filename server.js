const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const mongoose = require('mongoose');


mongoose.connect("mongodb://api:tw1l1o@ds245240.mlab.com:45240/text-message-to-do", {useNewUrlParser: true});

const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  addTodo(req.body.body);

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

function addTodo(text) {
  var todo = new Todo({
		text,
    completed: false
  });

	todo.save().then((doc) => {
		res.status(201).send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
}

http.createServer(app).listen(process.env.PORT || 1337, () => {
  console.log('Express server listening on port 1337');
});