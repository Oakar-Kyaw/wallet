const {Api} = require("../../config/api/api")
const Users = require("../../models/user/userModel")
const FormData = require('form-data');
const fs = require("fs")

class BookingController {
    
    async createBooking(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-booking", req.body)
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
    async listAllBooking(req,res){
        try{
            let {id, sort} = req.query
            let param = {}
            id ? param["id"] = id : ""
            sort ? param["sort"] = true : ""
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-bookings", {params: {
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
    async getBookingById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-booking/"+req.params.id)
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
    async updateBookingById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-booking/"+req.params.id, req.body)
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
    async deleteBookingById(req,res){
        try{
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).delete("wallet-booking/"+req.params.id)
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

module.exports = BookingController