"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const referRuleSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  perUser: {
    type: Number
  }
})

module.exports = mongoose.model("ReferRules", referRuleSchema)

// By Oakar Kyaw