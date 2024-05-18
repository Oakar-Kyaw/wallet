// "use strict"

const qrCodeController = require("../../controllers/qrCode/qrCodeController")
const { verifyToken } = require("../../middlewares/verifyToken")

module.exports = (app) => {
    const QrCodeController = new qrCodeController()

    app.route("/api/v1/qr-code")
       .post(verifyToken, QrCodeController.createQrCode)
}