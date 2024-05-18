const Users = require("../models/user/userModel")

exports.verifyAdmin = async (req,res,next) => {
    try {
       let queryUser = await Users.findOne({email:req.body.email})
       if(queryUser){
         if(queryUser.isSuperAdmin || queryUser.isAdmin){
            next()
         }else {
            res.status(200).send({
                error: true,
                message: "Not Admin Account"
            })
         }
       }
       else {
          res.status(200).send({
            error: true,
            message: "No User Found"
          })
       }
    }catch(err){
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}