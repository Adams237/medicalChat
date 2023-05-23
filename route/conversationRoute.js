const router = require('express').Router()
const { newConversation, getConversation, getAllConversations } = require('../controllers/conversationCtrl')
//new Conversation
    router.post('/new', newConversation)
//get Conversation of a user
router.get('/:userId', getConversation)
// get Conversation include two users
router.get("/find/:firsUserId/:secondUserId", getAllConversations)

module.exports = router