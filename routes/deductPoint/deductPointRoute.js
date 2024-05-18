// "use strict"

const deductPoint = require("../../controllers/deductPointController/deductPointController")
const { verifyToken } = require("../../middlewares/verifyToken")

module.exports = (app) => {
    const deductPointController = new deductPoint()

    app.route("/api/v1/deduct/point")
       .post(verifyToken, deductPointController.deductPoint)
}