const User = require("../../models/user/userModel")
const fs = require("fs")
const treatment = require("../../treatments.json")

class UserController {
    constructor(){}
    //get user
    async getUser(req,res){
        try {
                let queryUser = await User.find({})
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
    //create user
    async createUser(req,res){
        try {
            let createUser = await User.create(req.body)
            res.status(200).send({
                success: true,
                message: "User created Successfully",
                data: createUser
            })
        } catch (error) {
          res.status(500).send({
             error: true,
             message:error.message
             })
        }
    }
    // findById
    async findUserById(req,res){
        try{
            let findUser = await User.findById(req.params.id).select("-password")
            res.status(200).send({
                success: true,
                message: "User found Successfully",
                data: findUser
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
            let updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true})
            res.status(200).send({
                success: true,
                message: "User updated Successfully",
                data: updateUser
            })
        }catch(error){
            res.status(500).send({
                error:true,
                message:error.message
            })
        }
    }
    //findIdAndDelete
    async deleteUserById(req,res){
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
    async findUserBySpecificQuery(findQuery){
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
}



module.exports = UserController
