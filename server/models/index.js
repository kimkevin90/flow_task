const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.FileManager = require("./FileManager")(sequelize, Sequelize);
db.FileExtension = require("./FileExtension")(sequelize, Sequelize);
module.exports = db;
