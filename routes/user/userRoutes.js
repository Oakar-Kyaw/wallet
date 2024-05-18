const upload = require("../../config/fileUpload/fileUpload")
const Users = require("../../controllers/user/userController")
const { verifyAdmin } = require("../../middlewares/verifyAdmin")
const { verifyClinicCode } = require("../../middlewares/verifyClinicCode")
const { verifyToken } = require("../../middlewares/verifyToken")
module.exports = (app) =>{
    const User = new Users()
    // get user and create user
    app.route("/api/v1/user")
       .post(verifyClinicCode, User.createUser)
       
    app.route("/api/v1/users").get( verifyToken, User.getUser)

    app.route("/api/v1/user/:id")
       .put(verifyToken, upload.array("profile",5), User.updateUserDataById)
       .get(verifyToken,User.getSpecificWalletUser)
   //     .delete(User.deleteUserById)

    app.route("/api/changeFile")
       .post(User.updateFolder)
   
       //ban user by id
    app.route("/api/v1/wallet/ban/:id")
       .put(verifyToken, User.banUser)
    
       // add user by id
    app.route("/api/v1/wallet/point/add/:id")
       .put(verifyAdmin,verifyToken, User.addPointUser)

    app.route("/api/v1/wallet/user")
       .get(User.getWalletUser)
       .post(verifyClinicCode,User.createWalletUser)

    app.route("/api/v1/wallet/user/:id")
       .put(verifyToken, upload.single("profile"), User.updateWalletUserDataById)
       .get(verifyToken,User.findWalletUserById)
       .delete(User.deleteWalletUserById)
   
}