"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const ruleSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  types: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RuleTypes"
  }
})

module.exports = mongoose.model("Rules", ruleSchema)

// By Oakar Kyaw