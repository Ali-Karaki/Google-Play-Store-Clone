import { Router } from "express";
import { User } from "../schemas/user.schema.js";
import { Types } from "mongoose";
import { authenticate } from "../utilities.js";

const router = Router();

router.get("/getUsers", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }

  try {
    const users = await User.find();
    return res.status(200).json({ message: users, success: true });
  } catch (error) {
    return res.status(404).json({ message: "No users found", success: false });
  }
});

router.post("/getUser", async (req, res) => {
  try {
    const { userId } = req.body;
    const { email } = req.body;
    const filter =
      typeof email !== "undefined" ? { email: email } : { _id: userId };
    const user = await User.findOne(filter);
    if (user === null) {
      return res.status(404).json({ message: "No user found", success: false });
    } else {
      return res.status(200).json({ message: user, success: true });
    }
  } catch (error) {}
});

router.post("/createUser", async (req, res) => {
  const authenticated = await authenticate(req);
  if (
    !authenticated ||
    authenticated.status !== 200 ||
    !authenticated.userData
  ) {
    const { message } = authenticated;
    return res.status(400).json({ message: message, success: false });
    return;
  }

  const { name, email, rememberMe } = req.body;
  try {
    let user = await User.create({
      name: name,
      rememberMe: rememberMe,
      email: email,
      wishlist: [],
      isAdmin: false,
    });
    return res.status(200).json({ message: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
});

router.put("/editUser", async (req, res) => {
  const id = req.body.id;
  const newUser = req.body.newUser;
  if (!id || !newUser) {
    return res.status(400).json({ message: "Missing data", success: false });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: newUser },
      { new: true }
    );
    res.json({ message: user, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to update the user", success: false });
  }
});

router.post("/deleteUser", async (req, res) => {
  const { userId } = req.body;
  if (!userId || !Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "No such user", success: false });
  }
  try {
    let user = await User.deleteOne({ id: userId });
    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to delete the user", success: false });
  }
});

export default router;
