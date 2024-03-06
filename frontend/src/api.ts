import axios from "axios";

const baseURL = "http://localhost:5000/api/notes";
export const getNotes = async () => {
  try {
    const response = await axios.get(baseURL);
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
    const response = await axios.post(baseURL, note);
    return response.data;
  } catch (error) {
    console.error("Error adding a note: ", error);
  }
};
