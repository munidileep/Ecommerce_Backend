let mongoose = require("mongoose")
let prodsch = new mongoose.Schema({
    _id: String,
    name: String,
    cat: String,
    price: Number,
    desc: String,
    pimg: String,
    comm: []
})
let prodmod = mongoose.model("prodmod", prodsch)

module.exports = prodmod