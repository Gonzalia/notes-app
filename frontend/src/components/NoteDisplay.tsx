import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import classes from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}
const NoteDisplay = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let dateText: string;
  if (updatedAt > createdAt) {
    dateText = "Updated: " + formatDate(updatedAt);
  } else {
    dateText = "Created: " + formatDate(createdAt);
  }
  return (
    <Card className={` ${className} ${classes.noteCard}`}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={classes.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{dateText}</Card.Footer>
    </Card>
  );
};

export default NoteDisplay;
