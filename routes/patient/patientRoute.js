const PatientControllers = require("../../controllers/patient/patientController")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const PatientController = new PatientControllers()
    // get user and create user
    app.route("/api/v1/patients")
       .get(verifyToken, PatientController.listAllPatient)

    app.route("/api/v1/patient/:id")
       .put(verifyToken, PatientController.bindPatientAndWalletController)
    
}