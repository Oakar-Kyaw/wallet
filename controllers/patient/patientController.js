const { Api } = require("../../config/api/api")

class PatientController {
    constructor(){}
    //list all patient
    async listAllPatient (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-user/patients")
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "List All Patient",
                    data: response.data.list
                })
            }else {
                res.status(400).send({
                    success: false,
                    message: "Something went wrong"
                })
            }
        }catch(error){
            res.status(500).send({
                error: true,
                message: error.message
            })
        }
    }
    //find reward point rule by id
    async bindPatientAndWalletController (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-user/patient/"+req.params.id, req.body)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: response.data.message
                })
            }else {
                res.status(400).send({
                    success: false,
                    message: "Something went wrong"
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

module.exports = PatientController