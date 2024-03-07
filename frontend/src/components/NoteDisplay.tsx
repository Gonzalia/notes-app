import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styleUtils from "../styles/utils.module.css";
import classes from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
  onNoteClicked: (note: NoteModel) => void;
}
const NoteDisplay = ({
  note,
  onDeleteNoteClicked,
  className,
  onNoteClicked,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let dateText: string;
  if (updatedAt > createdAt) {
    dateText = "Updated: " + formatDate(updatedAt);
  } else {
    dateText = "Created: " + formatDate(createdAt);
  }
  return (
    <Card
      className={` ${className} ${classes.noteCard}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={classes.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={classes.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{dateText}</Card.Footer>
    </Card>
  );
};

export default NoteDisplay;
