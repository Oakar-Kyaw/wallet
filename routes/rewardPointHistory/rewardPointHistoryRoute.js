const RewardPointHistory = require("../../controllers/rewardPointHistory/rewardPointHistoryController")
const { verifyToken } = require("../../middlewares/verifyToken")

module.exports = (app) =>{
    const RewardPointHistories = new RewardPointHistory()
    
    app.route("/api/v1/reward-point-histories")
        .get(verifyToken, RewardPointHistories.listAllRewardPointHistories)

}