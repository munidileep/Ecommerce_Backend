let multer = require("multer")
let { v4 } = require("uuid")
const prodmod = require("../models/productmodel")
const cartmodel = require("../models/cartmodel")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
let cloudinary = require("../cloudinary/cloud_store");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './prodimgs')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-products',                                         // Optional: specify a folder in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],                      // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }]          // Optional: image transformations on upload
  }
});

const upload = multer({ storage: storage });

let add = async (req, res) => {
  try {
    let data = prodmod({ ...req.body, "pimg": req.file.path, "_id": v4() })
    await data.save()
    res.json({ "message": "product added  successfully" })
  }
  catch (err) {
    res.json({ "message": "error in adding prod" })
  }
}

let getprod = async (req, res) => {
  try {
    let data = await prodmod.find()
    res.json(data)
  }
  catch (err) {
    res.json({ "message": "error in fetching product details" })
  }
}


let delprod = async (req, res) => {
  try {
    let obj = await prodmod.findById(req.params.id);
    if (!obj) return res.status(404).json({ message: 'Product not found' });

    let data = obj.pimg;
    const parts = data.split(/v\d+\//);
    if (parts.length < 2) return res.status(500).json({ message: 'Invalid Cloudinary URL' });

    let publicIdWithExt = parts[1];
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
    await prodmod.findByIdAndDelete(req.params.id);
    await cartmodel.deleteMany({"pid":req.params.id})
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in product deletion" });
  }
}


let search = async (req, res) => {
  try {
    const sid = req.query.sid; // Get 'sid' from query parameters
    let products;
    if (sid && sid.trim() !== "") {
      products = await prodmod.find({ name: { $regex: sid, $options: "i" } });
    } else {
      products = await prodmod.find();
    }
    res.json(products);
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
}

let edit = async (req, res) => {
  try {
    await prodmod.findByIdAndUpdate({ _id: req.body._id }, req.body)
    let data = { ...req.body };
    delete data["_id"];
    await cartmodel.updateMany({ "pid": req.body._id }, data)
    res.json({ message: "product details updated successfully" })
  }
  catch (err) {
    res.json({ message: "Error in updating product details" });
  }
}


let editimg = async (req, res) => {
  try {
    let data = "https://res.cloudinary.com/dq3tkkxgd/image/upload/v1752659190/" + req.file.filename
    let obj = await prodmod.findById(req.body._id)
    let data2 = obj.pimg;
    const parts = data2.split(/v\d+\//);
    if (parts.length < 2) return res.status(500).json({ message: 'Invalid Cloudinary URL' });

    let publicIdWithExt = parts[1];
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
    await prodmod.findByIdAndUpdate(
      { _id: req.body._id },
      { pimg: data }
    );
    await cartmodel.updateMany({ pid: req.body._id }, { pimg: data });
    res.json({ msg: "update done" });
  }
  catch (err) {
    res.json({ message: "error in updating image" })
  }
}

module.exports = { upload, add, getprod, delprod, search, edit, editimg }