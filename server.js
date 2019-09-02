const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const {mongoose} = require('./mongoose');
const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.json());

ongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  addTodo(req.body.body);

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

function addTodo(text) {
  var todo = new Todo({
		text: req.body.text,
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