const jwt = require("jsonwebtoken")
const Users = require("../../models/user/userModel")
const Utils = require("../../utils/utils")

class AuthController {
    constructor(){}
    async login(req,res){
       let {email,password} = req.body
       const utils = new Utils()
       try{
         let findUser = await Users.findOne({email:email})
         if(!findUser){
            res.status(404).send({
                success: true,
                message: "There is No User Found"
            })
         }
         else {
           let unlockTime
           let thisTime = new Date()
           let lockTime = findUser.lockDate
           lockTime ? unlockTime = new Date(lockTime.getFullYear(),lockTime.getMonth(),lockTime.getDate() + 1,lockTime.getHours(),lockTime.getMinutes(),lockTime.getSeconds())
                    : ''
           let isCorrectPassword = await utils.comparePassword(password, findUser.password)
           if(isCorrectPassword ){
             if(findUser.loginAttempt <= 5  ) {
              //to get token
              const token = utils.generateToken(findUser)
              //update token
               await Users.findByIdAndUpdate(findUser._id,{ isLogin: true,token: token, loginAttempt: 0, lastLogin:thisTime, $unset:{lockDate: "", unlockDate: ""}})  

               res.status(200).send({
                 success: true,
                 message:"Successfully Login",
                 token: token,
                 user: {
                  name: findUser.name,
                  email: findUser.email,
                  phone: findUser.phone,
                  isAdmin: findUser.isAdmin
                 }
               })
             }
             else if(findUser.loginAttempt > 5 && thisTime > findUser.unlockDate  ){
               //to get token
               const token = utils.generateToken(findUser)
               //update token
               await Users.findByIdAndUpdate(findUser._id,{ isLogin: true,token: token,lastLogin:thisTime, loginAttempt: 0, $unset:{lockDate: "", unlockDate: ""}})  
              res.status(200).send({
                success: true,
                message:"Successfully Login",
                token: token,
                 user: {
                  name: findUser.firstName + findUser.middleName + findUser.lastName,
                  userName: findUser.userName,
                  email: findUser.email,
                  phone: findUser.phone,
                  isAdmin: findUser.isAdmin,
                  isLogin: findUser.isLogin
                 }
              })
             }
             else {
              res.status(500).send({
                error: true,
                message:"You exceeded today login attempt"
               })
             }
           }
           else if(!isCorrectPassword  ) {
             //if attempt is less than 5
             if(findUser.loginAttempt <= 5){
               await Users.findByIdAndUpdate(findUser._id,{$inc:{
                loginAttempt: 1
              }})
             res.status(500).send({
                error: true,
                message: "Password was wrong"
              })
             }
             else if(findUser.loginAttempt > 5){
              console.log(unlockTime)
              await Users.findByIdAndUpdate(findUser._id,{
               lockDate: thisTime,
               unlockDate: unlockTime
             })
             res.status(500).send({
                error: true,
                message: "Your Account is locked one day"
             })
             }
             
           }
        }
       }catch(error){
         res.status(500).send({
            error: true,
            message: error.message
         })
       }
    }
}

module.exports = AuthController