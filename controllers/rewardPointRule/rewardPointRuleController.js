const { Api } = require("../../config/api/api")

class RewardPointRule {
    constructor(){}
    //create reward point rule
    async createRewardPointRule (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-point-reward",req.body)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Created Successfully"
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
    //list all reward point rule
    async listAllRewardPointRule (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-point-rewards")
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "List of Reward Point",
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
                error: true,
                message: error.message
            })
        }
    }
    //find reward point rule by id
    async findRewardPointRuleById (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).get("wallet-point-reward/"+req.params.id)
            if(response.data.success){
                res.status(200).send({
                    success: true,
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
                error: true,
                message: error.message
            })
        }
    }
    //update reward point rule
    async updateRewardPointRule (req,res) {
        try {
            console.log("bod",req.body,req.params)
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).put("wallet-point-reward/"+req.params.id, req.body)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Updated Successfully"
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
    //delete reward point rule
    async deleteRewardPointRule (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).delete("wallet-point-reward/"+req.params.id)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Deleted Successfully"
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
    //add reward point
    async addRewardPoint (req,res) {
        try {
            let response = await Api(req["user"].clinicBaseURL, req["user"].clinicToken).post("wallet-point-reward/add/point",req.body)
            if(response.data.success){
                res.status(200).send({
                    success: true,
                    message: "Added Point Successfully",
                    add_point: response.data.add_point
                })
            }else {
                res.status(200).send({
                    success: false,
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
}

module.exports = RewardPointRule