const MessageModel = require('../models/Messages');

module.exports.addMessage = async(req, res, next) => {
    const { conversationId,sender, text } = req.body;
    try {
        const message = await MessageModel.create({ conversationId, sender, text });
        res.json({message, status:true})
    } catch (error) {
        console.log(error);
        res.json({ error: error, status: false });
    }
}

module.exports.getMessages = async(req, res, next) => {
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })
        res.json({messages, status: true})
    } catch (error) {
        console.log(error);
        res.json({ error: error, status: false });
    }
}