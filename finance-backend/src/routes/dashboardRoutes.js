import express from "express";
import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { getSummary } from "../controllers/dashboardController.js";

const router = express.Router();

router.use(auth);
router.get("/summary", allowRoles("viewer", "analyst", "admin"), getSummary);

export default router;
