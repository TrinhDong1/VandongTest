const db = require("../configs/db");

const User = {
  tableName: "users",
  fields: {
    id: {
      type: "INT",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(50)",
      allowNull: false,
      unique: true,
    },
    password: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    role: {
      type: "ENUM('user', 'admin')",
      allowNull: false,
      defaultValue: "user",
    },
  },
};

module.exports = User;
