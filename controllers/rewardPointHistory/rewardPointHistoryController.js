const { Api } = require("../../config/api/api")

class RewardPointHistory {
    constructor(){}
    //list all reward point rule
    async listAllRewardPointHistories (req,res) {
        try {
            let { relatedWalletUser, relatedTreatmentVoucher, exact } = req.query
            let query = {}
            console.log(req.query)
            relatedTreatmentVoucher ? query["relatedTreatmentVoucher"] = relatedTreatmentVoucher : ""
            relatedWalletUser ? query["relatedWalletUser"] = relatedWalletUser : ""
            exact ? query["date"] = exact : ""
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-point-reward-histories",{
                params: {
                    ...query
                }
            })
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "List of Reward Point History",
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

module.exports = RewardPointHistory