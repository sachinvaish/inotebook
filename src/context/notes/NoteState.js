import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState({status :"", message :""});

  const showAlert=(message)=>{
    let status="show";
    setAlert({status,message});
    setTimeout(() => {
      status = "hide";
      setAlert({status,message});
    }, 3000);
  }
  
  //FUNCTION : Fetch All Notes
  const getNotes = async () => {
    if(localStorage.authToken){
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.authToken
        },
      });
      const json = await response.json();
      setNotes(json);

    } catch (error) {
      showAlert("Something is not right - fetchnotes");
    }
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
          'auth-token': localStorage.authToken
        },
        body: JSON.stringify({ title, description, tags })
      });
      const json = await response.json();
      showAlert(json.message);
    } catch (error) {
      showAlert("Something is not right - addnote");
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
          'auth-token': localStorage.authToken
        },
      });
      const json = await response.json();
      showAlert(json.message);
    } catch (error) {
      showAlert("Something is not right - delete note");
    }
  }

  //FUNCTION :Edit a note
  const editNote = async (id, title, description, tags) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.authToken
      },
      body: JSON.stringify({ title, description, tags })
    });
    const json = await response.json();
    showAlert(json.message);

    //Logic to EDIT in CLIENT
  }

  return (
    <NoteContext.Provider value={{ notes, alert, addNote, deleteNote, editNote, getNotes, showAlert, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
