import React, { useContext, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [newNote, setNewNote] = useState({ title: "", description: "", tags: "default" });
  getNotes();

  const refOpen = useRef(null);
  const refClose = useRef(null);
  const updateNote = (note) => {
    refOpen.current.click();
    setNewNote(note);
  }

  const onChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    console.log({newNote});
    editNote(newNote._id, newNote.title, newNote.description, newNote.tags);
    refClose.current.click();
  }

  return (
    <>
      <AddNote />


      <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" value={newNote.title} id="title" name="title" onChange={onChange} placeholder="Enter Title here" />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" value={newNote.description} id="description" name="description" onChange={onChange} rows="3" placeholder="Enter Description here"></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="tags" className="form-label">Tags</label>
                <textarea className="form-control" value={newNote.tags} id="tags" name="tags" onChange={onChange} rows="1" placeholder="Enter Tags here"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-3">My Notes</h4>
      <div className="row">
        {notes.length===0 && <div className='container'>No notes to display</div>}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  );
}

export default Notes;
