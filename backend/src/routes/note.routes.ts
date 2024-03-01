import express from "express";
import { createNotes, getNote, getNotes } from "../controllers/note.controller";

const router = express.Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.post("/", createNotes);
export default router;
