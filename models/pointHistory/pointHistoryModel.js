"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const pointHistorySchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
 treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatments"
 }],
 packages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Packages"
 }]
})

module.exports = mongoose.model("Packages", pointHistorySchema)

// By Oakar Kyaw