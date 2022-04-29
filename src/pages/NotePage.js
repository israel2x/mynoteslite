import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import notes from '../assets/db';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = ({match, history }) => {
  //console.log('NotePage props:', props);
  const noteId = match.params.id;
  
  const [note, setNote] = useState(null);
  //let note = notes.find(note => note.id === Number(noteId));
  //console.log(note); 
  
  useEffect(() => {
    getNote();
  }, [noteId]);
  
  let getNote = async () => {
    if (noteId === 'new') return;
    let response = await fetch(`http://localhost:8000/notes/${noteId}`);
    let data = await response.json();
    console.log(data);
    setNote(data);
  }

  function handleNote(e) {
    console.log("handleChange");
    setNote({...note, 'body': e.target.value });
    console.log(note);
  }

  const createNote = async () => {
    const res = await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date()})
    });
    //history.push('/');

    console.log(res);
  }

  let updateNote = async () => {
    const res = await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date()})
    });

    console.log(res);
  }

  const deletNote = async () => {
    const res = await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note })
    });
    history.push('/');

    console.log(res);
  }

  const handleSubmit = () => {
    if (noteId != 'new' && !note.body) {
      deletNote();
    } else if (noteId != 'new') {
      updateNote();
    } else if (noteId === 'new' && note !== null) {
      createNote();
    }
    history.push('/');
  }

  return (
    <div className='note'>
      <div className='note-header'>
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit}></ArrowLeft>
            </Link>
          </h3>
          { noteId !== 'new' ? (
            <button onClick={deletNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Save</button>
          )}
      </div>
      <textarea onChange={(e) => handleNote(e)} value={note == null ? "Empty" : note.body}></textarea>
    </div>
  )
}

export default NotePage;