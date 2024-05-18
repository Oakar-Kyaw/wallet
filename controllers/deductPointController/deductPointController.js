const { Api } = require("../../config/api/api")

class deductPointController {
    constructor(){}
    async deductPoint(req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet/deduct/point",req.body)
            if(response.data.success){
                res.status(200).send({
                    success: response.data.success,
                    message: response.data.message,
                    data: response.data.data
                })
            }else {
                res.status(400).send({
                    success: false,
                    message: "Something went wrong"
                })
            }
        }catch(error){
            res.status(500).send({
                success: false,
                message: error.message
            })
        }
    }
   
}

module.exports = deductPointController