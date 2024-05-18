"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const packageSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  relatedRule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rules"
  },
 name: {
    type: String
 },
 treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatments"
 }],
 price: {
    type: Number
 }
})

module.exports = mongoose.model("Packages", packageSchema)

// By Oakar Kyaw