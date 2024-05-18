"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const cartSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  treatments: [{
    treatment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatments"
     },
    deduct_point: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
    },
    add_point: {
        type: Number
    },
    total_amount: {
        type: Number
    },
    quantity: {
        type: Number
    }
  }
],
package: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Packages"
  }],
description: {
    type: String
  },
createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Carts", cartSchema)

// By Oakar Kyaw