const Message = require('../../models/dbMessages')

module.exports = {
  create,
  indexSent,
  show,
  update,
  destroy,
  jsonMessage,
  jsonMessages
}

function jsonMessage(req, res){
  res.json(res.locals.data.message)
}

function jsonMessages (req, res){
  res.json(res.locals.data.messages)
}

// create
async function create(req, res, next) {
  // req.body.user = req.user._id
  try {
      const message = await Message.create(req.body)
      console.log(message)
      res.locals.data.message = message
      // res.locals.pusher.trigger("inserted",message)
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}
// read
async function indexSent(req,res, next){
  try {
      const messages = await Message.find({ received: false })
      res.locals.data.messages = messages
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

async function show(req,res, next){
  try {
      const message = await Message.findById(req.params.id)
      res.locals.data.message = message
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}
// update

async function update(req,res, next){
  try {
      const message = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.locals.data.message = message
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

// destroy

async function destroy(req,res, next){
  try {
      const message = await Message.findByIdAndDelete(req.params.id)
      res.locals.data.message = message
      next()
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}
