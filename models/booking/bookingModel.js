"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  remark: {
    type: String
  },
  relatedBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches"
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  relatedCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts"
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatments"
  }],
  serviceProviders: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Doctors"
  }],
  name: {
    type: String
  },
  phone: {
    type: Number,
    require: true
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  code: {
    type: String
  }

})

module.exports = mongoose.model("Bookings", bookingSchema)

// By Oakar Kyaw