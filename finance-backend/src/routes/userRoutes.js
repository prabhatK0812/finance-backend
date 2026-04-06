import express from "express";
import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.use(auth);
router.get("/", allowRoles("admin"), getUsers);
router.get("/:id", allowRoles("admin"), getUserById);
router.patch("/:id", allowRoles("admin"), updateUser);
router.delete("/:id", allowRoles("admin"), deleteUser);

export default router;
