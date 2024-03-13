import { useEffect, useState } from "react";
import NoteDisplay from "./components/NoteDisplay";
import { Note as NoteModel } from "./models/note";
import { deleteNote, getNotes } from "./api/notesApi";
import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./styles/NotesPage.module.css";
import NoteForm from "./components/NoteForm";
import utils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./components/ErrorPage";
import EmptyNoteCase from "./components/EmptyNotesCase";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setNotesLoading(true);
        const response = await getNotes();
        if (response) {
          setNotes(response);
        } else {
          setShowNotesLoadingError(true);
        }
      } catch (error) {
        setShowNotesLoadingError(true);
        console.error(error);
      } finally {
        setNotesLoading(false);
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
    <>
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => {}}
        onSignUpClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />
      <Container>
        <Button
          onClick={() => setShowForm(true)}
          className={`mb-4 mt-4 ${utils.blockCenter} ${utils.flexCenter}`}
        >
          <FaPlus />
          Add new note
        </Button>

        {notesLoading && <LoadingSpinner />}
        {showNotesLoadingError && <ErrorPage />}
        {notes.length === 0 && <EmptyNoteCase />}
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

        {false && (
          <SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
        )}
        {false && (
          <LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
        )}
      </Container>
    </>
  );
};

export default App;
