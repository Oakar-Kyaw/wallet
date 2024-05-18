"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const branchSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  opening_time: {
    type: String,
  },
  closing_time: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String
  },
  photo_path: {
    type: String
  }

})

module.exports = mongoose.model("Branches", branchSchema)

// By Oakar Kyaw