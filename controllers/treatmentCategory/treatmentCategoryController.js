const {Api} = require("../../config/api/api")
const CartModel = require("../../models/cart/cartModel")
const Users = require("../../models/user/userModel")
const FormData = require('form-data');
const fs = require("fs")

class TreatmentCategoriesController {
    async createTreatmentCategories(req,res){
        try{
            let formData = new FormData();
            // Append other fields from req.body
            for (const key in req.body) {
                    formData.append(key, req.body[key]);
            } 
            if(req.files){
                //loop file and append to formData and carrry file to other backend
                req.files.forEach(file=> {
                        formData.append('wallet-treatment-category', fs.createReadStream(file.path), { filename: file.originalname });
                    })
            }
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-treatment-category",formData,{
                    headers: {
                        ...formData.getHeaders() 
                    }
                })
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
    async listAllTreatmentCategory(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-treatment-categories")
            if(response.data){
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
    async getTreatmentCategoriesById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-treatment-category/"+req.params.id)
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
    async updateTreatmentCategoriesById(req,res){
        try{
            let formData = new FormData();
                   
            // Append other fields from req.body
            for (const key in req.body) {
                 formData.append(key, req.body[key]);
             } 
             if(req.files){
                 //loop file and append to formData and carrry file to other backend
                 req.files.forEach(file=> {
                     formData.append('wallet-treatment-category', fs.createReadStream(file.path), { filename: file.originalname });
                 })
             }
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-treatment-category/"+req.params.id,
             formData,
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
    async deleteTreatmentCategoryById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).delete("wallet-treatment-list/"+req.params.id)
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

module.exports = TreatmentCategoriesController