let { v4 } = require("uuid")
const cartmodel = require("../models/cartmodel")


let addcart = async (req, res) => {
    try {
        let result = await cartmodel.findOne({ "uid": req.body.uid, "pid": req.body.pid })
        if (result) {
            await cartmodel.findByIdAndUpdate({ "_id": result._id }, { $inc: { qty: 1 } })
            res.json({ "message": "product quantity incremented" })
        }
        else {
            let data = cartmodel({ ...req.body, "_id": v4() })
            await data.save()
            res.json({ "message": "product added to your cart" })
        }
    }
    catch (err) {
        res.json({ "message": "unable to add cart" })
    }
}

let getcart = async (req, res) => {
    try {
        let data = await cartmodel.find({ "uid": req.params.uid })
        res.json(data)
    }
    catch (err) {
        res.json({ "message": "error in getting card" })
    }
}

let inc = async (req, res) => {
    try {
        await cartmodel.findByIdAndUpdate({ "_id": req.params.cid }, { $inc: { qty: 1 } })
        res.json({ "message": "cart incremented" })
    }
    catch (err) {
        res.json({ "message": "error in increment" })
    }
}

let dec = async (req, res) => {
    try {
        await cartmodel.findByIdAndUpdate({ "_id": req.params.cid }, { $inc: { qty: -1 } })
        res.json({ "message": "cart decremented" })
    }
    catch (err) {
        res.json({ "message": "error in decrement" })
    }
}

let delcart = async (req, res) => {
    try {
        await cartmodel.findByIdAndDelete({ "_id": req.params.cid })
        res.json({ "message": "deleted cart" })
    }
    catch (err) {
        res.json({ "message": "error in deleting cart" })
    }
}

module.exports = { addcart, getcart, inc, dec, delcart }