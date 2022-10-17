import React from 'react';

export default function NoteItem(props) {
  return (
    <div className="col-md-3 my-2">
        <div className="card ">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
            <h5 className="card-title">{props.title}</h5>
            </div>
            <div className="d-flex justify-content-end">
              <i className="fa-solid fa-pen-to-square mx-2"></i>
              <i className="fa-solid fa-trash mx-2"></i>
            </div>
          </div>
            <p className="card-text">{props.description}</p>
        </div>
        </div>
    </div>
  );
}
