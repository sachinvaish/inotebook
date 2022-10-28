import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let count = 0;
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //FUNCTION : Fetch All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZDBhMzU5ODk2ZTdhZmM3NDRlN2YwIn0sImlhdCI6MTY2Mzg5NzcxN30.PYwBYNVnvhTeYKTvgSz8UiP3iiGHXcIKtDg9b8yPTZU'
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log("Unable to fetch from API Server");
    }
  }


  //FUNCTION : ADD a Note
  const addNote = async (note) => {
    const { title, description, tags } = note;
    //API CALL
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZDBhMzU5ODk2ZTdhZmM3NDRlN2YwIn0sImlhdCI6MTY2Mzg5NzcxN30.PYwBYNVnvhTeYKTvgSz8UiP3iiGHXcIKtDg9b8yPTZU'
        },
        body: JSON.stringify({ title, description, tags })
      });
      const json = await response.json();
    } catch (error) {
      console.log("Server API Error");
    }
  }

  //FUNCTION :Delete a Note
  const deleteNote = async (id) => {
    //TODO API CALL
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZDBhMzU5ODk2ZTdhZmM3NDRlN2YwIn0sImlhdCI6MTY2Mzg5NzcxN30.PYwBYNVnvhTeYKTvgSz8UiP3iiGHXcIKtDg9b8yPTZU'
        },
      });
      const json = await response.json();
    } catch (error) {
      console.log("Server API Error");
    }
  }

  //FUNCTION :Edit a note
  const editNote = async (id, title, description, tags) => {
    //API CALL
    console.log("Updating id"+id);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZDBhMzU5ODk2ZTdhZmM3NDRlN2YwIn0sImlhdCI6MTY2Mzg5NzcxN30.PYwBYNVnvhTeYKTvgSz8UiP3iiGHXcIKtDg9b8yPTZU'
      },
      body: JSON.stringify({ title, description, tags })
    });
    const json = await response.json();
    console.log("response aya"+json);

    //Logic to EDIT in CLIENT
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
