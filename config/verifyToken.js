//import package jsonwebtoken
const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    //jika tidak ada request header Authorization
    //beri response 400 acces denied
    if (!token) return res.status(400).json({
        status: res.statusCode,
        message: 'Access denied'
    })

    try {
        //verify token dengan SECRET_KEY
        const verified = jwt.verify(token, process.env.SECRET_KEY) // verify
        res.user = verified
        next() // melanjutkan proses berikutnya yaitu async pada router
    } catch (error) {
        //jika token invalid
        //beri response 400 invalid token
        res.status(400).json({
            status: res.statusCode,
            message: 'Invalid token'
        })
    }
}

module.exports = verifyToken