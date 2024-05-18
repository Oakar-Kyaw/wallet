const {Api} = require("../../config/api/api")
const Users = require("../../models/user/userModel")
const FormData = require('form-data');
const fs = require("fs")

class TreatmentController {
    
    async createTreatment(req,res){
        try{
                let formData = new FormData(); 
                // Append other fields from req.body
                for (const key in req.body) {
                    formData.append(key, req.body[key]);
                } 
                if(req.files){
                        //loop file and append to formData and carrry file to other backend
                    req.files.forEach(file=> {
                        formData.append('wallet-treatment', fs.createReadStream(file.path), { filename: file.originalname });
                    })
                    }
                 let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-treatment", formData,
                 {
                    headers: {
                        ...formData.getHeaders() 
                    }
                }
                 )
                 if(response.data.success){
                     res.status(200).send({
                        success: true,
                        message: response.data.message
                     })
                 }
        }catch(error){
            res.status(500).send({
                error: true,
                message: error.message
            })
        }
    }
    async listAllTreatment(req,res){
        try{
            let { id, buyableWithPoint } = req.query
            let param = {}
            id ? param["relatedWalletTreatmentList"] = id : ""
            buyableWithPoint ? param["buyableWithPoint"] = buyableWithPoint : ""

            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-treatments",
            {
                params: {
                    ...param
                }
            })
            if(response.data){
                res.status(200).send({
                    success: true,
                    data: response.data.data
                })
            }else {
                res.status(500).send({
                    error: true,
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
    async getTreatmentById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-treatment/"+req.params.id)
            if(response){
                res.status(200).send({
                    success: true,
                    data: response.data.data
                })
            }
            
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }
    async updateTreatmentById(req,res){
        try{
            let formData = new FormData();
            // Append other fields from req.body
            for (const key in req.body) {
                 formData.append(key, req.body[key]);
             } 
             if(req.files){
                 //loop file and append to formData and carrry file to other backend
                 req.files.forEach(file=> {
                     formData.append('wallet-treatment', fs.createReadStream(file.path), { filename: file.originalname });
                 })
             }
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-treatment/"+req.params.id, formData,
            {
                headers: {
                    ...formData.getHeaders() 
                }
            }
            )
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Updated Successfully",
                    // data: updateCartById
                })
            }
            else {
                res.status(500).send({
                    error: true,
                    message: "Something Went Wrong",
                    // data: updateCartById
                })
            }
            
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }
    async deleteTreatmentById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).delete("wallet-treatment/"+req.params.id)
            if(response){
              res.status(200).send({
              success: true,
              message: "Removed Items Successfully"
            })  
            }
            
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }

}

module.exports = TreatmentController