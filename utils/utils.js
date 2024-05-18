    const jwt = require("jsonwebtoken")
    const bcrypt = require("bcrypt")
    const nodeCache = require("node-cache")
    require("dotenv").config()

    const NodeCache = new nodeCache({stdTTL: 20})
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
            let token = jwt.sign({userId:user._id,email:user.email,phone:user.phone, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin, clinicBaseURL: (user.relatedClinic.clinicBaseURL || null), clinicToken: ( user.relatedClinic.clinicToken || null ) },process.env.SECRET_KEY)
            return token;
        }
        //generate clinic token
        generateClinicToken(clinic){
            let token = jwt.sign({clinicId:clinic._id,name:clinic.clinicName,code:clinic.clinicCode},process.env.SECRET_KEY)
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
        //cache user
        setCacheUserDetail(user){
            console.log(user)
            NodeCache.set("user",user)
            console.log("set")
        }
        getCacheUserDetail(){
            return NodeCache.get("user");
        }
    }

    module.exports = Utils