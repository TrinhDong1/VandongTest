const pool = require("../configs/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendToken = require("../utils/jwtToken");


exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, role = "user" } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }
  
      console.log("Đang kiểm tra MySQL pool.query...");
  
      // Kiểm tra email đã tồn tại chưa
      pool.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
          console.error("Lỗi MySQL:", err);
          return res.status(500).json({ message: "Lỗi server", error: err.message });
        }
  
        console.log("Kết quả SELECT:", results);
  
        if (results.length > 0) {
          return res.status(400).json({ message: "Email đã tồn tại!" });
        }
  
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Thêm user vào database
        pool.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role],
          (err, result) => {
            if (err) {
              console.error("Lỗi khi INSERT:", err);
              return res.status(500).json({ message: "Lỗi server", error: err.message });
            }
            console.log("Đăng ký thành công:", result);
            res.status(201).json({ message: "Đăng ký thành công!", userId: result.insertId });
          }
        );
      });
    } catch (error) {
      console.error("Lỗi ngoài try-catch:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };


  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
      }
  
      const [rows] = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }
  
      const user = rows[0];
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
      }
  
      // Gọi sendToken để tạo và gửi token về client
      sendToken(user, 200, res);
      
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };


exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Cấu hình bảo mật cho cookie trong môi trường production
      sameSite: "strict", // Giới hạn cookie chỉ cho phép gửi trong các yêu cầu cùng nguồn gốc
    });

    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công!",
    });
  } catch (error) {
    console.error("❌ Lỗi khi đăng xuất:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

  
