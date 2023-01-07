const express = require('express')
const router = express.Router()
const msgCtrl = require('../../controllers/api/messages')

// add routes
// Index /api/messages
router.get('/', msgCtrl.indexSent, msgCtrl.jsonMessages)
// Index /api/messages/complete
router.get('/received', msgCtrl.indexReceived, msgCtrl.jsonMessages)
// Delete /api/messages/:id
router.delete('/:id', msgCtrl.destroy, msgCtrl.jsonMessage)
// Update /api/messages/:id
router.put('/:id', msgCtrl.update, msgCtrl.jsonMessage)
// Create /api/messages
router.post('/', msgCtrl.create, msgCtrl.jsonMessage)
// Show /api/messages/:id
router.get('/:id', msgCtrl.show, msgCtrl.jsonMessage)


module.exports = router
