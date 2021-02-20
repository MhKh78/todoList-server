const { Router } = require("express");
const {
  protect,
  signup,
  login,
  getMe,
  getUser,
} = require("../controllers/authController");
const {
  getAllMyTodos,
  getTodo,
  createTodo,
  updateTodo,
} = require("../controllers/TodoListController");

const router = Router();

router.use(protect);
router.get("/", getAllMyTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);

// router.get("/me", getMe, getUser);

module.exports = router;
