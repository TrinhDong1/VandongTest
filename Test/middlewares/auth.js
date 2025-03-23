
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/User");
const pool = require("../configs/db");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Vui Lòng đăng nhập.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  pool.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
    if (err) {
      return next(new ErrorHandler("Lỗi server khi truy vấn người dùng.", 500));
    }

    if (results.length === 0) {
      return next(new ErrorHandler("Người dùng không tồn tại.", 404));
    }

    req.user = results[0];
    next(); 
  });
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) không có quyền truy cập tài nguyên này.`,
          403
        )
      );
    }
    next();
  };
};
