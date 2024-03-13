import axios from "axios";
import { NOTESURL } from "../utils/constants";

export const getNotes = async () => {
  try {
    const response = await axios.get(NOTESURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

export interface NoteInput {
  title: string;
  text?: string;
}
export const addNote = async (note: NoteInput) => {
  try {
    const response = await axios.post(NOTESURL, note);
    return response.data;
  } catch (error) {
    console.error("Error adding a note: ", error);
  }
};

export const deleteNote = async (noteId: string) => {
  let url: string = "";
  if (noteId) {
    url = `${NOTESURL}/${noteId}`;
  }
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error adding a note: ", error);
  }
};

export const updateNote = async (noteId: string, note: NoteInput) => {
  let url: string = "";
  if (noteId) {
    url = `${NOTESURL}/${noteId}`;
  }
  try {
    const response = await axios.put(url, note);
    return response.data;
  } catch (error) {
    console.error("Error updating a note: ", error);
  }
};
