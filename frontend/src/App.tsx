import { useEffect, useState } from "react";
import NoteDisplay from "./components/NoteDisplay";
import { Note as NoteModel } from "./models/note";
import { getNotes } from "./api";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./styles/NotesPage.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const response = await getNotes();
      if (response) {
        setNotes(response);
      }

      console.log(response);
    };

    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4 ">
        {notes.map((note: NoteModel) => (
          <Col key={note._id}>
            <NoteDisplay note={note} className={classes.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
