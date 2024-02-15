import { INote } from "../../types";

type Props = {
  note: INote
}

const NoteCard:React.FC<Props> = ({ note: {title, content, background, labels} }) => {
  return (
    <div>NoteCard</div>
  );
}

export default NoteCard;