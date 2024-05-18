"use strict"

const Clinics = require("../../models/clinic/clinicModel")

class ClinicController {
 // create clinic
 async createClinic(req,res){
    try {
        let createClinic = await Clinics.create(req.body)
        res.status(200).send({
            success: true,
            message: "Created Successfully",
            data: createClinic
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

// list all clinic
 async listAllClinic(req,res){
    try {
        let query = {
            isDeleted: false
        }
        let queryClinic = await Clinics.find(query)
        res.status(200).send({
            success: true,
            data: queryClinic
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

//query clinic by id
 async queryClinicById(req,res) {
    try {
        let id = req.params.id
        let {
            clinicName,
            clinicCode,
            clinicBaseURL,
            clinicToken
        } = req.query
        let query = {
            isDeleted: false
        }
        id ? query["_id"] = id : ""
        clinicName ? query["clinicName"] = clinicName : ""
        clinicCode ? query["clinicCode"] = clinicCode : ""
        clinicBaseURL ? query["clinicBaseURL"] = clinicBaseURL : ""
        clinicToken ? query["clinicToken"] = clinicToken : ""
        console.log("query",query)
        let queryClinicById = await Clinics.findOne(query)
        res.status(200).send({
            success: true,
            data: queryClinicById
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

// update clinic By Id
 async updateClinicById(req,res) {
    try {
        let id = req.params.id
        console.log("rqbody",req.body)
        let updateClinicById = await Clinics.findByIdAndUpdate(id,req.body,{new: true})
        res.status(200).send({
            success: true,
            message: "Successfully Updated",
            data: updateClinicById
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

//delete clinic by ID
 async deleteClinicById(req,res)  {
    try {
        let id = req.params.id
        let today = new Date()
        let deleteClinicById = await Clinics.findByIdAndUpdate(id,{isDeleted: true, expiresAt: today},{new: true})
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
            data: deleteClinicById
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}
}


module.exports = ClinicController