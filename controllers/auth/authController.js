const jwt = require("jsonwebtoken")
const Utils = require("../../utils/utils")
const Clinics = require("../../models/clinic/clinicModel")
const { Api } = require("../../config/api/api")
const Users = require("../../models/user/userModel")

class AuthController {
    constructor(){}
    async login(req,res){
       let {phone,email,password} = req.body
       let query = phone ? { phone: phone } : { email: email }
       const utils = new Utils()
       try{
        console.log("login",query)
         let findUser = await Users.findOne(query).populate("relatedProfile").populate("relatedClinic")
         console.log(findUser)
         if(!findUser){ 
            res.status(200).send({
                error: true,
                message: "No User Found"
            })
         }
         else if(findUser.isBanned){
           res.status(200).send({
            error: true,
            message: "Your account has suspended "+( findUser.bannedReason || "")
          })
         }
         else {
           let unlockTime
           let thisTime = new Date()
           let lockTime = findUser.lockDate
           lockTime ? unlockTime = new Date(lockTime.getFullYear(),lockTime.getMonth(),lockTime.getDate() ,lockTime.getHours(),lockTime.getMinutes() ,lockTime.getSeconds() + 10)
                    : ''
           let isCorrectPassword = await utils.comparePassword(password, findUser.password)
           if(isCorrectPassword ){
             if(findUser.loginAttempt <= 5  ) {
              //to get token
              const token = utils.generateToken(findUser)
              //update token
               await Users.findByIdAndUpdate(findUser._id,{ isLogin: true,token: token, loginAttempt: 0, lastLogin:thisTime, $unset:{lockDate: "", unlockDate: ""}})  
               let user = await Users.findOne(query).populate("relatedProfile").populate("relatedClinic").select("-password")
               res.status(200).send({
                 success: true,
                 message:"Successfully Login",
                 token: token,
                //  user: {
                //   id: findUser._id,
                //   name: findUser.firstName + (findUser.middleName || " ") + findUser.lastName,
                //   email: findUser.email,
                //   phone: findUser.phone,
                //   isAdmin: findUser.isAdmin,
                //   isSuperAdmin: findUser.isSuperAdmin,
                //   photo: findUser.relatedProfile,
                //   relatedClinic: findUser.relatedClinic
                //  }
                   user: user
               })
             }
             else if(findUser.loginAttempt > 5 && thisTime > findUser.unlockDate  ){
               //to get token
               const token = utils.generateToken(findUser)
               //update token
               await Users.findByIdAndUpdate(findUser._id,{ isLogin: true,token: token,lastLogin:thisTime, loginAttempt: 0, $unset:{lockDate: "", unlockDate: ""}})
               let user = await Users.findOne(query).populate("relatedProfile").populate("relatedClinic").select("-password")  
              res.status(200).send({
                success: true,
                message:"Successfully Login",
                token: token,
                //  user: {
                //   id: findUser._id,
                //   name: findUser.firstName + (findUser.middleName || " ") + findUser.lastName,
                //   userName: findUser.userName,
                //   email: findUser.email,
                //   phone: findUser.phone,
                //   isAdmin: findUser.isAdmin,
                //   isLogin: findUser.isLogin,
                //   isSuperAdmin: findUser.isSuperAdmin,
                //   photo: findUser.relatedProfile,
                //   isBanned: findUser.isBanned,
                //   bannedReason: findUser.bannedReason,
                //   total_point: findUser.total_point,
                //   security_question: findUser.security_question,
                //   security_answer: findUser.security_answer,
                //   isVerified: findUser.isVerified,
                //   lastLogin: findUser.lastLogin,
                //   loginAttempt: findUser.loginAttempt,
                //   lockDate: findUser.lockDate,
                //   unlockDate: findUser.unlockDate,
                //   friends: findUser.friends,
                //   isLoyalMember: findUser.isLoyalMember
                //  }
                user: user
              })
             }
             else {
              res.status(200).send({
                error: true,
                message:"You exceeded today login attempt"
               })
             }
           }
           else if(!isCorrectPassword  ) {
             //if attempt is less than 5
             if( (findUser.loginAttempt > 5 && thisTime > findUser.unlockDate) || findUser.loginAttempt <= 5 ){
               await Users.findByIdAndUpdate(findUser._id,{$inc:{
                loginAttempt: 1
              }})
             res.status(200).send({
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
             res.status(200).send({
                error: true,
                message: "Your account is locked for 30 minutes"
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
  
    async walletUserLogin(req,res){
      try{
        let clinic = await Clinics.findById(req.body.clinicId)
        req.body["clinicBaseURL"] = clinic.clinicBaseURL
        req.body["clinicToken"] = clinic.clinicToken
        let response = await Api(clinic.clinicBaseURL,clinic.clinicToken).post("auth/wallet-login", req.body)
        if(response.data){
          res.status(200).send({
              success: true,
              token: response.data.token,
              user: response.data.user
          })
      }else {
          res.status(404).send({
              success: false,
              message: "Something Went Wrong"
          })
      }
      }catch(error){
        res.status(500).send({
           error: true,
           message: error.message
        })
      }
   }
  
  async logout(req,res) {
     try {
       let {id} = req.body
       console.log(id)
       let updateUser = await Users.findByIdAndUpdate(id, {isLogin: false, $unset: {token: ""}})
       res.status(200).send({
        success: true,
        message: "Successfully Log Out"
       })
     } catch (error) {
       res.status(500).send({
         error: true,
         message: error.message
       })
     }
  }
}

module.exports = AuthController