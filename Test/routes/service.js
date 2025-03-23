const express = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controller/servicesController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const router = express.Router();

router.get("/services", isAuthenticatedUser,getAllServices);
router.get("/services/:id",isAuthenticatedUser, getServiceById);
router.post("/services", isAuthenticatedUser, authorizeRoles("admin"), createService);
router.put("/services/:id", isAuthenticatedUser, authorizeRoles("admin"), updateService);
router.delete("/services/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteService);


module.exports = router;
