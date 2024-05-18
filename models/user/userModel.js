const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")
const bcrypt = require ('bcrypt');
const Utils = require("../../utils/utils");
mongoose.Promise = global.Promise
//workFactor is for salt
const workFactor = 8;
const Schema = mongoose.Schema
const UserSchema = new Schema({
    isDeleted:{
     type: Boolean,
     default: false
    },
    isBanned:{
        type: Boolean,
        default: false
    },
    bannedReason: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    total_point: {
        type: Number,
        default: 0
    },
    security_question: {
        type: String
    },
    security_answer: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo_path: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
    },
    loginAttempt: {
        type: Number,
        default: 0
    },
    lockDate: {
        type: Date
    },
    unlockDate: {
        type: Date
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    isLoyalMember: {
        type: Boolean,
        default: false
    },
    referralCode: {
        type: String
    },
    referredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"    
    }],
    firstName: {
        type: String,
        lowercase: true
    },
    middleName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    userName:{
        type: String,
        lowercase: true,
        required: [true,"can't be blank"],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blanked"],
        index: true
    },
    password: {
        type: String,
        minlength: 6,
        require: true
    },
    phone: {
        type: Number,
        required: [true, "can't be blanked"],
    },
    relatedProfile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachments"
    }],
    relatedClinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinics"
    },
    relatedPointHistories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PointHistories"
    }],
    relatedPackages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Packages"
    }],
    relatedTreatments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatments"
    }],
    relatedPointier: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PointTiers"
    }],
    relatedBooking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings"
    }],
    relatedCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
    relatedDoctor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors"
    }],
    relatedTherapist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Therapists"
    }],
    relatedNurse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nurses"
    }],
    relatedReferRule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReferRules"
    },
    expireAt: {
        type: Date,
        index: {expireAfterSeconds:5}
    }
})


UserSchema.methods.generatePassword = (user,next) => {
    return bcrypt
    .genSalt(workFactor)
    .then(salt => {
        return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
        user.password = hash
        next()
    })
    .catch(err => console.error(err.message));
}
UserSchema.pre("save", function (next) {
    // Modify the document or perform additional tasks
    user = this
    //remove all white space between word
    user.userName = user.userName.replace(/\s/g,"")
    //generate random referral code
    let utils = new Utils()
    user.referralCode = utils.generateRandomCode(12)
    console.log("user referralcode",user.referralCode)
    let isEmail = validator.isEmail(user.email)
    isEmail ?
        Users.findOne({email: user.email}).then((docs)=>{
            if(docs) {
                let err = Error("User already exists")
                next(err)
            }
            else if(!docs){
                this.generatePassword(user,next)
            }
        })
        :
        next(Error("Invalid Email Addresss")) 
   });
UserSchema.plugin(uniqueValidator, {message: "is already taken."})

var Users = mongoose.model("Users",UserSchema)
module.exports = Users