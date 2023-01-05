const { Schema, model } = require('mongoose')

const whatsappSchema = new Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

const Message = model("Message", whatsappSchema)

module.exports = Message
