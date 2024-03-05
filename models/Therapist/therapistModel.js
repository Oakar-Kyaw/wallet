"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const therapistSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
 name: {
    type: String
 },
 schedule: {
    type: String
 }
})

module.exports = mongoose.model("Therapists", therapistSchema)

// By Oakar Kyaw