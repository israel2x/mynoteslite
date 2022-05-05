import React from "react";
import { Link } from "react-router-dom";

const getDate = (note) => {
  return new Date(note.created).toLocaleDateString();
};

const getTitle = (note) => {
  const title = note.body.split("\n")[0];

  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

const getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45);
  } else {
    return content;
  }
};

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note._id}`}>
      <div className="notes-list-item">
        <h3>{note.text}</h3>
        <p>
          <span>{getDate(note)}</span>
          {note.text}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
