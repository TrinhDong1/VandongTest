const db = require("../configs/db");

const Service = {
  tableName: "services",
  fields: {
    id: {
      type: "INT",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    description: {
      type: "TEXT",
      allowNull: true,
    },
    price: {
      type: "DECIMAL(10,2)",
      allowNull: false,
    },
    created_by: {
      type: "INT",
      allowNull: false,
      foreignKey: {
        table: "users",
        field: "id",
        onDelete: "CASCADE",
      },
    },
    created_at: {
      type: "TIMESTAMP",
      default: "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "TIMESTAMP",
      default: "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
};

module.exports = Service;
