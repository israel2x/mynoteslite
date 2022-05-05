import React, { useEffect, useState } from "react";
//import notes from '../assets/db';
import ListItem from "../components/ListItem";
import { DotSpinner } from "@uiball/loaders";
import AddButton from "../components/AddButton";
import { useNetwork } from "ahooks";

function NotesListPage() {
  const [notes, setNotes] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const networkState = useNetwork();

  useEffect(() => {
    console.log("is online: " + networkState.online);
    setIsOnline(networkState.online);
    const timer = setTimeout(() => {
      getNotes();
      console.log("is data: " + isData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isOnline]);

  //"https://mynotes-lite-israel2x.vercel.app/api/notes/"
  let getNotes = async () => {
    console.log(isOnline);
    if (!isOnline) {
      setIsData(false);
    } else {
      let response = await fetch("http://localhost:8000/notes")
        .then((response) => response.json())
        .catch((e) => console.log(e));
      //let data = await response.json();
      //console.log(data);
      //setNotes(data);
      console.log("response: " + response);
      if (response) {
        setNotes(response);
        setIsData(true);
      } else {
        setNotes([]);
      }
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length ? 0 : notes.length}</p>
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
