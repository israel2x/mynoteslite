import React, { useEffect, useState } from 'react'
//import notes from '../assets/db';
import ListItem from '../components/ListItem';
import { DotSpinner } from '@uiball/loaders'
import AddButton from '../components/AddButton';

function NotesListPage() {
  const [notes, setNotes] = useState([]);
  const [isData, setIsData] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      getNotes();
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  
  let getNotes = async () => {
    let response = await fetch('http://localhost:8000/notes/');
    let data = await response.json();
    console.log(data);
    setNotes(data);
    setIsData(true);
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
      </div>
      { isData ? 
        <div className='notes-list'>
            {notes.map((note, index) => (
                <ListItem key={index}  note={note}/>
            ))}
        </div>
        : 
        <div className='notes-spinner'>
          <DotSpinner size={40} speed={0.9} color="white" />
        </div>
      }
      <AddButton></AddButton>
    </div>
  )
}

export default NotesListPage;