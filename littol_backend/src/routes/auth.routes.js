import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { profile, editProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/profile", authenticateToken, profile);
router.put("/edit-profile", authenticateToken, editProfile);


router.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log(user);

  return res
    .status(200)
    .json({ message: `Authorization Successful for ${user.email}` });
});


router.put("/edit-profile", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  user.fullname = req.body.fullname ;
  await user.save();
  
  return res.status(200).json({ message: "User name updated !" });
});


export default router;
