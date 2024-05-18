const RewardPointRule = require("../../controllers/rewardPointRule/rewardPointRuleController")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const RewardPointRules = new RewardPointRule()
    // get user and create user
    app.route("/api/v1/reward-point")
       .post(verifyToken, RewardPointRules.createRewardPointRule)

    app.route("/api/v1/reward-points")
        .get(verifyToken, RewardPointRules.listAllRewardPointRule)

    app.route("/api/v1/reward-point/:id")
       .get(verifyToken, RewardPointRules.findRewardPointRuleById)
       .put(verifyToken, RewardPointRules.updateRewardPointRule)
       .delete(verifyToken, RewardPointRules.deleteRewardPointRule)
    
    app.route("/api/v1/reward-point/add/point")
        .post( verifyToken, RewardPointRules.addRewardPoint)
}