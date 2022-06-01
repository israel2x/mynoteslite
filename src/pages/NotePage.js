import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import {
  deletNoteById,
  getNoteById,
  newNote,
  updateNoteService,
} from "../services/notesService";

const NotePage = ({ match, history }) => {
  const noteId = match.params.id;
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      if (noteId === "new") return;
      let data = await getNoteById(noteId);

      setNote(data);
    };

    getNote();
  }, [noteId]);

  function handleNote(e) {
    setNote({ ...note, text: e.target.value });
  }

  const createNote = async () => {
    const response = await newNote(note);
  };

  let updateNote = async () => {
    const res = await updateNoteService(note);
  };

  const deletNote = async () => {
    const res = await deletNoteById(noteId);
    history.push("/");
  };

  const handleSubmit = () => {
    if (noteId !== "new" && !note.text) {
      deletNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }
    history.push("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}></ArrowLeft>
          </Link>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deletNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Save</button>
        )}
      </div>
      <textarea
        onChange={(e) => handleNote(e)}
        /* value={note == null ? "Empty" : note.text} */
        value={note?.text}
      ></textarea>
    </div>
  );
};

export default NotePage;
