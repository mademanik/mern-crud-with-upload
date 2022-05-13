import express from "express";
import { upload } from "../helpers/FileHelper.js";
import {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  updateUserEmpty,
  deleteUser,
} from "../controllers/UserController.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", upload.single("file"), saveUser);
router.patch("/users/:id", upload.single("file"), updateUser);
router.patch("/users/empty/:id", updateUserEmpty);
router.delete("/users/:id", deleteUser);

export default router;
