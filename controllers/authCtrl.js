const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/token')

module.exports.register = async (req, res) => {
    const { username, password, email, profilePicture } = req.body;

    
    try {
        const passwordEcrypt = await bcrypt.hash(password, 10)
        const user = await UserModel.create({ username, email, password: passwordEcrypt, profilePicture })
        res.json({ user, status: true })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: false, error: "email existe déjà" })
        }
        res.json({ error, status: false })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = createToken(user)
                res.cookie("medicalchat", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.json({ user, status: true })
            } else {
                res.json({ error: 'email ou mot de passe incorect' });
            }
        }
        else {
            res.json({ error: 'email ou mot de passe incorect' });
        }
    } catch (error) {
        console.log(error);
    }

}