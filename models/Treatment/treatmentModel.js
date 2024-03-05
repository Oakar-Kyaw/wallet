"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const TreatmentSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  relatedRule: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Rules"
 },
 relatedCategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TreatmentCategories"
 },
 price: {
    type: Number
 }
})

module.exports = mongoose.model("Treatments", TreatmentSchema)

// By Oakar Kyaw