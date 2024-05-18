const { Api } = require("../../config/api/api")

class QrCode {
    constructor(){}
    //create reward point rule
    async createQrCode (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-qr-code",req.body)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Created Successfully",
                    data: response.data.data
                })
            }else {
                res.status(400).send({
                    error: false,
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

module.exports = QrCode