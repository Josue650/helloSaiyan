const mongoose = require('mongoose');
const Pusher = require('pusher');
const Message = require('../models/dbMessages')

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
const pusher = new Pusher({
  appId: "1534576",
  key: "42f2a5347709eede1b37",
  secret: process.env.PUSHER_SECRET,
  cluster: "us3",
  useTLS: true
});

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);

  const changeStream = Message.watch()

  changeStream.on('change', (change) => {
    console.log('A change occured', change)

    if(change.operationType === 'insert'){
       const messageDetails = change.fullDocument;
       pusher.trigger('messages', 'inserted',
          {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received
       })
    } else {
      console.log("Error triggered pusher")
    }
  })
});
