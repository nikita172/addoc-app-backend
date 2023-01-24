const express = require("express");
const db = require("./config/db.js")
const authRoute = require("./routes/auth")
const documentRoute = require("./routes/document")
const helmet = require("helmet")
const cors = require("./middleware/cors")
const multer = require("multer")
const path = require("path")
db.connect();
const app=express();
app.use(express.json())
app.use(helmet());
app.use(cors);
app.use("/public", express.static(path.join(__dirname, "./public")))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.random() + file.originalname)
    }
})
const upload = multer({ storage })
app.use("/api/auth",authRoute)
app.use("/api/document",upload.any(),documentRoute)
app.listen(8080,()=>{
    console.log("app is listening to port 8080");
})