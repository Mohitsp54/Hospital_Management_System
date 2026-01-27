const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/add", addUser);
router.put("/:id", updateUser); // update
router.delete("/:id", deleteUser); // delete

module.exports = router;
