const Message = require('../../models/dbMessages')

module.exports = {
  create,
  indexSent,
  indexReceived,
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
  try {
      const message = await Message.create(req.body)
      console.log(message)
      res.locals.data.message = message
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

async function indexReceived(req,res, next){
  try {
      const messages = await Message.find({ received: true })
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
// const dataController = {
//   // Index,
//   index (req, res, next) {
//     Message.find({}, (err, foundMessages) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.messages = foundMessages
//         next()
//       }
//     })
//   },
//   // Destroy
//   destroy (req, res, next) {
//     Message.findByIdAndDelete(req.params.id, (err, deletedMessage) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.message = deletedMessage
//         next()
//       }
//     })
//   },
//   // Update
//   update (req, res, next) {
//     req.body.received = req.body.received === true
//     Message.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMessage) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.message = updatedMessage
//         next()
//       }
//     })
//   },
// //   // Create
//   create (req, res, next) {
//     Message.create(req.body, (err, createdMessage) => {
//       if (err) {
//         res.status(400).send({
//           msg: err.message
//         })
//       } else {
//         res.locals.data.message = createdMessage
//         next()
//       }
//     })
//   },
//   // Edit
//   // Show
//   show (req, res, next) {
//     Message.findById(req.params.id, (err, foundMessage) => {
//       if (err) {
//         res.status(404).send({
//           msg: err.message,
//           output: 'Could not find message with that ID'
//         })
//       } else {
//         res.locals.data.message = foundMessage
//         next()
//       }
//     })
//   }
// }

// const apiController = {
//     index (req, res, next) {
//       res.json(res.locals.data.messages)
//     },
//     show (req, res, next) {
//       res.json(res.locals.data.message)
//     }
//   }

// module.exports = { dataController, apiController }
