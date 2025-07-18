let mongoose = require("mongoose")
let ctsch = new mongoose.Schema({
    _id: String,
    uid: String,
    pid: String,
    name: String,
    qty: Number,
    price: Number,
    pimg: String,
    desc: String,
    cat: String
})
let cartmodel = mongoose.model("cartmodel", ctsch)

module.exports = cartmodel