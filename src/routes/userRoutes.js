const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.addUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users/:id", userController.getUserById);
router.get("/users/status/:status", userController.getUsersByStatus);
// GET /api/users/gender/:gender
router.get("/users/gender/:gender", userController.getUsersByGender);

module.exports = router;
