const { Schema, model } = require('mongoose')

const whatsappSchema = new Schema({
    message: String,
    name: String,
    received: Boolean
}, {
    timestamps: true
});

const Message = model("Message", whatsappSchema)

module.exports = Message
