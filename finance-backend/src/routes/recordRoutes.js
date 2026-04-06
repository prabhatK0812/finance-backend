import express from "express";
import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { createRecord, getRecords, getRecordById, updateRecord, deleteRecord } from "../controllers/recordController.js";
import { validateRecord } from "../middleware/validation.js";

const router = express.Router();

router.use(auth);
router.get("/", allowRoles("viewer", "analyst", "admin"), getRecords);
router.post("/", allowRoles("admin"), validateRecord, createRecord);
router.get("/:id", allowRoles("viewer", "analyst", "admin"), getRecordById);
router.put("/:id", allowRoles("admin"), validateRecord, updateRecord);
router.delete("/:id", allowRoles("admin"), deleteRecord);

export default router;
