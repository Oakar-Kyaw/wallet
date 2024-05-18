const User = require("../../models/user/userModel")
const fs = require("fs")
const treatment = require("../../treatments.json")
const path = require("path")
const Attachments = require("../../models/attachments/attachment")
const { Api } = require("../../config/api/api")
const FormData = require("form-data")
const Utils = require("../../utils/utils")
class UserController {
    constructor(){}
    //get user
    async getWalletUser(req,res){
        let { relatedClinic,exact } = req.query
        try {
                let query = {
                    isDeleted: false
                }
                let day = new Date(exact)
                let nextDay = new Date( day.getFullYear(), 
                    day.getMonth(), 
                    day.getDate()+1 , 
                    day.getHours(), 
                    day.getMinutes(),
                    day.getSeconds() 
                    )
                exact ?
                    query["createdAt"] = { $gte: new Date(day), $lt: new Date(nextDay) }
                    : ""
                relatedClinic ? 
                    query["relatedClinic"] = relatedClinic
                    : ""
                
                let queryUser = await User.find({}).populate("relatedClinic relatedProfile").sort({isSuperAdmin: -1, isAdmin: -1})
                res.status(200).send({
                    success: true,
                    data: queryUser
                })
            } catch (error) {
                res.status(500).send({
                    error: true,
                    message:error.message
                })
            }
    }
    //get clinic user
    async getUser(req,res){
            try {
                console.log("req user ",req["user"])
                let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-user")
                // let createUser = await User.create(req.body)
                if(response.data.success){
                    res.status(200).send({
                       success: true,
                       data: response.data.data,
                       message: response.data.message
                    })
                }
            } catch (error) {
              res.status(500).send({
                 error: true,
                 message:error.message
                 })
    }
   }
    //get clinic user by id
    async getSpecificWalletUser(req,res){
        try {
            console.log("req user ",req["user"])
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-user/"+ req.params.id)
            // let createUser = await User.create(req.body)
            if(response.data.success){
                res.status(200).send({
                   success: true,
                   data: response.data.data,
                   message: response.data.message
                })
            }
        } catch (error) {
          res.status(500).send({
             error: true,
             message:error.message
             })
}
}
    //create user
    async createUser(req,res){
        try {
            let response = await Api(res.locals.clinicBaseURL, res.locals.clinicToken).post("wallet-user",req.body)
            // let createUser = await User.create(req.body)
            if(response.data.success){
                res.status(200).send({
                   success: true,
                   message: response.data.message
                })
            }
        } catch (error) {
          res.status(500).send({
             error: true,
             message:error.message
             })
        }
    }

    // create user dashboard
    async createWalletUser(req,res){
        try {
            req.body["relatedClini"] = res.locals.relatedClinic
            let createUser = await User.create(req.body)
            if(response.data.success){
                res.status(200).send({
                   success: true,
                   message: "User Created Successfully"
                })
            }
        } catch (error) {
          res.status(500).send({
             error: true,
             message:error.message
             })
        }
    }

    // findById
    async findWalletUserById(req,res){
        try{
            let canEdit
            let findUser = await User.findById(req.params.id).select("-password").populate("relatedProfile")
            //check can edit feature in frontend
            if(req.user.id === req.params.id){
                canEdit = true
            } 
            else {
                canEdit = false
            }
            res.status(200).send({
                success: true,
                message: "User found Successfully",
                data: {
                    //can edit or not flag
                    ...findUser._doc,
                    canEdit: canEdit
                }
            })
        }catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }

    //findByIdAnd Update
    async updateUserDataById(req,res){
        try{
          if(req.user.userId === req.params.id || req.user.isAdmin){
            let formData = new FormData();
            // Append other fields from req.body
            for (const key in req.body) {
                formData.append(key, req.body[key]);
            } 
            if(req.files){
                req.files.forEach(file=> {
                    formData.append('wallet-user', fs.createReadStream(file.path), { filename: file.originalname });
                })
            }
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-user/" + req.params.id,formData,
            {
            headers: {
                ...formData.getHeaders() 
            }
           })
            if(response.data.success){
                res.status(200).send({
                   success: true,
                   message: response.data.message,
                   data: response.data.data
                })
            }
          }else {
            res.status(401).send({
                error: true,
                message: "You can't edit other user account"
            })
            
          }
            
        }catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }
    //findByIdAnd Update
    async updateWalletUserDataById(req,res){
        try{
          if(req.user.id === req.params.id || req.user.isAdmin){
            if(req.file){
                const nomalizePath = path.join(req.file.path)
                const pathes = nomalizePath.split("uploads")[1]
                let data = {
                    url: pathes,
                    relatedUser: req.params.id
                }
                const attachment = await Attachments.create(data)
                await User.findByIdAndUpdate(req.params.id,{$push:{
                    relatedProfile: attachment._id
                }})

            }
            let updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true})
            res.status(200).send({
                success: true,
                message: "User updated Successfully",
                data: updateUser
            })
          }else {
            res.status(401).send({
                error: true,
                message: "You can't edit other user account"
            })
            
          }
            
        }catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }
    //findIdAndDelete
    async deleteWalletUserById(req,res){
        try{
            let today = new Date()
            let updateUser = await User.findByIdAndUpdate(req.params.id,{isDeleted: true, expireAt: today },{new: true})
            res.status(200).send({
                success: true,
                message: "User deleted Successfully",
                data: updateUser
            })
        }catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }
    //findOne
    async findWalletUserBySpecificQuery(findQuery){
        try{
            let findUser = await User.findOne({}).select("-password")
            return findUser
        }catch(error){
            return {
                error: true,
                message: error.message
            }
        }
    }
    updateFolder(){
        let data = []
        let jsonData = {}
        fs.readFile("treatments.json","utf8",function(err,datas){
            let jsons = JSON.parse(datas)
            for(let i=0 ; i< jsons.length; i++){

               data.push({
                _id:jsons[i]._id,
                isDeleted: false,
                name: jsons[i].name,
                price: jsons[i].sellingPrice
            })
            }
            // console.log(data)
            fs.writeFile("treatment.json", JSON.stringify(data), err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        })
    }
     //banned reason
     async banUser(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-user/ban/" + req.params.id,req.body)
            res.status(200).send({
                success: true,
                message: response.data.message
            })
          }
        catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }

    //add point user
    async addPointUser(req,res) {
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-user/point/add/" + req.params.id,req.body)
            res.status(200).send({
                success: true,
                message: response.data.message
            })
          }
        catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }
}



module.exports = UserController
