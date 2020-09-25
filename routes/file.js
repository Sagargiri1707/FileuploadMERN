//upload
var express = require("express");
var router = express.Router();
const formidable = require("formidable");
const userSchema = require("../models/userModel");
const fileSchema = require("../models/fileModel");

const fs = require("fs");
const { route } = require("./user");

router.post("/upload", (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({
        //
        info: {
          error: "File could not be uploaded",
        },
      });
    }
    const newFile = new fileSchema();
    newFile.data = fs.readFileSync(files.file.path);
    newFile.contentType = files.file.type;
      newFile.name = files.file.name;
      newFile.by=req.user._id
    newFile.save((err, result) => {
      if (err) {
        return res.status(400).json({
          fileUploadStatus: "Error uploading file",
        });
      }
      req.user.files.push(result._id);
      req.user.save();
      res.json({
        fileUploadStatus: { message: "File uploaded successfully" },
        file: {name:files.file.name,_id:result._id},
      });
    });
  });
});
router.get('/download/:FileId', (req, res) => {
    fileSchema.findById(req.params.FileId).then((data) => {
        res.set('Content-Type', data.contentType)
        res.send(data.data)
    }).catch(err => {
        if (err) {
                console.log(err);
            return res.json({
                info:{message:"Some error occured"}
            })
        }
    })
})
module.exports = router;
