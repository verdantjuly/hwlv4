"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
      this.hasMany(models.Comments, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
      this.hasMany(models.Likes, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
    }
  }
  Users.init(
    {
      userId: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          message: "중복된 닉네임이 존재합니다.",
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
