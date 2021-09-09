require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const morgan = require("morgan");
const { sequelize } = require("./models");
const fileManagerRouter = require("./routes/filemanager");
const fileUploadRouter = require("./routes/fileupload");

let app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/apis/filemanager", fileManagerRouter);
app.use("/apis/fileupload", fileUploadRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.info(`server has started on ${PORT}`);
});
