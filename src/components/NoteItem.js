import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {

    const context=useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
 
  return (
    <div className="col-md-3 my-2">
        <div className="card ">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
            <h5 className="card-title">{note.title}</h5>
            </div>
            <div className="d-flex justify-content-end">
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            </div>
          </div>
            <p className="card-text">{note.description}</p>
            <span className="badge bg-secondary">{note.tags}</span>
        </div>
        </div>
    </div>
  );
}
