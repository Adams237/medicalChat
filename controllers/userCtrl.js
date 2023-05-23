const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');


module.exports.updateUser = async (req, res, next) => {
    const { userId } = req.body
    const id = req.params.id
    const isAdmin = req.body.isAdmin
    if (userId === id || isAdmin) {
        if (req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } catch (error) {
                return res.json({ error, status: false })
            }
            try {
                const user = UserModel.findByIdAndUpdate(id, {
                    $set: req.body
                })
                res.json({ user, status: true })
            } catch (error) {
                res.json({ error, status: false })
            }
        }
    }
}

module.exports.deleteUser = async (req, res, next) => {
    const { userId, isAdmin } = req.body
    const id = req.params.id
    if (userId === id || isAdmin) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.json({ message: "utilisateur supprimer", status: true })
        } catch (error) {
            res.json({ error, status: false })
        }
    } else {
        res.json({ error: "vous n'êtes pas autoriser ce compte", status: false })
    }
}

module.exports.getUser = async (req, res, next) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId ? await UserModel.findById(userId) : UserModel.findOne({ username: username })
        res.json({ user, status: true })
    } catch (error) {
        console.log(error);
        res.json({ error, status: false })
    }
}

module.exports.getAllusers = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.json({ users, status: true })
    } catch (error) {
        console.log(error);
        res.json({ error, status: false })
    }
}

module.exports.addContact = async (req, res, next) => {
    const userId = req.body.userId
    const id = req.params.id
    console.log(id);
    console.log(userId);
    if (userId !== id) {
        try {
            const user = await UserModel.findById(id)
            const currentUser = await UserModel.findById(userId)
            if (!currentUser.contacts.includes(id)) {
                const userUpdate = await currentUser.updateOne({ $push: { contacts: id } })
                res.json({ message: "contact ajouter", status: true })
            }
            else {
                res.json({ error: "ce contatct existe déjà", status: false })
            }
        } catch (error) {
            // console.log(error);
            res.json({ error:"unse erreur est survenue veillez reesayer ultérieument", status: false })
        }
    }
}

module.exports.deleteContact = async (req, res, next) => {
    const userId = req.body.userId;
    const id = req.params.id
    if (userId !== id) {
        try {
            const currentUser = await UserModel.findById(userId)
            if (currentUser.contacts.includes(id)) {
                currentUser.updateOne({ $pull: { contacts: id } })
                res.json({ message: "contact supprimer", status: true })
            }
            else {
                res.json({ error: "cette personne ne fait pas partie de vos contacts", status: false })
            }
        } catch (error) {
            res.json({ error, status: false })
        }
    } else {
        res.json({ error: "vous ne pouvez pas supprimer votre contact", status: false })
    }
}

module.exports.getContacts = async (req, res, next) => {
    const userId = req.params.id
    console.log(userId);
    try {
        const user = await UserModel.findById(userId)
        const contacts = await Promise.all(
            user.contacts.map(contactId => {
                return UserModel.findById(contactId)
            })
        )
        let contactList = []
        contacts.map((contact) => {
            const { _id, username, profilePicture } = contact
            contactList.push({ _id, username, profilePicture })
        })
        res.json({ contactList, status: true })
    } catch (error) {
        console.log(error);
        res.json({ error, status: false })
    }
}