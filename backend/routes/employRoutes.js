const express = require("express");
const {
  addEmployee,
  getEmployees,
  removeEmployee,
} = require("../controllers/empController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect(["admin"]), addEmployee);
router.get("/", protect(["admin"]), getEmployees);
router.delete("/:id", protect(["admin"]), removeEmployee);

module.exports = router;
