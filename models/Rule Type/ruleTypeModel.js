"use strict"

const mongoose = require("mongoose")
mongoose.promise = global.Promise
const Schema = mongoose.Schema

const ruleTypeSchema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    enum:["Per Treatment", "Treatment Amount", "Treatment Time"]
  },
  treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatments"
 }],
  description: {
    type: String
 },
 minAmount: {
    type: Number
 },
 maxAmount: {
    type: Number
 },
 treatment_time: {
    type: Number
 },
 deduct_point: [{
    relatedTier: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Tiers"
    },
    deduct_amount: {
        type: Number
    }
 }],
 add_point: [{
    relatedTier: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Tiers"
    },
    add_amount: {
        type: Number
    }
 }],

})

module.exports = mongoose.model("RuleTypes", ruleTypeSchema)

// By Oakar Kyaw