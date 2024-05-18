const upload = require("../../config/fileUpload/fileUpload")
const TreatmentFromPosController = require("../../controllers/treatmentFromPos/treatmentFromPosController")
const { verifyClinicCode } = require("../../middlewares/verifyClinicCode")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const TreatmentFromPos = new TreatmentFromPosController()
    // get treatment from pos

    app.route("/api/v1/treatment-lists-from-pos")
        .get(verifyToken, TreatmentFromPos.listAllTreatmentListFromPos)

    app.route("/api/v1/treatment-lists-from-pos/assign")
        .post(verifyToken, TreatmentFromPos.AssignToWallet)

}