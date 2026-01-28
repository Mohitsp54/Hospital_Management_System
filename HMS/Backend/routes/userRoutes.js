const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/add", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
