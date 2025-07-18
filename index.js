let express = require("express")
let mongoose = require("mongoose")
let bodyparser = require("body-parser")
let cors = require("cors")
const router = require("./routers/userroute")
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database is conneccted")
}).catch(()=>{
    console.log("database is not connected")
})

let app = express()
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ "extended": true }))
app.use("/pimgs", express.static("./prodimgs"))
app.use("/", router)

const PORT = process.env.PORT || 5555;

app.listen(PORT,()=>{
    console.log(`server connected on port ${PORT}`)
})