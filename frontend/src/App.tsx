import { useEffect, useState } from "react";
import NoteDisplay from "./components/NoteDisplay";
import { Note as NoteModel } from "./models/note";
import { getNotes } from "./api";
import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./styles/NotesPage.module.css";
import NoteForm from "./components/NoteForm";
import utils from "./styles/utils.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const loadNotes = async () => {
      const response = await getNotes();
      if (response) {
        setNotes(response);
      }
    };

    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        onClick={() => setShowForm(true)}
        className={`mb-4 mt-4 ${utils.blockCenter}`}
      >
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className="g-4 ">
        {notes.map((note: NoteModel) => (
          <Col key={note._id}>
            <NoteDisplay note={note} className={classes.note} />
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
    </Container>
  );
};

export default App;
