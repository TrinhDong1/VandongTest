const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Lỗi hệ thống";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.error(err);

    return res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // -> Lỗi truy vấn không tìm thấy dữ liệu
    if (err.name === "SequelizeDatabaseError") {
      error = new ErrorHandler("Lỗi truy vấn dữ liệu!", 400);
    }

    // -> Lỗi xác thực dữ liệu (Sequelize Validation)
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map((error) => error.message);
      error = new ErrorHandler(messages.join(". "), 400);
    }

   
    if (err.name === "SequelizeUniqueConstraintError") {
      error = new ErrorHandler("Dữ liệu đã tồn tại!", 400);
    }


    if (err.name === "JsonWebTokenError") {
      error = new ErrorHandler("Token không hợp lệ!", 401);
    }

    if (err.name === "TokenExpiredError") {
      error = new ErrorHandler("Token đã hết hạn!", 401);
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message || "Lỗi hệ thống!",
    });
  }
};
