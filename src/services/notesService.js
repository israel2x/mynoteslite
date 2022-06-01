const apiEndPoint = "api/notes/";
//const url = "http://localhost:9000/";

const url = process.env.REACT_APP_API_URL;

export async function getAllNotes() {
  try {
    const response = await fetch(url + apiEndPoint);
    return await response.json();
  } catch (e) {
    return console.log(e);
  }
}

export async function getNoteById(noteId) {
  try {
    const response = await fetch(url + apiEndPoint + noteId);
    return await response.json();
  } catch (e) {
    return console.log(e);
  }
}

export async function newNote(note) {
  try {
    const res = await fetch(url + apiEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, lastUpdated: new Date() }),
    });
    console.log("respuesta del api: ", res);
    return res;
  } catch (e) {
    return console.log(e);
  }
}

export async function deletNoteById(noteId) {
  try {
    const res = await fetch(url + apiEndPoint + noteId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId }),
    });
    return res;
  } catch (error) {
    return console.log(error);
  }
}

export async function updateNoteService(note) {
  try {
    const res = await fetch(url + apiEndPoint + note.noteId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });

    return res;
  } catch (error) {
    return console.log(error);
  }
}
