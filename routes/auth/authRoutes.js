const AuthController = require("../../controllers/auth/authController")
const { verifyAdmin } = require("../../middlewares/verifyAdmin")
const { verifyToken } = require("../../middlewares/verifyToken")

module.exports = (app)=>{
    let Auth = new AuthController()
    //  app.route("/api/v1/auth/login")
    //     .post(Auth.login)

    app.route("/api/v1/auth/login")
        .post(Auth.walletUserLogin)

    //login api for admin panel
    app.route("/api/v1/auth/admin/login")
        .post(verifyAdmin,Auth.login)
    
    //log out function
    app.route("/api/v1/auth/logout")
        .post(verifyToken,Auth.logout)
}