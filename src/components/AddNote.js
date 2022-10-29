import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const context=useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tags:""});

    const handleClick=()=>{
        addNote(note);
        setNote({title:"", description:"", tags:""});
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <h3>Add a note</h3>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">Title  </label>
        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} placeholder="Min Length : 5 Characters"/>
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="form-label">Description </label>
        <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} rows="3" placeholder="Min Length : 5 Characters"></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="tags" className="form-label">Tags</label>
        <textarea className="form-control" id="tags" name="tags" value={note.tags} onChange={onChange} rows="1" placeholder="Enter Tags here"></textarea>
      </div>
      <button disabled={(note.title.length<5) || (note.description.length<5)} type="button" className="btn btn-primary" onClick={handleClick}>Add my Note</button>
    </div>
  );
}

export default AddNote;
