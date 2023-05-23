const Conversationmodel = require('../models/Conversation')

module.exports.newConversation = async (req, res, next) => {
    const { senderId, receivedId } = req.body
    try {
        const conversation = await Conversationmodel.create({ members: [senderId, receivedId] })
        res.json({ conversation, status: true })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversationmodel.find({
            members: { $in: [req.params.userId] }
        })
        res.json({ conversation, status: true })
    } catch (error) {
        console.log(error);
        res.json({ error: error, status: false })
    }
}

module.exports.getAllConversations = async (req, res, next) => {
    const { firsUserId, secondUserId } = req.params
    try {
        const conversation = await Conversationmodel.findOne({
            members: { $all: [firsUserId, secondUserId] }
        })
        res.json({ conversation, status:true })
    } catch (error) {
        res.json({error, status:false})
    }
}