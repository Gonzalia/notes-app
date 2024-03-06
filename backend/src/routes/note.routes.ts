import express from "express";
import {
  createNotes,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller";

const router = express.Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.post("/", createNotes);
router.put("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
export default router;
