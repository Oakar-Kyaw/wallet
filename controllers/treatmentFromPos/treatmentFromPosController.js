const {Api} = require("../../config/api/api")
const Users = require("../../models/user/userModel")
const FormData = require('form-data');
const fs = require("fs")

class TreatmentFromPosController {

    async listAllTreatmentListFromPos(req,res){
        try{
            let param = { type: "wallet" }
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("treatment-lists-from-pos",{
                params: {
                    ...param
                }
            })
            if(response.data){
                res.status(200).send({
                    success: true,
                    data: response.data.list
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

    async AssignToWallet (req, res) {
        try{
            let result = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("treatment-lists-from-pos/assign", req.body)
            if(result.data.success){
                res.status(200).send({
                    success: true,
                    message: result.data.message
                })
            }else {
                res.status(500).send({
                    error: true,
                    message: "Something went Wrong"
                })
            }
        }
        catch(error){
            res.status(500).send({
                error: true,
                message: error.message
            })
        }
    }

}

module.exports = TreatmentFromPosController