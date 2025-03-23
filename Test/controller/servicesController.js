const pool = require("../configs/db");

exports.getAllServices = async (req, res) => {
    try {
      const [services] = await pool.promise().query("SELECT * FROM services");
      res.status(200).json({ success: true, data: services });
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách dịch vụ:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };

// Lấy một dịch vụ theo ID
exports.getServiceById = async (req, res) => {
    try {
      const { id } = req.params;
      const [service] = await pool.promise().query("SELECT * FROM services WHERE id = ?", [id]);
  
      if (service.length === 0) {
        return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
      }
  
      res.status(200).json({ success: true, data: service[0] });
    } catch (error) {
      console.error("❌ Lỗi khi lấy dịch vụ:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };

// Thêm mới một dịch vụ
exports.createService = async (req, res) => {
    try {
      const { name, description, price, created_by } = req.body;
  
      if (!name || !price ) {
        return res.status(400).json({ message: "Tên dịch vụ,  là bắt buộc!" });
      }
  
  
      // Chèn dữ liệu vào bảng services
      const [result] = await pool.promise().query(
        "INSERT INTO services (name, description, price, created_by) VALUES (?, ?, ?, ?)",
        [name, description, price, 1]  
      );
  
      res.status(201).json({
        success: true,
        message: "Dịch vụ được tạo thành công!",
        serviceId: result.insertId,
      });
    } catch (error) {
      console.error("❌ Lỗi khi tạo dịch vụ:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };
  // Cập nhật một dịch vụ
exports.updateService = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      const [result] = await pool.promise().query(
        "UPDATE services SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
      }
  
      res.status(200).json({ success: true, message: "Cập nhật dịch vụ thành công!" });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật dịch vụ:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };

  // Xóa một dịch vụ
exports.deleteService = async (req, res) => {
    try {
      const { id } = req.params;
      
      const [result] = await pool.promise().query("DELETE FROM services WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
      }
  
      res.status(200).json({ success: true, message: "Xóa dịch vụ thành công!" });
    } catch (error) {
      console.error("❌ Lỗi khi xóa dịch vụ:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };
  