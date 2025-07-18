//import mongoose from "mongoose"; (another way of importing)

let mongoose = require("mongoose")
let schema = new mongoose.Schema({
    "_id": String,
    "name": String,
    "phno": String,
    "pwd": String,
    "gen": String,
    "address": String,
    "role": { type: String, default: "user" }
})
let usermodel = mongoose.model("usermodel", schema)

module.exports = usermodel