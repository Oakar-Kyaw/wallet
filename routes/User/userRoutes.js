const Users = require("../../controllers/user/userController")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const User = new Users()
    // get user and create user
    app.route("/api/v1/user")
       .get(User.getUser)
       .post(User.createUser)

    app.route("/api/v1/user/:id")
       .put(User.updateUserDataById)
       .get(verifyToken,User.findUserById)
       .delete(User.deleteUserById)
    app.route("/api/changeFile")
       .post(User.updateFolder)
}