import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const context=useContext(noteContext);
    const [note, setNote] = useState({title:"", description:"", tags:"default"});
    const {addNote} = context;

    const handleClick=()=>{
        addNote(note);
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <h3>Add a note</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Enter Title here"/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" name="description" onChange={onChange} rows="3" placeholder="Enter Description here"></textarea>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleClick}>Add my Note</button>
    </div>
  );
}

export default AddNote;
