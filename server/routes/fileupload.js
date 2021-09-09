const express = require("express");
const router = express.Router();
let fs = require("fs");
const path = require("path");
const multer = require("multer");
const { Op } = require("sequelize");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
const { FileExtension, FileManager } = require("../models");

const { S3_ACCESSKEYID, S3_SECRETACCESSKEY, S3_BUCKET } = process.env;

var s3 = new aws.S3({
  accessKeyId: S3_ACCESSKEYID,
  secretAccessKey: S3_SECRETACCESSKEY,
});
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: "private",

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: async (req, file, cb) => {
    var ext = path.extname(file.originalname);
    const fileList = await FileExtension.findAll({
      where: { isChecked: true },
      raw: true,
    });
    const split = ext.split(".");
    const findExe = fileList.find((item) => item.fileExe === split[1]);

    if (!findExe) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("안되는 확장자입니다."));
    }
  },
}).array("fileCollection", 1);

router.post("/", (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err) {
        res.status(500).send({ err });
      } else {
        const { key } = req.files[0];
        const result = await FileManager.create({
          filename: key,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

router.get("/getfilelist", async (req, res) => {
  try {
    const quotation = await FileManager.findAll({});
    res.status(201).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/download/:filename", async (req, res, next) => {
  let { filename } = req.params;
  const key = decodeURIComponent(filename);

  var bucketParams = {
    Bucket: S3_BUCKET,
    Key: key,
  };
  s3.getObject(bucketParams, function (err, data) {
    if (err) {
      return res.json({
        success: false,
        error: err,
      });
    } else {
      res.attachment(key);

      s3.getObject(bucketParams).createReadStream().pipe(res);
    }
  });
});

module.exports = router;
