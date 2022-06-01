import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { DotSpinner } from "@uiball/loaders";
import AddButton from "../components/AddButton";
import { useNetwork } from "ahooks";
import { getAllNotes } from "../services/notesService";

function NotesListPage() {
  const [notes, setNotes] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const networkState = useNetwork();

  useEffect(() => {
    setIsOnline(networkState.online);
    const getNotes = async () => {
      if (!isOnline) {
        setIsData(false);
      } else {
        let response = await getAllNotes();
        if (response) {
          setNotes(response);
          setIsData(true);
        } else {
          setNotes([]);
        }
      }
    };

    getNotes();
  }, [isOnline, networkState, notes]);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length ? notes.length : 0}</p>
      </div>
      {isData ? (
        <div className="notes-list">
          {notes.map((note, index) => (
            <ListItem key={index} note={note} />
          ))}
        </div>
      ) : (
        <div className="notes-spinner">
          <DotSpinner size={40} speed={0.9} color="green" />
        </div>
      )}
      <AddButton></AddButton>
    </div>
  );
}

export default NotesListPage;
