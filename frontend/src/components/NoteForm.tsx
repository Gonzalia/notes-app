import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput, addNote, updateNote } from "../api/notesApi";
import TextInputField from "./form/TextInputField";
interface AddEditNoteForm {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const NoteForm = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text,
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await addNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteForm;
