"use strict"
const Clinics = require("../models/clinic/clinicModel")

exports.verifyClinicCode = async (req,res,next) =>{
    try {
        let {clinicCode} = req.body
        let searchCodes =  clinicCode.toLowerCase()
        console.log(clinicCode,searchCodes)
        let searchCode = await Clinics.findOne({clinicCode: searchCodes})
        if(searchCode){
            res.locals.relatedClinic = searchCode._id
            res.locals.clinicBaseURL = searchCode.clinicBaseURL
            res.locals.clinicToken = searchCode.clinicToken
            next()
        }
        else {
            res.status(404).send({
              error: true,
              message: "Wrong Code"
            })
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}