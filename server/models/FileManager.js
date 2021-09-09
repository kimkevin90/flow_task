module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "filemanager",
    {
      filename: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
