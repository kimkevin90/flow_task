const express = require("express");
const router = express.Router();

const { FileExtension } = require("../models");

router.get("/getfiexdextensions", async (req, res) => {
  try {
    const fileList = await FileExtension.findAll({
      where: { isFixed: true },
    });

    res.status(201).json(fileList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getcustomedextensions", async (req, res) => {
  try {
    const fileList = await FileExtension.findAll({
      where: { isFixed: false },
    });

    res.status(201).json(fileList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/editextensions/:id", async (req, res) => {
  const { id } = req.params;
  const { isChecked } = req.body;

  try {
    const editFileList = await FileExtension.update(
      {
        isChecked,
      },
      { where: { id: id } }
    );

    if (editFileList) {
      const editFindPk = await FileExtension.findOne({
        where: { id },
      });
      res.status(201).json(editFindPk);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/registerFileExe", async (req, res) => {
  const { fileExe } = req.body;

  try {
    const newFileExe = new FileExtension({
      fileExe,
      isChecked: true,
      isFixed: false,
    });

    const saveFileExe = await newFileExe.save();

    res.status(201).json(saveFileExe);
  } catch (err) {
    res.status(500).send({ err: err.errors[0].type });
  }
});

router.delete("/deleteFileExe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteFileExe = await FileExtension.destroy({ where: { id: id } });
    res.status(201).json(deleteFileExe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
