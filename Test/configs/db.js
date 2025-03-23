const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "",         
  database: "TestAPI",  
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error(" Lỗi kết nối MySQL:", err);
    return;
  }
  console.log("Kết nối MySQL thành công!");
});

module.exports = db;
