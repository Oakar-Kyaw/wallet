const upload = require("../../config/fileUpload/fileUpload")
const TreatmentController = require("../../controllers/treatment/treatmentController")
const { verifyClinicCode } = require("../../middlewares/verifyClinicCode")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const Treatment = new TreatmentController()
    // get user and create user
    app.route("/api/v1/treatment")
       .post(verifyToken, upload.array("treatment",5),Treatment.createTreatment)

    app.route("/api/v1/treatments")
        .get(verifyToken, Treatment.listAllTreatment)

    app.route("/api/v1/treatment/:id")
       .get(verifyToken, Treatment.getTreatmentById)
       .put(verifyToken, upload.array("treatment",5),verifyToken, Treatment.updateTreatmentById)
       .delete(verifyToken, Treatment.deleteTreatmentById)
}