const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/messages')

// add routes
// Index /api/messages
router.get('/', dataController.index, apiController.index)
// Delete /api/messages/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/messages/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/messages
router.post('/', dataController.create, apiController.show)
// Show /api/messages/:id
router.get('/:id', dataController.show, apiController.show)


module.exports = router
