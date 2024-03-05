"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const TierSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  tier_level: {
    type: String
 },
 total_point: {
    type: Number
 }
})

module.exports = mongoose.model("Tiers", TierSchema)

// By Oakar Kyaw