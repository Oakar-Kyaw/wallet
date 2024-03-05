"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const TreatmentCategoriesSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model("TreatmentCategories", TreatmentCategoriesSchema)

// By Oakar Kyaw