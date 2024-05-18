// "use strict"

const ClinicController = require("../../controllers/clinic/clinicController")

module.exports = (app) => {
    const clinicController = new ClinicController()

    app.route("/api/v1/clinics")
       .post(clinicController.createClinic)
       .get(clinicController.listAllClinic)

    app.route("/api/v1/clinic/:id")
       .get(clinicController.queryClinicById)
       .put(clinicController.updateClinicById)
       .delete(clinicController.deleteClinicById)

    
}