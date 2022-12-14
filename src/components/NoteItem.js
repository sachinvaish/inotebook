import React, { useContext, useRef } from 'react';
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  // const refDelete = useRef(null);
  // const refClose = useRef(null);

  // const handleDelete = () => {
  //   refDelete.current.click();
  // }

  return (
    <div className="col-md-3 my-2 ">

      {/* <button  hidden="true" type="button" ref={refDelete} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
        Launch Delete
      </button>

      <div class="modal fade " id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-body ">
              <h5 className="text-center">Are you sure want to Delete this Note ?</h5>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" onClick={()=>{deleteNote(note._id); refClose.current.click() }} >Delete</button>
            </div>
          </div>
        </div>
      </div> */}


      <div className="card ">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="card-title">{note.title}</h5>
            </div>
            <div className="d-flex justify-content-end">
              <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <span className="badge bg-secondary">{note.tags}</span>
        </div>
      </div>
    </div>
  );
}
