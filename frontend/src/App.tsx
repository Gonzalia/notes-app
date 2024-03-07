import { useEffect, useState } from "react";
import NoteDisplay from "./components/NoteDisplay";
import { Note as NoteModel } from "./models/note";
import { deleteNote, getNotes } from "./api";
import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./styles/NotesPage.module.css";
import NoteForm from "./components/NoteForm";
import utils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      const response = await getNotes();
      if (response) {
        setNotes(response);
      }
    };

    loadNotes();
  }, []);

  const handleDeleteNote = async (note: NoteModel) => {
    try {
      await deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
      console.log("OK");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Button
        onClick={() => setShowForm(true)}
        className={`mb-4 mt-4 ${utils.blockCenter} ${utils.flexCenter}`}
      >
        <FaPlus />
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className="g-4 ">
        {notes.map((note: NoteModel) => (
          <Col key={note._id}>
            <NoteDisplay
              note={note}
              onDeleteNoteClicked={handleDeleteNote}
              className={classes.note}
              onNoteClicked={() => setNoteToEdit(note)}
            />
          </Col>
        ))}
      </Row>
      {showForm && (
        <NoteForm
          onDismiss={() => setShowForm(false)}
          onNoteSaved={(newNote) => {
            setNotes((notes) => [...notes, newNote]);
            setShowForm(false);
          }}
        />
      )}
      {noteToEdit && (
        <NoteForm
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
};

export default App;
