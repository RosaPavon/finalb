const jwt = require("jwt-simple")
const moment= require ("moment")

const SECRET_KEY ="$7b$16$9yJmXmyCpnZ/PT6AdjZtqCuE9ASgBgJ1qCmz0YkzYn/S7OmLQ0uc8K"

exports.createAccessToken = function(user){//crea enlaces token
    const payload={
        id: user._id,
        name:user.usuario,
        email:user.email,
        role: user.role,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    }
    return jwt.encode(payload, SECRET_KEY)

};

exports.createRefreshToken = function(user){
    const payload={
        id: user._id,
        exp: moment().add(30, "days").unix()
    }
    return jwt.encode(payload, SECRET_KEY)

};

exports.decodedToken = function(token){//descodifica los token
    return jwt.decode(token, SECRET_KEY, true)
}


