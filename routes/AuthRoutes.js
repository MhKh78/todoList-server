const { Router } = require("express");
const {
  protect,
  signup,
  login,
  getMe,
  getUser,
} = require("../controllers/authController");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);
router.get("/me", getMe, getUser);

module.exports = router;
