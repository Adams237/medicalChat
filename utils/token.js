const jwt = require('jsonwebtoken')

module.exports.createToken = (user)=>{
    return jwt.sign({
        id: user._id,
        name: user.username,
        admin: user.isAdmin
    },'adams',{
        expiresIn: '1d'
    })
}

module.exports.verifyToken = (req, res, next)=>{
    const token = req.cookies.chat
    if(token){
        const userToken = jwt.verify(token, 'adams')
        if(userToken){
            req.user = userToken
            next()
        }
        else{
            res.json({error: "vous n'êtes pas connecté"})
        }
    }
    else{
        res.json({error: "vous n'êtes pas connecté"})
    }
}