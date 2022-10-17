import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {

    const context=useContext(noteContext);
    const {notes} = context;

  return (
    <>
    <AddNote/>
    <h4 className="mt-3">My Notes</h4>
    <div className="row">
        {notes.map((note)=>{
          return <NoteItem key={note._id} title={note.title} description={note.description}/>
        })}
    </div>
    </>
  );
}

export default Notes;
