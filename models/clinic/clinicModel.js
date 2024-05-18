"use strict"

const mongoose = require("mongoose")
const Utils = require("../../utils/utils")
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const ClinicSchema = new Schema({
    isDeleted: {
      type: Boolean,
      default: false
    },
    clinicName: {
        type: String
    },
    clinicCode: {
        type: String,
        lowercase: true
    },
    localClinicBaseURL: {
        type: String,
    },
    clinicBaseURL: {
        type: String
    },
    clinicToken: {
        type: String
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    time: [{
        opening: {
            type: Date
        },
        closing: {
            type: Date
        }
    }],
    expiresAt: {
        type : Date,
        index: {
            expireAfterSeconds: 3
        }
    }
})

ClinicSchema.pre("save",function(next){
     const utils = new Utils()
     const token = utils.generateClinicToken({_id:this._id, clinicName: this.clinicName, cliniccode: this.clinicCode})
     if(token){
        this.clinicToken = token
        next()
     }
     else{
        next({Error: "Something went wrong"})
     }
})

const Clinics = mongoose.model("Clinics",ClinicSchema)
module.exports = Clinics