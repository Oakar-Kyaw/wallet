// "use strict"

const memberTier = require("../../controllers/memberTier/memberTierController")
const { verifyToken } = require("../../middlewares/verifyToken")

module.exports = (app) => {
    const MemberTierController = new memberTier()

    app.route("/api/v1/member-tier")
       .post(verifyToken, MemberTierController.createMemberTier)
}