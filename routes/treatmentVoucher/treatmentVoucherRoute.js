const TreatmentVoucherController = require("../../controllers/treatmentVoucher/treatmentVoucherController")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const TreatmentVoucher = new TreatmentVoucherController()
    // get user and create voucher
    app.route("/api/v1/voucher")
       .post(verifyToken, TreatmentVoucher.createTreatmentVoucher)
       .get(verifyToken, TreatmentVoucher.listAllTreatmentVoucher)

    // app.route("/api/v1/reward-points")
    //     .get(verifyToken, RewardPointRules.listAllRewardPointRule)

    // app.route("/api/v1/reward-point/:id")
    //    .get(verifyToken, RewardPointRules.findRewardPointRuleById)
    //    .put(verifyToken, RewardPointRules.updateRewardPointRule)
    //    .delete(verifyToken, RewardPointRules.deleteRewardPointRule)
    
    // app.route("/api/v1/reward-point/add/point")
    //     .post( verifyToken, RewardPointRules.addRewardPoint)
}