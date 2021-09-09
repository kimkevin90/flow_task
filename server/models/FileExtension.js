module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "fileextension",
    {
      fileExe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isFixed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["fileExe"],
        },
      ],
    }
  );
