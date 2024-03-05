const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
class Utils {
    constructor(){}
    //generate random code number
    generateRandomCode(length){
        let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let random_char = ""
        for(let i=0 ; i < length; i++) {
           random_char += char.charAt(Math.floor(Math.random() * char.length )).toUpperCase()
        }
        return random_char
    }
    //generate token
    generateToken(user){
        let token = jwt.sign({userId:user._id,email:user.email,phone:user.phone, isAdmin: user.isAdmin},process.env.SECRET_KEY)
        return token;
    }
    //decode token
    decodeToken(token){
        let decoded = jwt.decode(token)
        return decoded;
    }
    //compare password 
    async comparePassword(password,hash){
        return await bcrypt.compare(password, hash);
       
    }

}

module.exports = Utils