const router = require("express").Router();
const Document = require("../models/Document.js");
const User =require("../models/User.js");


//ADD DOCUMENT
router.post("/add", async(req,res)=>{
    try {
        const { email,title,description,...other} = req.body;
        const user = await User.findOne({ email: email })
        const userId = user._id;
        const newDocument = new Document({
            userId: userId,
            doc: req.files.map((f) => f.filename),
            title,
            description
        })
        const savedDocument = await newDocument.save();
        res.status(200).json(savedDocument);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET SINGLE DOCUMENT
router.get("/get/:documentid", async(req,res)=>{
    try {
        const {documentid } = req.params;
        const document = await Document.findOne({_id:documentid});
        res.status(200).json(document);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL DOCUMENT
router.get("/getall", async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.query.email })
        const userId = user._id;
        const userDocuments = await Document.find({userId:userId});
        res.status(200).json(userDocuments);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//DELETE DOCUMENT 
router.delete("/delete/:id", async(req,res)=>{
    try {
        const {id } = req.params;
        const document = await Document.findByIdAndDelete(id);       
        if(document){           
            res.status(200).json({ message: "document has been deleted" })
        }
        else{
            res.status(403).json({ message: "you can only delete your document" })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
