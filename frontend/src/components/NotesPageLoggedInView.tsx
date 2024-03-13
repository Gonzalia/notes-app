import { Button, Col, Row } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "../models/note";
import { FaPlus } from "react-icons/fa";
import NoteDisplay from "./NoteDisplay";
import ErrorPage from "./ErrorPage";
import { getNotes, deleteNote } from "../api/notesApi";
import EmptyNoteCase from "./EmptyNotesCase";
import NoteForm from "./NoteForm";
import utils from "../styles/utils.module.css";
import classes from "../styles/NotesPage.module.css";

const NotesPageLoggedInView = () => {
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
    </>
  );
};

export default NotesPageLoggedInView;
