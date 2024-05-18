const upload = require("../../config/fileUpload/fileUpload")
const TreatmentListController = require("../../controllers/treatmentList/treatmentListController")
const { verifyClinicCode } = require("../../middlewares/verifyClinicCode")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const TreatmentList = new TreatmentListController()
    // get user and create user
    app.route("/api/v1/treatment-list")
       .post(verifyToken, upload.array("treatment-list",5), TreatmentList.createTreatmentList)

    app.route("/api/v1/treatment-lists")
        .get(verifyToken,TreatmentList.listAllTreatmentList)

    app.route("/api/v1/treatment-list/:id")
       .get(verifyToken, TreatmentList.getTreatmentListById)
       .put( verifyToken, upload.array("treatment-list",5), verifyToken, TreatmentList.updateTreatmentListById)
       .delete(verifyToken, TreatmentList.deleteTreatmentListById)
}