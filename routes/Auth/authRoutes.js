const AuthController = require("../../controllers/Auth/authController")

module.exports = (app)=>{
    let Auth = new AuthController()
     app.route("/api/v1/auth/login")
        .post(Auth.login)
}