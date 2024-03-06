import axios from "axios";

export const getNotes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/notes");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};
