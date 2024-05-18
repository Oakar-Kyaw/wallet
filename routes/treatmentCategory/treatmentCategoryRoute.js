const upload = require("../../config/fileUpload/fileUpload")
const TreatmentCategoriesController = require("../../controllers/treatmentCategory/treatmentCategoryController")
const { verifyClinicCode } = require("../../middlewares/verifyClinicCode")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const TreatmentCategory = new TreatmentCategoriesController()
    // get user and create user
    app.route("/api/v1/treatment-category")
       .post(verifyToken, upload.array("treatment-category",5), TreatmentCategory.createTreatmentCategories)

    app.route("/api/v1/treatment-categories")
        .get(verifyToken, TreatmentCategory.listAllTreatmentCategory)

    app.route("/api/v1/treatment-category/:id")
       .get(verifyToken, TreatmentCategory.getTreatmentCategoriesById)
       .put(verifyToken, upload.array("treatment-category",5),verifyToken, TreatmentCategory.updateTreatmentCategoriesById)
       .delete(verifyToken, TreatmentCategory.deleteTreatmentCategoryById)
}