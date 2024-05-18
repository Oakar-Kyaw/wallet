"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const AttachmentSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users"
 },
})

let Attachments = mongoose.model("Attachments", AttachmentSchema)
module.exports = Attachments
// By Oakar Kyaw