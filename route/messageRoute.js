const router = require('express').Router()
const { addMessage, getMessages } = require('../controllers/messageCtrl')

// add new message
router.post('/', addMessage)

// get all messages
router.get('/:conversationId', getMessages)

module.exports = router