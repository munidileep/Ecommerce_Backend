const usermodel = require("../models/usermodel")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const otpStore = {};
const sendMail = require('../sendmail');

let reg = async (req, res) => {
    try {
        let data = await usermodel.findById({ "_id": req.body._id })
        if (data) {
            res.json({ "message": "given email is already exist" })
        }
        else {
            let hashcode = await bcrypt.hash(req.body.pwd, 10)
            let data = new usermodel({ ...req.body, "pwd": hashcode })
            await data.save()
            res.json({ "message": "registration done" })
        }
    }
    catch (err) {
        res.json({ "message": "error in registration" })
    }
}

let login = async (req, res) => {
    try {
        let data = await usermodel.findById({ "_id": req.body._id })
        if (data) {
            let checking = await bcrypt.compare(req.body.pwd, data.pwd)
            if (checking) {
                let token = jwt.sign({ "_id": data._id }, "key")
                res.json({ "token": token, "_id": data._id, "name": data.name, "role": data.role, "address": data.address, "phno": data.phno, "gen": data.gen })
            }
            else {
                res.json({ "message": "Incorrect password" })
            }
        }
        else {
            res.json({ "message": "please register first" })
        }
    }
    catch (err) {
        res.json({ "message": "error in login" })
    }
}

let auth = async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization, "key")
        next()
    }
    catch(err){
        res.json({message:"you are not authorized"})
    }
}

let editprofile = async (req, res) => {
    try {
        await usermodel.findByIdAndUpdate({ _id: req.body._id }, req.body)
        res.json({ message: "details updated successfully" })
    }
    catch (err) {
        res.json({ message: "Error in updating details" });
    }
}

let forgotpass = async (req, res) => {
    try {
        let hashcode = await bcrypt.hash(req.body.pwd, 10)
        await usermodel.findByIdAndUpdate({ _id: req.body.email }, { "pwd": hashcode })
        res.json({ message: "password updated successfully" })
    }
    catch (err) {
        res.json({ message: "error in changing password" })
    }
}

const sendOtp = async (req, res) => {
    try {
        const email = req.body._id
        const user = await usermodel.findOne({ "_id": email });

        if (!user) return res.json({ message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 3 * 60 * 1000;         // OTP is valid for 3 min

        otpStore[email] = { otp, expires };

        await sendMail(email, otp);

        res.json({ message: "OTP sent to your email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending OTP" });
    }
};


const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    const stored = otpStore[email];

    if (!stored) return res.json({ message: "No OTP sent to this email" });

    if (stored.expires < Date.now()) {
        delete otpStore[email];
        return res.json({ message: "OTP expired" });
    }

    if (stored.otp !== otp) {
        return res.json({ message: "Incorrect OTP" });
    }

    delete otpStore[email]; // optional cleanup
    res.json({ message: "OTP verified successfully" });
};


module.exports = { reg, login, editprofile, forgotpass, sendOtp, verifyOtp, auth }