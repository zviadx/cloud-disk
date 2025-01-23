const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(400).json({message: "invalid token"})
        }
        // const decode = jwt_decode(token) ეს რაღაც ალტერნატივაა ტოკენის დეკოდირების
        const decoded = jwt.verify(token, config.get('secretKey'))
        console.log(decoded)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err.message)
    }
}
