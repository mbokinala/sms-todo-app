// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC294f5cf94767d8705ebd5a2adae578b3';
const authToken = '3c939f39c7a9a229eca03e5a9a0d9c14';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15109013247',
     to: '+19259847982'
   })
  .then(message => console.log(message.sid));
