import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput, addNote } from "../api";

interface NoteFormProps {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const NoteForm = ({ onDismiss, onNoteSaved }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = await addNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="3"
              as="textarea"
              rows={5}
              placeholder="text"
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteForm;
